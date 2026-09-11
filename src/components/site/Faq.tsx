import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function Faq({
  items,
  title = "Frequently asked questions",
  id = "faq",
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold">{title}</h2>
      <Accordion type="single" collapsible className="mt-8">
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
