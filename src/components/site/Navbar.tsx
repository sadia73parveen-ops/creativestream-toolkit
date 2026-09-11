import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TOOLS } from "@/lib/tools";
import { Logo } from "./Logo";
import { ThemeToggle } from "./theme";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
        aria-label="Main"
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                Tools <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {TOOLS.map((tool) => (
                <DropdownMenuItem key={tool.slug} asChild>
                  <Link to={tool.path} className="flex items-start gap-3 py-2">
                    <tool.icon className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block text-sm font-medium">{tool.name}</span>
                      <span className="block text-xs text-muted-foreground">{tool.short}</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild>
            <Link to="/" hash="benefits">
              Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/pricing">Pricing</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link to="/pricing">Sign in</Link>
          </Button>
          <Button className="gap-1.5" asChild>
            <Link to="/pricing">
              <Sparkles className="size-4" /> Get started
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6">
              <SheetTitle className="mb-6">
                <Logo />
              </SheetTitle>
              <div className="flex flex-col gap-1">
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tools
                </p>
                {TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={tool.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm hover:bg-accent/10"
                  >
                    <tool.icon className="size-4 text-primary" />
                    {tool.name}
                  </Link>
                ))}
                <Link
                  to="/pricing"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-accent/10"
                >
                  Pricing
                </Link>
                <div className="mt-4 flex items-center gap-2 px-2">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">Switch theme</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
