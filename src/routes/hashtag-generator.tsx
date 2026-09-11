import { createFileRoute } from "@tanstack/react-router";
import { AiToolForm } from "@/components/site/AiToolForm";
import { ToolPage } from "@/components/site/ToolPage";
import { faqJsonLd, type FaqItem } from "@/components/site/Faq";
import { getTool } from "@/lib/tools";

const tool = getTool("hashtag-generator");

const FAQ: FaqItem[] = [
  {
    q: "How many hashtags should I use?",
    a: "Instagram and TikTok perform best with 8–15 focused tags. Select the ones that genuinely describe your post rather than copying every suggestion.",
  },
  {
    q: "Are these hashtags trending?",
    a: "Sets mix broad, niche and long-tail tags around your topic. Broad tags bring reach, niche tags bring the audience that actually converts.",
  },
  {
    q: "Can I copy only some hashtags?",
    a: "Yes. Click any tag to select it, then use 'Copy selected' to grab just that group.",
  },
  {
    q: "Do hashtags still work?",
    a: "They remain a strong categorisation signal on Instagram, TikTok, LinkedIn and YouTube Shorts, especially for niche discovery.",
  },
];

export const Route = createFileRoute("/hashtag-generator")({
  head: () => ({
    meta: [
      { title: "Free AI Hashtag Generator for Instagram & TikTok — MediaDrop" },
      {
        name: "description",
        content:
          "Generate targeted hashtag sets by niche and platform. Free AI hashtag generator with one-click copy all or copy selected.",
      },
      { property: "og:title", content: "Free AI Hashtag Generator — MediaDrop" },
      {
        property: "og:description",
        content: "Balanced broad, niche and long-tail hashtag sets for any post.",
      },
      { property: "og:url", content: "/hashtag-generator" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hashtag-generator" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      tool={tool}
      steps={[
        "Describe your niche and what the post shows.",
        "Pick the platform you're posting to.",
        "Tap tags to select them, then copy all or copy selected.",
      ]}
      example={{
        input: "Vegan meal prep for busy students, filmed as a 60-second Reel",
        output: [
          "#veganmealprep #studentmeals #mealprepsunday #plantbasedstudent",
          "#budgetvegan #quickvegetarian #reelsrecipes #healthyoncampus",
        ],
      }}
      faq={FAQ}
    >
      <AiToolForm
        tool="hashtag"
        topicLabel="Describe your post or niche"
        topicPlaceholder="e.g. Vegan meal prep for busy students, filmed as a 60-second Reel"
        platforms={[
          { value: "Instagram", label: "Instagram" },
          { value: "TikTok", label: "TikTok" },
          { value: "YouTube Shorts", label: "YouTube Shorts" },
          { value: "LinkedIn", label: "LinkedIn" },
          { value: "X (Twitter)", label: "X (Twitter)" },
        ]}
        ctaLabel="Generate hashtags"
        resultsAs="tags"
      />
    </ToolPage>
  );
}
