import { createFileRoute } from "@tanstack/react-router";
import { challengeInputSchema } from "@/lib/challenge-adviser";

// Public one-shot adviser endpoint for the static GitHub Pages build
// (prismgroup.au), which has no server of its own. CORS is restricted to
// Prism's own origins; nothing is persisted and no visitor content is stored.
const ALLOWED_ORIGINS = new Set([
  "https://prismgroup.au",
  "https://www.prismgroup.au",
  "https://prismgroup.lovable.app",
]);

function cors(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

const json = (request: Request, status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors(request) },
  });

export const Route = createFileRoute("/api/public/adviser")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => new Response(null, { status: 204, headers: cors(request) }),
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin && !ALLOWED_ORIGINS.has(origin)) {
          return json(request, 403, { brief: null, error: "Origin not allowed." });
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return json(request, 503, {
            brief: null,
            error: "The AI adviser is not configured yet. Please contact Prism directly.",
          });
        }
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json(request, 400, { brief: null, error: "Invalid request." });
        }
        const parsed = challengeInputSchema.safeParse(payload);
        if (!parsed.success) {
          return json(request, 400, {
            brief: null,
            error: parsed.error.issues[0]?.message ?? "Please describe your challenge.",
          });
        }
        const { buildChallengeBrief } = await import("@/lib/challenge-adviser.server");
        const result = await buildChallengeBrief(request, parsed.data.challenge, key);
        return json(request, result.status, result.body);
      },
    },
  },
});
