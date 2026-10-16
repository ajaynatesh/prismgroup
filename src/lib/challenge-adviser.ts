import { z } from "zod";
import { caseStudies } from "@/lib/case-studies";
import { pillars } from "@/lib/prism";

export const challengeInputSchema = z
  .object({
    challenge: z
      .string()
      .trim()
      .min(30, "Add a little more detail (at least 30 characters).")
      .max(3000, "Keep your challenge within 3,000 characters."),
  })
  .strict();

// Output limits belong in the prompt and normalization, not the model schema.
export const briefSchema = z
  .object({
    summary: z.string(),
    capabilities: z.array(z.object({ id: z.string(), reason: z.string() }).strict()),
    cases: z.array(z.object({ id: z.string(), reason: z.string() }).strict()),
    nextSteps: z.array(z.string()),
    questions: z.array(z.string()),
    caveat: z.string(),
    email: z.object({ subject: z.string(), body: z.string() }).strict(),
  })
  .strict();

export type Brief = z.infer<typeof briefSchema>;
export const adviserCapabilities = pillars.map((p) => ({
  id: p.index,
  title: p.name,
  href: p.href,
  kind: p.kind,
  description: p.copy,
  topics: p.groups.flatMap((g) => g.items),
}));
export const adviserCases = caseStudies
  .filter((c) => c.live)
  .map((c) => ({
    id: c.slug,
    title: c.title,
    href: c.to,
    problem: c.problem,
    topics: c.chips,
    challenges: c.challenges,
    status: c.status,
  }));

const concise = (text: string, words: number) => text.trim().split(/\s+/).slice(0, words).join(" ");
export function normalizeBrief(brief: Brief): Brief {
  const uniqueMatches = (matches: Brief["cases"], ids: string[]) => {
    const seen = new Set<string>();
    return matches
      .filter((m) => {
        if (!ids.includes(m.id) || seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      })
      .slice(0, 3)
      .map((m) => ({ id: m.id, reason: concise(m.reason, 40) }));
  };
  return {
    summary: concise(brief.summary, 65),
    capabilities: uniqueMatches(
      brief.capabilities,
      adviserCapabilities.map((p) => p.id),
    ),
    cases: uniqueMatches(
      brief.cases,
      adviserCases.map((c) => c.id),
    ),
    nextSteps: brief.nextSteps
      .filter((s) => s.trim())
      .slice(0, 3)
      .map((s) => concise(s.replace(/^\s*\d+[.)]\s*/, ""), 40)),
    questions: brief.questions
      .filter((s) => s.trim())
      .slice(0, 2)
      .map((s) => concise(s, 35)),
    caveat: concise(brief.caveat, 55),
    email: {
      subject: concise(brief.email.subject, 14),
      body: concise(brief.email.body, 240),
    },
  };
}

// Fallback enquiry draft when a brief predates server-side email drafting.
export function enquiryDraft(brief: Brief): { subject: string; body: string } {
  if (brief.email.subject && brief.email.body) return brief.email;
  const topic = concise(brief.summary, 8).replace(/[.!]+$/, "");
  const capability = brief.capabilities
    .map((m) => adviserCapabilities.find((p) => p.id === m.id)?.title)
    .filter(Boolean)
    .join(", ");
  return {
    subject: `AI Opportunity Discussion – ${topic || "Exploring next steps"}`,
    body: `Hi Prism team,\n\nI've just completed the Prism AI Opportunity Advisor and would be interested in exploring the opportunity further.\n\nBusiness challenge / opportunity:\n${brief.summary}\n\nPotential AI opportunity identified:\n${capability || "To be shaped together with Prism."}\n\nPotential business impact:\n${brief.nextSteps[0] ?? "To be validated together with Prism."}\n\nI'd appreciate the opportunity to discuss how this could potentially be applied within our organisation and what the next steps might look like.\n\nPlease get in touch when convenient.\n\nKind regards,`,
  };
}

export function briefText(brief: Brief) {
  const matches = (
    items: Brief["cases"],
    catalogue: typeof adviserCases | typeof adviserCapabilities,
  ) =>
    items
      .map((m) => {
        const item = catalogue.find((c) => c.id === m.id);
        return item ? `${item.title}: ${m.reason}\nhttps://prismgroup.au${item.href}` : "";
      })
      .filter(Boolean)
      .join("\n\n");
  return `PRISM GROUP — OPPORTUNITY BRIEF\n\n${brief.summary}\n\nRELEVANT CAPABILITIES\n${matches(brief.capabilities, adviserCapabilities)}\n\nILLUSTRATIVE CASE STUDIES\n${matches(brief.cases, adviserCases) || "No close published blueprint identified."}\n\nNEXT STEPS\n${brief.nextSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nQUESTIONS TO EXPLORE\n${brief.questions.join("\n")}\n\n${brief.caveat}\nAI-generated guidance; Prism review required. Case studies are illustrative solution blueprints, not completed client projects.`;
}
