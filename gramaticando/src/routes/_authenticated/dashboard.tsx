import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpenCheck, Flame, Target, TrendingUp } from "lucide-react";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { levels, totalLessons } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useAttempts, useProfile, useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Meu painel — Gramaticando" },
      { name: "description", content: "Acompanhe seu progresso, aulas recentes e desempenho." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: progress = [] } = useProgress(user?.id);
  const { data: attempts = [] } = useAttempts(user?.id);

  const completed = progress.length;
  const percent = Math.round((completed / totalLessons) * 100);
  const average =
    attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
      : 0;
  const best = attempts.reduce((max, a) => Math.max(max, a.score), 0);

  const achievements = [
    { title: "Primeira aula", unlocked: completed >= 1, text: "Concluiu a primeira lição" },
    { title: "Cinco aulas", unlocked: completed >= 5, text: "Cinco lições concluídas" },
    { title: "Primeiro simulado", unlocked: attempts.length >= 1, text: "Realizou um simulado" },
    { title: "Nota alta", unlocked: best >= 80, text: "Tirou 80% ou mais em um simulado" },
  ];

  const firstName = (profile?.full_name || user?.email || "estudante").split(" ")[0];

  return (
    <PublicLayout>
      <section className="surface-hero border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Meu painel
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Olá, {firstName}! Bom estudo.
          </h1>
          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Progresso geral</span>
              <span>{percent}%</span>
            </div>
            <Progress value={percent} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {completed} de {totalLessons} aulas concluídas
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpenCheck, label: "Aulas concluídas", value: String(completed) },
            { icon: Target, label: "Simulados feitos", value: String(attempts.length) },
            { icon: TrendingUp, label: "Média nos simulados", value: `${average}%` },
            { icon: Flame, label: "Melhor nota", value: `${best}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <stat.icon className="size-5 text-primary" />
              <p className="mt-3 font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Continuar estudando</h2>
            <div className="mt-5 space-y-4">
              {levels.map((level) => {
                const done = progress.filter((p) => p.level_slug === level.slug).length;
                const total = level.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                const value = Math.round((done / total) * 100);
                return (
                  <div key={level.slug} className="rounded-2xl bg-muted/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">{level.name}</h3>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {done}/{total} aulas
                      </span>
                    </div>
                    <Progress value={value} className="mt-3" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="secondary" className="rounded-full">
                        <Link to="/niveis/$nivel" params={{ nivel: level.slug }}>
                          Ver módulos
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="rounded-full">
                        <Link to="/simulados/$nivel" params={{ nivel: level.slug }}>
                          Simulado
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold">Aulas recentes</h2>
              {progress.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Você ainda não concluiu nenhuma aula. Escolha um nível para começar.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {progress.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-sm">
                      <Link
                        to="/aulas/$nivel/$modulo/$licao"
                        params={{
                          nivel: item.level_slug,
                          modulo: item.module_slug,
                          licao: item.lesson_slug,
                        }}
                        className="font-medium hover:text-primary"
                      >
                        {item.lesson_slug.replace(/-/g, " ")}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.completed_at).toLocaleDateString("pt-BR")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold">Conquistas</h2>
              <ul className="mt-4 space-y-3">
                {achievements.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full ${
                        item.unlocked
                          ? "surface-sun text-highlight-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Award className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold">Histórico de notas</h2>
          {attempts.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Faça um simulado para acompanhar sua evolução.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="pb-3">Simulado</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Acertos</th>
                    <th className="pb-3">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="border-t border-border">
                      <td className="py-3 font-medium">{attempt.quiz_title}</td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(attempt.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {attempt.correct_count}/{attempt.total_questions}
                      </td>
                      <td className="py-3 font-bold text-primary">{attempt.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
