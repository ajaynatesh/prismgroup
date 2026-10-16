import { createFileRoute } from "@tanstack/react-router";
import { contactSubmissionSchema } from "@/lib/contact";

// Public contact endpoint for the static GitHub Pages build (prismgroup.au),
// which has no server of its own. CORS is restricted to Prism's own origins.
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

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => new Response(null, { status: 204, headers: cors(request) }),
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin && !ALLOWED_ORIGINS.has(origin)) {
          return json(request, 403, { ok: false, error: "Origin not allowed." });
        }
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json(request, 400, { ok: false, error: "Invalid request." });
        }
        const parsed = contactSubmissionSchema.safeParse(payload);
        if (!parsed.success) {
          return json(request, 400, {
            ok: false,
            error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
          });
        }
        const data = parsed.data;

        // Honeypot filled → almost certainly a bot. Pretend success, store nothing.
        if (data.website) return json(request, 200, { ok: true, error: null });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("contact_submissions").insert({
          name: data.name,
          email: data.email,
          company: data.company || null,
          message: data.message,
        });
        if (error) {
          console.error("contact_submissions insert failed:", error.message);
          return json(request, 500, {
            ok: false,
            error:
              "We couldn't send your enquiry just now. Please try again shortly, or email ajay@spectraiq.ai directly.",
          });
        }
        return json(request, 200, { ok: true, error: null });
      },
    },
  },
});
