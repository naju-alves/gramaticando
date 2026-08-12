import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardCheck, Clock } from "lucide-react";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { getLevel, levels } from "@/data/curriculum";

export const Route = createFileRoute("/niveis/$nivel")({
  head: ({ params }) => {
    const level = getLevel(params.nivel);
    if (!level) {
      return {
        meta: [
          { title: "Nível indisponível — Gramaticando" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${level.name} — Módulos de gramática | Gramaticando`;
    const description = level.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: LevelPage,
});

function LevelPage() {
  const { nivel } = Route.useParams();
  const level = getLevel(nivel);

  if (!level) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Nível não encontrado</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/">Voltar para a home</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="surface-hero border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="flex flex-wrap gap-2">
            {levels.map((item) => (
              <Link
                key={item.slug}
                to="/niveis/$nivel"
                params={{ nivel: item.slug }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  item.slug === level.slug
                    ? "surface-primary text-primary-foreground"
                    : "bg-background/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">{level.name}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{level.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full surface-primary text-primary-foreground">
              <Link to="/auth" search={{ modo: "cadastro" }}>
                Estudar este nível <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/simulados">Ver simulados</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold">Módulos do nível</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {level.modules.map((module) => (
            <article
              key={module.slug}
              className="card-hover rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="font-display text-xl font-semibold">{module.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
              <ul className="mt-5 space-y-2">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson.slug}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 px-4 py-3 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <BookOpen className="size-4 shrink-0 text-primary" />
                      <span className="truncate font-medium">{lesson.title}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary" className="mt-5 w-full rounded-full">
                <Link
                  to="/aulas/$nivel/$modulo"
                  params={{ nivel: level.slug, modulo: module.slug }}
                >
                  Abrir módulo
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">{level.exam.title}</h3>
              <p className="text-sm text-muted-foreground">{level.exam.description}</p>
            </div>
          </div>
          <Button asChild className="rounded-full surface-primary text-primary-foreground">
            <Link to="/simulados">Fazer simulado</Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
