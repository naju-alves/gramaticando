import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout, PageHero } from "@/components/public-layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog do Gramaticando — Dicas de gramática e estudo" },
      {
        name: "description",
        content:
          "Artigos sobre crase, concordância, pontuação, redação e técnicas de estudo para provas escolares e concursos públicos.",
      },
      { property: "og:title", content: "Blog do Gramaticando" },
      {
        property: "og:description",
        content: "Dicas práticas de gramática e estudo para alunos e concurseiros.",
      },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    title: "Crase: o teste do masculino resolve 90% dos casos",
    category: "Ensino Médio",
    date: "12 de julho de 2026",
    excerpt:
      "Troque a palavra feminina por uma masculina. Se surgir 'ao', existe crase. Veja como aplicar o teste em frases de prova.",
  },
  {
    title: "Concordância verbal: as três pegadinhas mais cobradas",
    category: "Concursos",
    date: "28 de junho de 2026",
    excerpt:
      "Verbo 'haver' impessoal, sujeito posposto e expressões partitivas. Entenda a lógica por trás de cada caso.",
  },
  {
    title: "Como ensinar sílabas sem transformar a aula em decoreba",
    category: "Fundamental I",
    date: "10 de junho de 2026",
    excerpt:
      "Atividades com ritmo, palmas e leitura em voz alta que fazem a criança perceber os golpes de voz.",
  },
  {
    title: "Vírgula: quando ela muda completamente o sentido",
    category: "Fundamental II",
    date: "2 de junho de 2026",
    excerpt:
      "Oração adjetiva explicativa x restritiva, aposto e vocativo: três situações em que a vírgula decide a interpretação.",
  },
  {
    title: "Rotina de estudos: 25 minutos por dia bastam?",
    category: "Método",
    date: "20 de maio de 2026",
    excerpt:
      "O que a repetição espaçada tem a ensinar para quem estuda gramática de forma autônoma.",
  },
  {
    title: "Subjuntivo: por que 'se eu ver' está errado",
    category: "Ensino Médio",
    date: "8 de maio de 2026",
    excerpt:
      "Entenda a diferença entre indicativo e subjuntivo e nunca mais erre o futuro dos verbos irregulares.",
  },
];

function Blog() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Conteúdo aberto"
        title="Blog do Gramaticando"
        description="Artigos curtos sobre gramática, escrita e rotina de estudos — escritos pelos mesmos professores das trilhas."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="card-hover flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="w-fit rounded-full bg-highlight/50 px-3 py-1 text-xs font-bold text-highlight-foreground">
                {post.category}
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold leading-snug">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <time className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {post.date}
              </time>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
