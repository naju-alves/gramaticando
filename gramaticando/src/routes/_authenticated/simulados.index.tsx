import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { levels } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useAttempts } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/simulados/")({
  head: () => ({
    meta: [
      { title: "Simulados — Gramaticando" },
      { name: "description", content: "Simulados com correção automática e histórico de notas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SimuladosPage,
});

function SimuladosPage() {
  const { user } = useAuth();
  const { data: attempts = [] } = useAttempts(user?.id);

  return (
    <PublicLayout>
      <section className="surface-hero border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Simulados</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Correção automática, explicação de cada questão e registro da nota no seu histórico.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {levels.map((level) => {
            const levelAttempts = attempts.filter((a) => a.level_slug === level.slug);
            const best = levelAttempts.reduce((max, a) => Math.max(max, a.score), 0);
            return (
              <div
                key={level.slug}
                className="card-hover rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <ClipboardCheck className="size-6 text-primary" />
                <h2 className="mt-4 font-display text-lg font-semibold">{level.exam.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{level.exam.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {level.exam.questions.length} questões ·{" "}
                  {levelAttempts.length > 0 ? `melhor nota ${best}%` : "ainda não realizado"}
                </p>
                <Button asChild className="mt-5 w-full rounded-full surface-primary text-primary-foreground">
                  <Link to="/simulados/$nivel" params={{ nivel: level.slug }}>
                    Iniciar simulado
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
