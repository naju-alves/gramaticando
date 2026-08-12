import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, Clock } from "lucide-react";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { getLevel, getModule } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/aulas/$nivel/$modulo")({
  head: () => ({
    meta: [
      { title: "Módulo de estudo — Gramaticando" },
      { name: "description", content: "Aulas, exemplos e exercícios do módulo selecionado." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ModulePage,
});

function ModulePage() {
  const { nivel, modulo } = Route.useParams();
  const { user } = useAuth();
  const { data: progress = [] } = useProgress(user?.id);
  const level = getLevel(nivel);
  const module = getModule(nivel, modulo).module;

  if (!level || !module) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Módulo não encontrado</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/dashboard">Voltar ao painel</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const doneSlugs = new Set(progress.map((p) => p.lesson_slug));

  return (
    <PublicLayout>
      <section className="surface-hero border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <Link
            to="/niveis/$nivel"
            params={{ nivel: level.slug }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            {level.name}
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{module.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{module.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <ul className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const done = doneSlugs.has(lesson.slug);
            return (
              <li
                key={lesson.slug}
                className="card-hover rounded-3xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    {done ? (
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Aula {index + 1}
                      </p>
                      <h2 className="truncate font-semibold">{lesson.title}</h2>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" /> {lesson.duration} ·{" "}
                        {lesson.exercises.length} exercícios
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm" className="rounded-full">
                    <Link
                      to="/aulas/$nivel/$modulo/$licao"
                      params={{ nivel: level.slug, modulo: module.slug, licao: lesson.slug }}
                    >
                      {done ? "Revisar" : "Estudar"}
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </PublicLayout>
  );
}
