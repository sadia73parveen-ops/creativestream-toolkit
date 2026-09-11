import { Link } from "@tanstack/react-router";
import { TOOLS } from "@/lib/tools";
import { Logo } from "./Logo";
import { ThemeToggle } from "./theme";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            The free creator toolkit for YouTubers, TikTokers, Instagram creators and social
            marketers.
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-xs text-muted-foreground">Light / dark</span>
          </div>
        </div>

        <nav aria-label="Tools">
          <h2 className="text-sm font-semibold">Tools</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={t.path} className="transition-colors hover:text-foreground">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/" hash="benefits" className="transition-colors hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" hash="how-it-works" className="transition-colors hover:text-foreground">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/" hash="faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Cookie policy</li>
            <li>
              <a href="/sitemap.xml" className="transition-colors hover:text-foreground">
                Sitemap
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MediaDrop. Built for creators.
      </div>
    </footer>
  );
}
