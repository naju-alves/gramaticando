import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Layers, LineChart, MessagesSquare } from "lucide-react";

import { PublicLayout, PageHero } from "@/components/public-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Gramaticando — Como a plataforma funciona" },
      {
        name: "description",
        content:
          "Entenda o método do Gramaticando: trilhas por nível, videoaulas curtas, exercícios com correção comentada e simulados que medem a evolução real do aluno.",
      },
      { property: "og:title", content: "Sobre o Gramaticando" },
      {
        property: "og:description",
        content: "O método por trás da plataforma: compreender a regra em vez de decorá-la.",
      },
    ],
  }),
  component: AboutPlatform,
});

const steps = [
  {
    icon: Compass,
    title: "1. Escolha o nível",
    text: "Fundamental I, Fundamental II, Ensino Médio ou Concursos. Cada trilha usa exemplos e linguagem adequados à etapa.",
  },
  {
    icon: Layers,
    title: "2. Estude por módulos",
    text: "Cada módulo reúne videoaula, explicação escrita, exemplos comentados e um resumo para revisão rápida.",
  },
  {
    icon: MessagesSquare,
    title: "3. Pratique com feedback",
    text: "Os exercícios corrigem na hora e explicam o motivo da resposta — o erro vira parte do aprendizado.",
  },
  {
    icon: LineChart,
    title: "4. Meça sua evolução",
    text: "Simulados com correção automática, histórico de notas e estatísticas de desempenho por nível.",
  },
];

function AboutPlatform() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="A plataforma"
        title="Sobre o Gramaticando"
        description="Uma plataforma de gramática da língua portuguesa construída em torno de uma ideia simples: quem entende a regra não precisa decorá-la."
      />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.title}
              className="card-hover rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-2xl surface-sun text-highlight-foreground">
                <step.icon className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Nosso método</h2>
          <p className="mt-4 text-muted-foreground">
            Partimos sempre do uso: primeiro a frase, depois a regra. Cada conteúdo apresenta uma
            situação real de escrita ou fala, mostra o que acontece com a língua naquele contexto e
            só então nomeia o fenômeno gramatical. Assim o aluno constrói critério próprio para
            decidir entre “a” e “à”, entre vírgula e ponto, entre subjuntivo e indicativo.
          </p>
          <p className="mt-4 text-muted-foreground">
            O ritmo é do estudante: as aulas ficam disponíveis o tempo todo, o progresso é salvo
            automaticamente e a revisão pode ser feita quantas vezes forem necessárias.
          </p>
          <Button asChild className="mt-6 rounded-full surface-primary text-primary-foreground">
            <Link to="/auth" search={{ modo: "cadastro" }}>
              Criar conta gratuita
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
