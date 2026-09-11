import { createFileRoute } from "@tanstack/react-router";
import { AiToolForm } from "@/components/site/AiToolForm";
import { ToolPage } from "@/components/site/ToolPage";
import { faqJsonLd, type FaqItem } from "@/components/site/Faq";
import { getTool } from "@/lib/tools";

const tool = getTool("social-media-caption-generator");

const FAQ: FaqItem[] = [
  {
    q: "Which platforms are supported?",
    a: "Instagram, TikTok, LinkedIn, X (Twitter) and Facebook. Each preset adjusts length, formality and emoji use automatically.",
  },
  {
    q: "Do captions include a call to action?",
    a: "Yes. Every caption ends with a light call to action such as a save, comment or follow prompt that fits the platform.",
  },
  {
    q: "Can I edit the results?",
    a: "Absolutely — copy any caption and adapt it. The generator is a starting point, not a replacement for your voice.",
  },
  {
    q: "Are hashtags included?",
    a: "Captions stay hashtag-free so they read cleanly. Use the hashtag generator to build a matching tag set.",
  },
];

export const Route = createFileRoute("/social-media-caption-generator")({
  head: () => ({
    meta: [
      { title: "AI Social Media Caption Generator — Free — MediaDrop" },
      {
        name: "description",
        content:
          "Write scroll-stopping captions for Instagram, TikTok, LinkedIn and X. Free AI caption generator with tone and platform presets.",
      },
      { property: "og:title", content: "AI Social Media Caption Generator — Free" },
      {
        property: "og:description",
        content: "Multi-platform captions with hook, body and call to action — generated free.",
      },
      { property: "og:url", content: "/social-media-caption-generator" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/social-media-caption-generator" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      tool={tool}
      steps={[
        "Describe the post, product or moment you're sharing.",
        "Choose the platform and the tone you want to land.",
        "Generate and copy the caption that matches your visual.",
      ]}
      example={{
        input: "Behind the scenes of a sunrise coffee shoot for a local roastery",
        output: [
          "5am alarms hit different when the light looks like this ☕ Save this for your next shoot.",
          "Behind every clean coffee shot: one cold morning and eleven retakes. Which frame is your favourite?",
        ],
      }}
      faq={FAQ}
    >
      <AiToolForm
        tool="caption"
        topicLabel="What's the post about?"
        topicPlaceholder="e.g. Behind the scenes of a sunrise coffee shoot for a local roastery"
        platforms={[
          { value: "Instagram", label: "Instagram" },
          { value: "TikTok", label: "TikTok" },
          { value: "LinkedIn", label: "LinkedIn" },
          { value: "X (Twitter)", label: "X (Twitter)" },
          { value: "Facebook", label: "Facebook" },
        ]}
        tones={[
          { value: "friendly and casual", label: "Friendly & casual" },
          { value: "witty", label: "Witty" },
          { value: "inspirational", label: "Inspirational" },
          { value: "professional", label: "Professional" },
          { value: "bold and direct", label: "Bold & direct" },
        ]}
        ctaLabel="Generate captions"
      />
    </ToolPage>
  );
}
