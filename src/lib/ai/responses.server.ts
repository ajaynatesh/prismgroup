import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText, type ModelMessage } from "ai";
import { briefSchema } from "@/lib/challenge-adviser";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server.ts";

export function createResponsesCall(
  request: Request,
  config: {
    baseURL: string;
    apiKey: string;
    model: string;
    onGatewayError: (status: number, message: string, type: string) => Promise<void>;
  },
  messages: ModelMessage[],
  instructions?: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const response = await runIdFetch.fetch(input, init);
      if (!response.ok) {
        let message = "The AI adviser is currently unavailable. Please contact Prism directly.";
        let type = "";
        try {
          const body = await response.clone().json();
          const error = body.error ?? body;
          if (typeof error.message === "string") message = error.message;
          if (typeof error.type === "string") type = error.type;
        } catch {
          /* Non-JSON upstream errors use the safe fallback. */
        }
        await config.onGatewayError(response.status, message, type);
      }
      return response;
    },
  });
  const reasoning = config.model !== "openai/chat-latest";
  const result = streamText({
    model: provider.responses(config.model),
    ...(instructions ? { instructions } : {}),
    messages,
    output: Output.object({ schema: briefSchema }),
    maxRetries: 0,
    streamRetries: 0,
    maxOutputTokens: 3500,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        ...(reasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
      },
    },
  });
  return {
    result,
    response: () =>
      withLovableAiGatewayRunIdHeader(
        result.toUIMessageStreamResponse({ sendReasoning: true }),
        runIdFetch,
      ),
  };
}
