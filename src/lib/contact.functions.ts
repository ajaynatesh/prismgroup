import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader, setResponseStatus } from "@tanstack/react-start/server";
import { contactSubmissionSchema, type ContactResult } from "@/lib/contact";

// Intentionally public: visitors need no account to enquire. Submissions are
// stored server-side only; the table has no public read/update/delete access.
export const submitContactEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSubmissionSchema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    setResponseHeader("Cache-Control", "no-store");

    // Honeypot filled → almost certainly a bot. Pretend success, store nothing.
    if (data.website) return { ok: true, error: null };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
    });
    if (error) {
      console.error("contact_submissions insert failed:", error.message);
      setResponseStatus(500);
      return {
        ok: false,
        error:
          "We couldn't send your enquiry just now. Please try again shortly, or email ajay@spectraiq.ai directly.",
      };
    }
    return { ok: true, error: null };
  });
