import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Check, Copy, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { generateContent, type GenerationResult } from "@/lib/ai.functions";
import { FREE_DAILY_LIMIT, useDailyUsage } from "@/lib/usage";

type Option = { value: string; label: string };

export function AiToolForm({
  tool,
  topicLabel,
  topicPlaceholder,
  platforms,
  tones,
  ctaLabel,
  resultsAs = "list",
}: {
  tool: "youtube-title" | "caption" | "hashtag";
  topicLabel: string;
  topicPlaceholder: string;
  platforms?: Option[];
  tones?: Option[];
  ctaLabel: string;
  resultsAs?: "list" | "tags";
}) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState(platforms?.[0]?.value ?? "");
  const [tone, setTone] = useState(tones?.[0]?.value ?? "");
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const usage = useDailyUsage();
  const run = useServerFn(generateContent);

  const mutation = useMutation<GenerationResult>({
    mutationFn: async () => {
      const res = await run({
        data: {
          tool,
          topic: topic.trim(),
          ...(platform ? { platform } : {}),
          ...(tone ? { tone } : {}),
          count: 8,
        },
      });
      if (res.ok) usage.increment();
      return res;
    },
    onError: () => toast.error("We couldn't reach the generator. Please try again."),
  });

  const results = mutation.data?.ok ? mutation.data.items : [];
  const error = mutation.data && !mutation.data.ok ? mutation.data.error : null;
  const disabled = topic.trim().length < 3 || mutation.isPending || usage.limitReached;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 1500);
  };

  const toggleSelect = (tag: string) =>
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Card className="surface-card">
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="topic">{topicLabel}</Label>
            <Textarea
              id="topic"
              value={topic}
              maxLength={300}
              rows={4}
              placeholder={topicPlaceholder}
              onChange={(e) => setTopic(e.target.value)}
            />
            <p className="text-right text-xs text-muted-foreground">{topic.length}/300</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {platforms && (
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {tones && (
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            className="w-full gap-2"
            size="lg"
            disabled={disabled}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> {ctaLabel}
              </>
            )}
          </Button>

          <div className="space-y-2 rounded-xl bg-muted/60 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Free plan · daily generations</span>
              <span className="text-muted-foreground">
                {usage.used}/{FREE_DAILY_LIMIT}
              </span>
            </div>
            <Progress value={(usage.used / FREE_DAILY_LIMIT) * 100} className="h-1.5" />
            {usage.limitReached ? (
              <p className="text-xs text-muted-foreground">
                You've used today's free generations.{" "}
                <Link to="/pricing" className="font-medium text-primary underline">
                  Upgrade to Pro
                </Link>{" "}
                for unlimited runs.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Pro unlocks unlimited generations and history.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="surface-card">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Results
            </h2>
            {results.length > 0 && (
              <div className="flex gap-2">
                {resultsAs === "tags" && selected.length > 0 && (
                  <Button size="sm" variant="outline" onClick={() => copy(selected.join(" "))}>
                    Copy selected ({selected.length})
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy(results.join(resultsAs === "tags" ? " " : "\n"))}
                >
                  Copy all
                </Button>
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mutation.isPending && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-lg" />
              ))}
            </div>
          )}

          {!mutation.isPending && results.length === 0 && !error && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Your generated results will appear here.
            </p>
          )}

          {!mutation.isPending && results.length > 0 && resultsAs === "list" && (
            <ul className="space-y-2">
              {results.map((item) => (
                <li
                  key={item}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border/70 p-3 text-sm"
                >
                  <span>{item}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Copy result"
                    onClick={() => copy(item)}
                  >
                    {copied === item ? (
                      <Check className="size-4 text-primary" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {!mutation.isPending && results.length > 0 && resultsAs === "tags" && (
            <div className="flex flex-wrap gap-2">
              {results.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleSelect(tag)}
                  aria-pressed={selected.includes(tag)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    selected.includes(tag)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
