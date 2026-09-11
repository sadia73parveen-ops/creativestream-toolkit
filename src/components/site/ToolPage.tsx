import { Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Faq, type FaqItem } from "./Faq";
import { relatedTools, type Tool } from "@/lib/tools";

export function ToolPage({
  tool,
  steps,
  example,
  faq,
  children,
}: {
  tool: Tool;
  steps: string[];
  example: { input: string; output: string[] };
  faq: FaqItem[];
  children: ReactNode;
}) {
  const related = relatedTools(tool.slug);

  return (
    <main>
      <section className="hero-aura border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <tool.icon className="size-3.5" /> {tool.category === "AI" ? "AI tool" : "Image tool"}
          </Badge>
          <h1 className="text-balance text-4xl font-bold sm:text-5xl">{tool.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">{children}</section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-2">
        <Card className="surface-card">
          <CardHeader>
            <CardTitle className="text-lg">How to use it</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="gradient-brand flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="surface-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="size-4 text-primary" /> Example
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="rounded-lg bg-muted p-3 text-muted-foreground">
              <span className="font-medium text-foreground">Input:</span> {example.input}
            </p>
            <ul className="space-y-2">
              {example.output.map((line) => (
                <li key={line} className="rounded-lg border border-border/70 p-3">
                  {line}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <Faq items={faq} title={`${tool.name} FAQ`} />

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="text-2xl font-bold">Related tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              to={t.path}
              className="surface-card group p-5 transition-transform hover:-translate-y-1"
            >
              <t.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{t.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.short}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Open tool <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
