import {
  Hash,
  Image as ImageIcon,
  Maximize2,
  MessageSquareQuote,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory = "AI" | "Image";

export type Tool = {
  slug: string;
  path: string;
  name: string;
  short: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  badge?: string;
};

/**
 * Single source of truth for the tool catalogue.
 * Add a new entry here + a matching route file to ship a new tool.
 */
export const TOOLS: Tool[] = [
  {
    slug: "ai-youtube-title-generator",
    path: "/ai-youtube-title-generator",
    name: "AI YouTube Title Generator",
    short: "Click-worthy YouTube titles",
    description:
      "Generate high-CTR YouTube titles from your video topic, tuned for search and curiosity.",
    category: "AI",
    icon: Youtube,
    badge: "Popular",
  },
  {
    slug: "social-media-caption-generator",
    path: "/social-media-caption-generator",
    name: "AI Social Media Caption Generator",
    short: "Captions for every platform",
    description:
      "Write scroll-stopping captions for Instagram, TikTok, LinkedIn and X in the tone you choose.",
    category: "AI",
    icon: MessageSquareQuote,
    badge: "Popular",
  },
  {
    slug: "hashtag-generator",
    path: "/hashtag-generator",
    name: "AI Hashtag Generator",
    short: "Reach-boosting hashtag sets",
    description:
      "Get a balanced mix of broad, niche and long-tail hashtags for any topic and platform.",
    category: "AI",
    icon: Hash,
  },
  {
    slug: "image-compressor",
    path: "/image-compressor",
    name: "Image Compressor",
    short: "Smaller files, same quality",
    description:
      "Compress JPG, PNG and WebP images right in your browser — nothing is uploaded to a server.",
    category: "Image",
    icon: ImageIcon,
  },
  {
    slug: "image-resizer",
    path: "/image-resizer",
    name: "Image Resizer",
    short: "Perfect sizes per platform",
    description:
      "Resize images to exact dimensions or platform presets like YouTube thumbnails and Reels covers.",
    category: "Image",
    icon: Maximize2,
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug)!;

export const relatedTools = (slug: string, count = 3) =>
  TOOLS.filter((t) => t.slug !== slug).slice(0, count);
