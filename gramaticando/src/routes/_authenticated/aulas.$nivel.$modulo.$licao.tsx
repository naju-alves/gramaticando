import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, ListChecks } from "lucide-react";
import { toast } from "sonner";

import { ExerciseQuiz } from "@/components/exercise-quiz";
import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { getLevel, getModule } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useCompleteLesson, useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/aulas/$nivel/$modulo/$licao")({
  head: () => ({
    meta: [
      { title: "Aula — Gramaticando" },
      { name: "description", content: "Videoaula, explicação, exemplos, resumo e exercícios." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { nivel, modulo, licao } = Route.useParams();
  const { user } = useAuth();
  const { data: progress = [] } = useProgress(user?.id);
  const completeLesson = useCompleteLesson(user?.id);

  const level = getLevel(nivel);
  const module = getModule(nivel, modulo).module;
  const lesson = module?.lessons.find((item) => item.slug === licao);

  if (!level || !module || !lesson) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Aula não encontrada</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/dashboard">Voltar ao painel</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const index = module.lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = index > 0 ? module.lessons[index - 1] : undefined;
  const next = index < module.lessons.length - 1 ? module.lessons[index + 1] : undefined;
  const isDone = progress.some((p) => p.lesson_slug === lesson.slug);

  function markDone() {
    completeLesson.mutate(
      { level_slug: level!.slug, module_slug: module!.slug, lesson_slug: lesson!.slug },
      {
        onSuccess: () => toast.success("Aula concluída! Progresso salvo."),
        onError: () => toast.error("Não foi possível salvar seu progresso."),
      },
    );
  }

  return (
    <PublicLayout>
      <article className="mx-auto max-w-4xl px-4 py-10">
        <Link
          to="/aulas/$nivel/$modulo"
          params={{ nivel: level.slug, modulo: module.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {module.title}
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {level.name} · {lesson.duration}
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
          <div className="aspect-video w-full bg-muted">
            <iframe
              className="size-full"
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              title={lesson.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold">Explicação</h2>
          <p className="mt-3 whitespace-pre-line text-muted-foreground">{lesson.explanation}</p>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-muted/50 p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Lightbulb className="size-5 text-primary" /> Exemplos
          </h2>
          <ul className="mt-3 space-y-2">
            {lesson.examples.map((example) => (
              <li key={example} className="rounded-2xl bg-background px-4 py-3 text-sm">
                {example}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <ListChecks className="size-5 text-primary" /> Resumo
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {lesson.summary.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Exercícios interativos</h2>
          <div className="mt-4">
            <ExerciseQuiz
              questions={lesson.exercises}
              title={lesson.title}
              onFinish={markDone}
              finishLabel="Concluir aula"
            />
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant={isDone ? "secondary" : "default"}
            className="rounded-full"
            onClick={markDone}
            disabled={completeLesson.isPending}
          >
            <CheckCircle2 className="size-4" />
            {isDone ? "Aula concluída" : "Marcar como concluída"}
          </Button>
          <div className="flex gap-2">
            {previous ? (
              <Button asChild variant="ghost" className="rounded-full">
                <Link
                  to="/aulas/$nivel/$modulo/$licao"
                  params={{ nivel: level.slug, modulo: module.slug, licao: previous.slug }}
                >
                  <ArrowLeft className="size-4" /> Anterior
                </Link>
              </Button>
            ) : null}
            {next ? (
              <Button asChild className="rounded-full">
                <Link
                  to="/aulas/$nivel/$modulo/$licao"
                  params={{ nivel: level.slug, modulo: module.slug, licao: next.slug }}
                >
                  Próxima <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="rounded-full">
                <Link to="/simulados/$nivel" params={{ nivel: level.slug }}>
                  Fazer simulado <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
