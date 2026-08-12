import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout, PageHero } from "@/components/public-layout";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — Quem faz o Gramaticando" },
      {
        name: "description",
        content:
          "Conheça o time de professores e educadores por trás do Gramaticando e os valores que guiam o ensino de gramática na plataforma.",
      },
      { property: "og:title", content: "Sobre Nós — Gramaticando" },
      {
        property: "og:description",
        content: "Professores de língua portuguesa e educadores construindo um ensino sem decoreba.",
      },
    ],
  }),
  component: AboutUs,
});

const team = [
  {
    name: "Beatriz Andrade",
    role: "Coordenadora pedagógica",
    text: "Professora de língua portuguesa há 18 anos, especialista em alfabetização e letramento.",
  },
  {
    name: "Caio Menezes",
    role: "Professor de gramática",
    text: "Mestre em linguística, responsável pelas trilhas de Ensino Médio e preparação para o ENEM.",
  },
  {
    name: "Renata Lopes",
    role: "Professora de concursos",
    text: "Aprovada em três concursos federais, cuida das trilhas de português para bancas.",
  },
  {
    name: "Diego Farias",
    role: "Design de aprendizagem",
    text: "Transforma conteúdo denso em exercícios curtos, visuais e com feedback imediato.",
  },
];

const values = [
  ["Clareza acima de tudo", "Se a explicação precisa de outra explicação, ela ainda não está pronta."],
  ["Erro é dado", "Cada erro no exercício vira uma explicação personalizada, nunca uma punição."],
  ["Língua viva", "Trabalhamos com a norma-padrão sem desprezar as variedades da língua falada."],
];

function AboutUs() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Quem somos"
        title="Sobre Nós"
        description="Somos professores, linguistas e designers de aprendizagem que acreditam que gramática se aprende usando a língua, não repetindo definições."
      />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold">O time</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {team.map((person) => (
            <div
              key={person.name}
              className="card-hover rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full surface-primary font-display text-lg font-bold text-primary-foreground">
                  {person.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{person.name}</h3>
                  <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {person.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{person.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold">No que acreditamos</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-border bg-muted/50 p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
