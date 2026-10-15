import { z } from "zod";
import { caseStudies } from "@/lib/case-studies";
import { pillars } from "@/lib/prism";

export const challengeInputSchema = z.object({
  challenge: z.string().trim().min(30, "Add a little more detail (at least 30 characters).").max(3000, "Keep your challenge within 3,000 characters."),
}).strict();

// Output limits belong in the prompt and normalization, not the model schema.
export const briefSchema = z.object({
  summary: z.string(),
  capabilities: z.array(z.object({ id: z.string(), reason: z.string() }).strict()),
  cases: z.array(z.object({ id: z.string(), reason: z.string() }).strict()),
  nextSteps: z.array(z.string()),
  questions: z.array(z.string()),
  caveat: z.string(),
}).strict();

export type Brief = z.infer<typeof briefSchema>;
export const adviserCapabilities = pillars.map((p) => ({
  id: p.index, title: p.name, href: p.href, kind: p.kind,
  description: p.copy, topics: p.groups.flatMap((g) => g.items),
}));
export const adviserCases = caseStudies.filter((c) => c.live).map((c) => ({
  id: c.slug, title: c.title, href: c.to, problem: c.problem,
  topics: c.chips, challenges: c.challenges, status: c.status,
}));

const concise = (text: string, words: number) => text.trim().split(/\s+/).slice(0, words).join(" ");
export function normalizeBrief(brief: Brief): Brief {
  const uniqueMatches = (matches: Brief["cases"], ids: string[]) => {
    const seen = new Set<string>();
    return matches.filter((m) => {
      if (!ids.includes(m.id) || seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    }).slice(0, 3).map((m) => ({ id: m.id, reason: concise(m.reason, 40) }));
  };
  return {
    summary: concise(brief.summary, 65),
    capabilities: uniqueMatches(brief.capabilities, adviserCapabilities.map((p) => p.id)),
    cases: uniqueMatches(brief.cases, adviserCases.map((c) => c.id)),
    nextSteps: brief.nextSteps.filter((s) => s.trim()).slice(0, 3).map((s) => concise(s, 40)),
    questions: brief.questions.filter((s) => s.trim()).slice(0, 2).map((s) => concise(s, 35)),
    caveat: concise(brief.caveat, 55),
  };
}

export function briefText(brief: Brief) {
  const matches = (items: Brief["cases"], catalogue: typeof adviserCases | typeof adviserCapabilities) => items.map((m) => {
    const item = catalogue.find((c) => c.id === m.id);
    return item ? `${item.title}: ${m.reason}\nhttps://prismgroup.lovable.app${item.href}` : "";
  }).filter(Boolean).join("\n\n");
  return `PRISM GROUP — OPPORTUNITY BRIEF\n\n${brief.summary}\n\nRELEVANT CAPABILITIES\n${matches(brief.capabilities, adviserCapabilities)}\n\nILLUSTRATIVE CASE STUDIES\n${matches(brief.cases, adviserCases) || "No close published blueprint identified."}\n\nNEXT STEPS\n${brief.nextSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nQUESTIONS TO EXPLORE\n${brief.questions.join("\n")}\n\n${brief.caveat}\nAI-generated guidance; Prism review required. Case studies are illustrative solution blueprints, not completed client projects.`;
}