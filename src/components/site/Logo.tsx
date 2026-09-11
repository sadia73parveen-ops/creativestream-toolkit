import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="MediaDrop home">
      <span className="gradient-brand glow flex size-9 items-center justify-center rounded-xl">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none">
          <path
            d="M12 3c3.6 3.2 6 6.2 6 9.2A6 6 0 0 1 6 12.2C6 9.2 8.4 6.2 12 3Z"
            fill="white"
            fillOpacity="0.95"
          />
          <circle cx="12" cy="13" r="2.2" fill="oklch(0.55 0.22 272)" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          Media<span className="gradient-text">Drop</span>
        </span>
      )}
    </Link>
  );
}
