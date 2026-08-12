import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

import heroImage from "@/assets/hero-gramaticando.jpg";
import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { levels } from "@/data/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gramaticando — Aprenda gramática de verdade, no seu ritmo" },
      {
        name: "description",
        content:
          "Plataforma de gramática da língua portuguesa para Fundamental I e II, Ensino Médio e concursos: videoaulas, exercícios interativos, simulados e acompanhamento de progresso.",
      },
      { property: "og:title", content: "Gramaticando — Aprenda gramática de verdade" },
      {
        property: "og:description",
        content:
          "Trilhas por nível de ensino, videoaulas curtas, exercícios interativos e simulados com correção automática.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Play,
    title: "Videoaulas objetivas",
    text: "Aulas curtas que explicam a regra a partir de exemplos reais, não de definições decoradas.",
  },
  {
    icon: ClipboardCheck,
    title: "Exercícios interativos",
    text: "Correção imediata com explicação do porquê — o erro vira aprendizado na hora.",
  },
  {
    icon: BarChart3,
    title: "Progresso visível",
    text: "Acompanhe aulas concluídas, notas dos simulados e evolução por módulo.",
  },
  {
    icon: Trophy,
    title: "Conquistas",
    text: "Metas e medalhas que mantêm a rotina de estudo viva sem virar obrigação.",
  },
  {
    icon: GraduationCap,
    title: "Trilhas por nível",
    text: "Do alfabeto às pegadinhas de banca: cada etapa com a linguagem certa para a idade.",
  },
  {
    icon: Sparkles,
    title: "Resumos e simulados",
    text: "Resumos rápidos para revisar antes da prova e simulados com histórico de notas.",
  },
];

const testimonials = [
  {
    name: "Larissa M.",
    role: "9º ano",
    text: "Finalmente entendi crase. As aulas mostram o teste na prática e eu parei de chutar nas provas.",
  },
  {
    name: "Rogério S.",
    role: "Concurseiro — Tribunal",
    text: "Os simulados no estilo de banca com correção comentada mudaram meu rendimento em português.",
  },
  {
    name: "Prof.ª Beatriz",
    role: "Fundamental I",
    text: "Uso os módulos como reforço com a turma. As crianças gostam porque parece jogo, mas é conteúdo sério.",
  },
];

const accentClass: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent text-accent-foreground",
  highlight: "bg-highlight/50 text-highlight-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

function Home() {
  return (
    <PublicLayout>
      <section className="surface-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="size-3.5" /> Aprender de verdade, sem decoreba
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Gramática que faz sentido no seu ritmo
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              O Gramaticando organiza a língua portuguesa em trilhas por nível de ensino, com
              videoaulas, explicações comentadas, exercícios interativos e simulados que corrigem na
              hora — para você entender a regra, e não apenas memorizá-la.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full surface-primary text-primary-foreground shadow-soft"
              >
                <Link to="/auth" search={{ modo: "cadastro" }}>
                  Começar agora <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/sobre">Como funciona</Link>
              </Button>
            </div>
          </div>

          <img
            src={heroImage}
            alt="Ilustração de estudantes aprendendo gramática com livros e balões de fala"
            width={1280}
            height={960}
            className="w-full rounded-4xl shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Escolha o seu nível</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cada nível tem módulos próprios, organizados por assunto e com linguagem adequada à
            etapa de aprendizagem.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <Link
              key={level.slug}
              to="/niveis/$nivel"
              params={{ nivel: level.slug }}
              className="card-hover group rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span
                className={`inline-flex rounded-2xl px-3 py-1 text-xs font-bold ${accentClass[level.accent]}`}
              >
                {level.audience}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{level.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{level.tagline}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                Ver módulos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Tudo o que você precisa para estudar sozinho
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover rounded-3xl border-border shadow-soft">
                <CardContent className="p-6">
                  <span className="grid size-11 place-items-center rounded-2xl surface-sun text-highlight-foreground">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Quem estuda, recomenda</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full surface-primary font-bold text-primary-foreground">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="surface-hero rounded-4xl border border-border p-10 text-center shadow-lift sm:p-14">
          <BookOpenCheck className="mx-auto size-10 text-primary" />
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Crie sua conta gratuita e comece hoje
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Salve seu progresso, acompanhe estatísticas e faça simulados com correção automática.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full surface-primary text-primary-foreground shadow-soft"
          >
            <Link to="/auth" search={{ modo: "cadastro" }}>
              Quero me cadastrar <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
