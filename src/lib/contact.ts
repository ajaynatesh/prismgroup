import { z } from "zod";

// Shared validation for the contact form — used by the server function and
// the public API route so both hosting modes enforce identical rules.
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email must be under 255 characters."),
  company: z
    .string()
    .trim()
    .max(150, "Company must be under 150 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Message must be under 2,000 characters."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactResult =
  | { ok: true; error: null }
  | { ok: false; error: string };
