import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader, setResponseStatus } from "@tanstack/react-start/server";
import { challengeInputSchema, type Brief } from "@/lib/challenge-adviser";

export type AdviserResult = { brief: Brief; error: null } | { brief: null; error: string };

// Intentionally public: visitors need no account, and no visitor content is saved.
export const recommendChallenge = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => challengeInputSchema.parse(input))
  .handler(async ({ data }): Promise<AdviserResult> => {
    setResponseHeader("Cache-Control", "no-store");
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) {
      setResponseStatus(503);
      return { brief: null, error: "The AI adviser is not configured yet. Please contact Prism directly." };
    }
    const { buildChallengeBrief } = await import("@/lib/challenge-adviser.server");
    const result = await buildChallengeBrief(getRequest(), data.challenge, key);
    if (result.status !== 200) setResponseStatus(result.status);
    return result.body;
  });