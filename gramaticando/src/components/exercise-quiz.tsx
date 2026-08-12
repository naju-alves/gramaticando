import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/data/curriculum";

type Props = {
  questions: Exercise[];
  title?: string;
  onFinish?: (result: { correct: number; total: number; score: number }) => void;
  finishLabel?: string;
};

export function ExerciseQuiz({ questions, title, onFinish, finishLabel = "Finalizar" }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[index]!;
  const progress = (index / questions.length) * 100;

  function check() {
    if (selected === null) return;
    setChecked(true);
    if (selected === question.answer) setCorrect((c) => c + 1);
  }

  function next() {
    const isLast = index === questions.length - 1;
    if (isLast) {
      const finalCorrect = correct;
      const score = Math.round((finalCorrect / questions.length) * 100);
      setDone(true);
      onFinish?.({ correct: finalCorrect, total: questions.length, score });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setCorrect(0);
    setDone(false);
  }

  if (done) {
    const score = Math.round((correct / questions.length) * 100);
    return (
      <div className="animate-rise rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Resultado
        </p>
        <p className="mt-3 font-display text-5xl font-bold text-primary">{score}%</p>
        <p className="mt-2 text-muted-foreground">
          Você acertou {correct} de {questions.length} questões.
        </p>
        <Button onClick={restart} variant="secondary" className="mt-6 rounded-full">
          <RotateCcw className="size-4" /> Refazer
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          {title ? `${title} · ` : ""}Questão {index + 1} de {questions.length}
        </p>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          {correct} acerto{correct === 1 ? "" : "s"}
        </span>
      </div>
      <Progress value={progress} className="mt-3 h-2" />

      <h3 className="mt-6 text-lg font-semibold">{question.question}</h3>

      <div className="mt-5 grid gap-3">
        {question.options.map((option, i) => {
          const isRight = checked && i === question.answer;
          const isWrong = checked && i === selected && i !== question.answer;
          return (
            <button
              key={option}
              type="button"
              disabled={checked}
              onClick={() => setSelected(i)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-medium transition-all",
                selected === i && !checked && "border-primary bg-primary/10",
                isRight && "border-success bg-success/15",
                isWrong && "border-destructive bg-destructive/10",
                !checked && "hover:border-primary/60",
              )}
            >
              <span>{option}</span>
              {isRight && <CheckCircle2 className="size-5 shrink-0 text-success" />}
              {isWrong && <XCircle className="size-5 shrink-0 text-destructive" />}
            </button>
          );
        })}
      </div>

      {checked && (
        <p className="animate-rise mt-5 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Por quê: </strong>
          {question.explanation}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        {checked ? (
          <Button onClick={next} className="rounded-full surface-primary text-primary-foreground">
            {index === questions.length - 1 ? finishLabel : "Próxima"}
          </Button>
        ) : (
          <Button onClick={check} disabled={selected === null} className="rounded-full">
            Responder
          </Button>
        )}
      </div>
    </div>
  );
}
