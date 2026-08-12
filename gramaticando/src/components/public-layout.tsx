import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="surface-hero border-b border-border/50">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
