import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { ExerciseQuiz } from "@/components/exercise-quiz";
import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { getLevel } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useAttempts, useSaveAttempt } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/simulados/$nivel")({
  head: () => ({
    meta: [
      { title: "Simulado — Gramaticando" },
      { name: "description", content: "Simulado com correção automática e nota registrada." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SimuladoPage,
});

function SimuladoPage() {
  const { nivel } = Route.useParams();
  const { user } = useAuth();
  const saveAttempt = useSaveAttempt(user?.id);
  const { data: attempts = [] } = useAttempts(user?.id);
  const level = getLevel(nivel);

  if (!level) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Simulado não encontrado</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/simulados">Ver simulados</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const history = attempts.filter((a) => a.quiz_slug === level.exam.slug);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          to="/simulados"
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Simulados
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">{level.exam.title}</h1>
        <p className="mt-2 text-muted-foreground">{level.exam.description}</p>

        <div className="mt-8">
          <ExerciseQuiz
            questions={level.exam.questions}
            title={level.exam.title}
            finishLabel="Ver resultado"
            onFinish={(result) =>
              saveAttempt.mutate(
                {
                  quiz_slug: level.exam.slug,
                  quiz_title: level.exam.title,
                  level_slug: level.slug,
                  score: result.score,
                  correct_count: result.correct,
                  total_questions: result.total,
                },
                {
                  onSuccess: () => toast.success("Nota registrada no seu histórico!"),
                  onError: () => toast.error("Não foi possível salvar a nota."),
                },
              )
            }
          />
        </div>

        {history.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Suas tentativas</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {history.map((attempt) => (
                <li
                  key={attempt.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 px-4 py-3"
                >
                  <span className="text-muted-foreground">
                    {new Date(attempt.created_at).toLocaleString("pt-BR")}
                  </span>
                  <span className="font-bold text-primary">
                    {attempt.correct_count}/{attempt.total_questions} · {attempt.score}%
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </PublicLayout>
  );
}
