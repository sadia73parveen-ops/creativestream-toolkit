import { createFileRoute } from "@tanstack/react-router";
import { AiToolForm } from "@/components/site/AiToolForm";
import { ToolPage } from "@/components/site/ToolPage";
import { faqJsonLd, type FaqItem } from "@/components/site/Faq";
import { getTool } from "@/lib/tools";

const tool = getTool("ai-youtube-title-generator");

const FAQ: FaqItem[] = [
  {
    q: "How long should a YouTube title be?",
    a: "Aim for under 60 characters so the full title shows on mobile search and suggested feeds. Every title here is generated within that range.",
  },
  {
    q: "Will these titles help my click-through rate?",
    a: "Titles are written around curiosity gaps, specificity and searchable keywords — the three levers that move CTR — but always pair them with a matching thumbnail.",
  },
  {
    q: "Can I generate titles for Shorts?",
    a: "Yes. Mention 'Shorts' in your topic and pick a punchy tone to get shorter, faster-hitting titles.",
  },
  {
    q: "How many free generations do I get?",
    a: "Five per day on the free plan. Pro removes the limit and stores your history.",
  },
];

export const Route = createFileRoute("/ai-youtube-title-generator")({
  head: () => ({
    meta: [
      { title: "Free AI YouTube Title Generator — MediaDrop" },
      {
        name: "description",
        content:
          "Generate high-CTR YouTube titles in seconds. Free AI title generator with tone control, built for creators. No sign-up required.",
      },
      { property: "og:title", content: "Free AI YouTube Title Generator — MediaDrop" },
      {
        property: "og:description",
        content: "Click-worthy YouTube titles from any topic, generated free in seconds.",
      },
      { property: "og:url", content: "/ai-youtube-title-generator" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ai-youtube-title-generator" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      tool={tool}
      steps={[
        "Describe your video topic, keywords and target audience.",
        "Pick the tone that matches your channel's personality.",
        "Generate, then copy the title that fits your thumbnail best.",
      ]}
      example={{
        input: "Beginner home studio setup for YouTube on a $300 budget",
        output: [
          "The $300 YouTube Studio That Looks Like $3,000",
          "I Built a Home Studio for $300 — Here's Everything I Bought",
          "Beginner YouTube Studio Setup: Every Mistake I Made",
        ],
      }}
      faq={FAQ}
    >
      <AiToolForm
        tool="youtube-title"
        topicLabel="What is your video about?"
        topicPlaceholder="e.g. Beginner home studio setup for YouTube on a $300 budget, aimed at new creators"
        tones={[
          { value: "curious and punchy", label: "Curious & punchy" },
          { value: "educational", label: "Educational" },
          { value: "bold and dramatic", label: "Bold & dramatic" },
          { value: "friendly and casual", label: "Friendly & casual" },
          { value: "professional", label: "Professional" },
        ]}
        ctaLabel="Generate titles"
      />
    </ToolPage>
  );
}
