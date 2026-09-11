import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Faq, faqJsonLd, type FaqItem } from "@/components/site/Faq";
import { TOOLS } from "@/lib/tools";

const FAQ: FaqItem[] = [
  {
    q: "Is MediaDrop really free?",
    a: "Yes. Every image tool is unlimited and free, and you get free AI generations every day with no account and no credit card. Pro raises the AI limits and adds generation history.",
  },
  {
    q: "Do I need an account to use the tools?",
    a: "No. You can use every tool anonymously. Accounts exist so we can save your generation history and raise your daily AI limits on paid plans.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. Compressing and resizing happen entirely inside your browser using the canvas API, so your files never leave your device and nothing is stored.",
  },
  {
    q: "What counts as an AI generation?",
    a: "One click of a generate button counts as one generation, no matter how many titles, captions or hashtags come back in the result.",
  },
  {
    q: "Can I use the results commercially?",
    a: "Yes. Titles, captions and hashtags you generate are yours to use on any channel, including monetised and client work.",
  },
  {
    q: "Which platforms are supported?",
    a: "YouTube, TikTok, Instagram, LinkedIn, X, Facebook, Pinterest and blogs. Each AI tool has platform presets that shape length and tone.",
  },
];

const BENEFITS = [
  {
    icon: Gauge,
    title: "Instant results",
    body: "No sign-up walls, no waiting rooms. Type your topic and get usable output in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Image processing runs in your browser. Your files never touch our servers.",
  },
  {
    icon: Wand2,
    title: "AI that sounds human",
    body: "Prompts tuned by creators, with tone and platform controls so nothing sounds robotic.",
  },
  {
    icon: Sparkles,
    title: "Built for the workflow",
    body: "Title, caption, hashtags, thumbnail sizing — the whole publishing checklist in one place.",
  },
];

const STEPS = [
  { title: "Pick a tool", body: "Choose from AI writing tools or browser-based image tools." },
  { title: "Add your topic or file", body: "Describe your video, or drop in a PNG, JPG or WebP." },
  { title: "Copy or download", body: "Grab your results with one click and publish straight away." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediaDrop — Free AI Tools for Content Creators" },
      {
        name: "description",
        content:
          "Free creator toolkit: AI YouTube title generator, caption generator, hashtag generator, image compressor and image resizer. No sign-up needed.",
      },
      { property: "og:title", content: "MediaDrop — Free AI Tools for Content Creators" },
      {
        property: "og:description",
        content:
          "AI titles, captions and hashtags plus browser-based image compression and resizing. Free for creators.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ)) }],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter((t) =>
      `${t.name} ${t.short} ${t.description} ${t.category}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main>
      <section className="hero-aura relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <Sparkles className="size-3.5 text-primary" /> 5 free tools · no account needed
          </Badge>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Free Tools for <span className="gradient-text">Content Creators</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            MediaDrop gives YouTubers, TikTokers, Instagram creators and social marketers an AI
            copywriting studio and a private image toolkit — all in one fast, free workspace.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools — titles, captions, hashtags, compress…"
                aria-label="Search tools"
                className="h-12 pl-9"
              />
            </div>
            <Button size="lg" asChild>
              <Link to="/ai-youtube-title-generator">Start free</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">
              {query ? `${filtered.length} matching tools` : "The creator essentials, all free."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <article
              key={tool.slug}
              className="surface-card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="gradient-brand flex size-11 items-center justify-center rounded-xl text-primary-foreground">
                  <tool.icon className="size-5" />
                </span>
                {tool.badge && <Badge variant="secondary">{tool.badge}</Badge>}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{tool.description}</p>
              <Button variant="secondary" className="mt-5 w-full gap-1.5" asChild>
                <Link to={tool.path}>
                  Launch tool <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No tools match “{query}”. More tools are on the way.
            </p>
          )}
        </div>
      </section>

      <section id="benefits" className="border-y border-border/60 bg-card/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Why creators use MediaDrop</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="surface-card p-6">
                <b.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="surface-card relative p-6">
              <span className="gradient-brand flex size-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={FAQ} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="gradient-brand glow rounded-3xl px-8 py-14 text-center text-primary-foreground">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">
            Create your free MediaDrop account
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty opacity-90">
            Keep your generation history, unlock higher AI limits and get new creator tools first.
          </p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link to="/pricing">See plans</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
