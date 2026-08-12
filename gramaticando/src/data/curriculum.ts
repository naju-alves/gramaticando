export type Exercise = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  slug: string;
  title: string;
  duration: string;
  videoId: string;
  explanation: string;
  examples: string[];
  summary: string[];
  exercises: Exercise[];
};

export type Module = {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Level = {
  slug: string;
  name: string;
  audience: string;
  tagline: string;
  description: string;
  accent: "primary" | "accent" | "highlight" | "secondary";
  modules: Module[];
  exam: {
    slug: string;
    title: string;
    description: string;
    questions: Exercise[];
  };
};

const video = "8mtNsyM2sPk";

export const levels: Level[] = [
  {
    slug: "fundamental-1",
    name: "Ensino Fundamental I",
    audience: "1º ao 5º ano",
    tagline: "Primeiros passos com as palavras",
    description:
      "Alfabetização gramatical com jogos, histórias e exercícios curtos. O aluno aprende a reconhecer sons, sílabas e as classes de palavras mais usadas no dia a dia.",
    accent: "highlight",
    modules: [
      {
        slug: "alfabeto-e-silabas",
        title: "Alfabeto e sílabas",
        description: "Sons, letras e a divisão silábica sem decoreba.",
        lessons: [
          {
            slug: "vogais-e-consoantes",
            title: "Vogais e consoantes",
            duration: "8 min",
            videoId: video,
            explanation:
              "As letras do alfabeto se dividem em vogais (a, e, i, o, u) e consoantes. As vogais são produzidas com o ar saindo livremente pela boca; as consoantes precisam de um obstáculo — lábios, língua ou dentes. Toda sílaba do português tem pelo menos uma vogal, e é justamente isso que faz a palavra soar.",
            examples: [
              "casa → c-a-s-a: duas vogais (a, a) e duas consoantes (c, s).",
              "uva → começa com vogal e tem apenas uma consoante.",
              "não existe sílaba sem vogal: 'livro' = li-vro.",
            ],
            summary: [
              "Vogais: a, e, i, o, u.",
              "Consoantes precisam de um obstáculo para soar.",
              "Toda sílaba tem pelo menos uma vogal.",
            ],
            exercises: [
              {
                question: "Quantas vogais existem na palavra 'escola'?",
                options: ["2", "3", "4", "5"],
                answer: 1,
                explanation: "e-o-a: são três vogais em 'escola'.",
              },
              {
                question: "Qual palavra é formada apenas por vogais?",
                options: ["ovo", "ai", "sol", "mel"],
                answer: 1,
                explanation: "'ai' é formada só pelas vogais a e i.",
              },
              {
                question: "Toda sílaba precisa ter...",
                options: ["uma consoante", "uma vogal", "duas letras", "um acento"],
                answer: 1,
                explanation: "A vogal é o som que sustenta a sílaba.",
              },
            ],
          },
          {
            slug: "separacao-silabica",
            title: "Separação de sílabas",
            duration: "10 min",
            videoId: video,
            explanation:
              "Separar sílabas é dividir a palavra pelos golpes de voz. Cada vez que a voz 'bate', nasce uma sílaba. Dígrafos como ch, lh, nh nunca se separam, e encontros consonantais como bl, pr e tr costumam ficar juntos quando iniciam sílaba.",
            examples: [
              "chapéu → cha-péu (o ch não se separa).",
              "prato → pra-to (pr inicia sílaba, fica junto).",
              "carro → car-ro (rr se separa).",
            ],
            summary: [
              "Uma sílaba = um golpe de voz.",
              "ch, lh, nh, gu, qu não se separam.",
              "rr, ss, sc se separam.",
            ],
            exercises: [
              {
                question: "A separação correta de 'coelho' é:",
                options: ["coe-lho", "co-e-lho", "co-el-ho", "coel-ho"],
                answer: 1,
                explanation: "O dígrafo lh permanece junto: co-e-lho.",
              },
              {
                question: "Qual palavra tem 4 sílabas?",
                options: ["bicicleta", "cadeira", "janela", "cachorro"],
                answer: 0,
                explanation: "bi-ci-cle-ta tem quatro sílabas.",
              },
              {
                question: "Em qual das palavras as letras se separam?",
                options: ["ninho", "passo", "milho", "queijo"],
                answer: 1,
                explanation: "pas-so: o dígrafo ss se separa.",
              },
            ],
          },
        ],
      },
      {
        slug: "substantivo-e-adjetivo",
        title: "Substantivo e adjetivo",
        description: "Nomear e caracterizar o mundo ao redor.",
        lessons: [
          {
            slug: "o-que-e-substantivo",
            title: "O que é substantivo",
            duration: "9 min",
            videoId: video,
            explanation:
              "Substantivo é a palavra que dá nome: pessoas, lugares, objetos, sentimentos. Um teste prático: se você consegue colocar 'o', 'a', 'um' ou 'uma' na frente, é substantivo.",
            examples: [
              "a professora, o parque, uma saudade.",
              "Comuns: menino, cidade. Próprios: João, Recife.",
              "Coletivos: cardume (peixes), matilha (cães).",
            ],
            summary: [
              "Substantivo nomeia seres, coisas e sentimentos.",
              "Aceita artigo antes dele.",
              "Pode ser comum, próprio ou coletivo.",
            ],
            exercises: [
              {
                question: "Qual palavra é um substantivo próprio?",
                options: ["cidade", "Brasil", "casa", "alegre"],
                answer: 1,
                explanation: "Substantivos próprios nomeiam algo específico e são escritos com maiúscula.",
              },
              {
                question: "O coletivo de 'abelhas' é:",
                options: ["cardume", "enxame", "matilha", "rebanho"],
                answer: 1,
                explanation: "Enxame é o coletivo de abelhas.",
              },
              {
                question: "Em 'A coragem venceu o medo', quantos substantivos há?",
                options: ["1", "2", "3", "nenhum"],
                answer: 1,
                explanation: "'coragem' e 'medo' nomeiam sentimentos: dois substantivos.",
              },
            ],
          },
          {
            slug: "adjetivos-na-pratica",
            title: "Adjetivos na prática",
            duration: "7 min",
            videoId: video,
            explanation:
              "O adjetivo caracteriza o substantivo: diz como ele é. Ele concorda em gênero e número com a palavra que acompanha — por isso dizemos 'meninas simpáticas', e não 'meninas simpático'.",
            examples: [
              "céu azul, noites longas, história divertida.",
              "Locução adjetiva: amor de mãe = amor materno.",
            ],
            summary: [
              "Adjetivo caracteriza o substantivo.",
              "Concorda em gênero e número.",
              "Locução adjetiva equivale a um adjetivo.",
            ],
            exercises: [
              {
                question: "Em 'O gato preto dorme', o adjetivo é:",
                options: ["gato", "preto", "dorme", "o"],
                answer: 1,
                explanation: "'preto' caracteriza o substantivo 'gato'.",
              },
              {
                question: "Qual a forma correta?",
                options: [
                  "As flores bonito",
                  "As flores bonitas",
                  "A flores bonitas",
                  "As flor bonitas",
                ],
                answer: 1,
                explanation: "O adjetivo concorda em gênero e número com o substantivo.",
              },
              {
                question: "A locução 'de criança' equivale ao adjetivo:",
                options: ["infantil", "juvenil", "materno", "fraterno"],
                answer: 0,
                explanation: "de criança = infantil.",
              },
            ],
          },
        ],
      },
      {
        slug: "pontuacao-basica",
        title: "Pontuação básica",
        description: "Pontos, vírgulas e o ritmo da leitura.",
        lessons: [
          {
            slug: "ponto-virgula-exclamacao",
            title: "Ponto, vírgula e exclamação",
            duration: "8 min",
            videoId: video,
            explanation:
              "A pontuação organiza a fala no papel. O ponto final encerra a ideia, a vírgula marca pausas e separa elementos de uma lista, a interrogação pergunta e a exclamação mostra emoção.",
            examples: [
              "Comprei maçã, banana e uva.",
              "Você vai à escola?",
              "Que dia lindo!",
            ],
            summary: [
              "Ponto final: fecha a ideia.",
              "Vírgula: pausa e separação de itens.",
              "Antes do 'e' em lista simples não se usa vírgula.",
            ],
            exercises: [
              {
                question: "Qual frase está pontuada corretamente?",
                options: [
                  "Comprei pão, leite, e queijo.",
                  "Comprei pão leite e queijo.",
                  "Comprei pão, leite e queijo.",
                  "Comprei, pão leite e queijo.",
                ],
                answer: 2,
                explanation: "Itens separados por vírgula e o último ligado por 'e'.",
              },
              {
                question: "Que sinal indica emoção forte?",
                options: ["ponto final", "vírgula", "exclamação", "dois-pontos"],
                answer: 2,
                explanation: "A exclamação marca surpresa, alegria ou espanto.",
              },
              {
                question: "'Maria, venha aqui' — a vírgula serve para:",
                options: [
                  "separar itens",
                  "isolar o vocativo",
                  "marcar fim de frase",
                  "indicar dúvida",
                ],
                answer: 1,
                explanation: "Maria é vocativo (chamamento) e vem isolado por vírgula.",
              },
            ],
          },
        ],
      },
    ],
    exam: {
      slug: "simulado-fund1",
      title: "Simulado — Fundamental I",
      description: "10 minutos, 5 questões de revisão geral.",
      questions: [
        {
          question: "Quantas sílabas tem 'borboleta'?",
          options: ["3", "4", "5", "2"],
          answer: 1,
          explanation: "bor-bo-le-ta: quatro sílabas.",
        },
        {
          question: "Qual palavra é adjetivo?",
          options: ["correr", "feliz", "mesa", "rapidamente"],
          answer: 1,
          explanation: "'feliz' caracteriza um substantivo.",
        },
        {
          question: "O coletivo de 'lobos' é:",
          options: ["enxame", "matilha", "cardume", "revoada"],
          answer: 1,
          explanation: "Matilha é o coletivo de lobos e cães.",
        },
        {
          question: "Qual frase precisa de interrogação?",
          options: ["Que susto", "Onde você mora", "Eu gosto de ler", "Feche a porta"],
          answer: 1,
          explanation: "É uma pergunta direta.",
        },
        {
          question: "Em 'A menina alegre cantou', o substantivo é:",
          options: ["alegre", "cantou", "menina", "a"],
          answer: 2,
          explanation: "'menina' nomeia o ser da frase.",
        },
      ],
    },
  },
  {
    slug: "fundamental-2",
    name: "Ensino Fundamental II",
    audience: "6º ao 9º ano",
    tagline: "Da palavra para a frase",
    description:
      "Classes gramaticais completas, concordância e os primeiros passos na análise sintática, sempre partindo de textos reais.",
    accent: "primary",
    modules: [
      {
        slug: "classes-de-palavras",
        title: "Classes de palavras",
        description: "As dez classes e como identificá-las na frase.",
        lessons: [
          {
            slug: "verbos-tempos-e-modos",
            title: "Verbos: tempos e modos",
            duration: "12 min",
            videoId: video,
            explanation:
              "O verbo indica ação, estado ou fenômeno e se flexiona em tempo (passado, presente, futuro), modo (indicativo, subjuntivo, imperativo) e pessoa. Reconhecer o modo é o que evita erros como 'se eu ver' no lugar de 'se eu vir'.",
            examples: [
              "Indicativo (certeza): eu estudo todos os dias.",
              "Subjuntivo (hipótese): se eu estudasse, passaria.",
              "Imperativo (ordem): estude agora.",
            ],
            summary: [
              "Três modos: indicativo, subjuntivo, imperativo.",
              "Subjuntivo expressa hipótese e desejo.",
              "'Se eu vir', 'quando eu puser', 'se ele vier'.",
            ],
            exercises: [
              {
                question: "Assinale a forma correta:",
                options: [
                  "Se eu ver o professor, aviso.",
                  "Se eu vir o professor, aviso.",
                  "Se eu vier o professor, aviso.",
                  "Se eu visse o professor, aviso.",
                ],
                answer: 1,
                explanation: "Futuro do subjuntivo do verbo ver: quando eu vir.",
              },
              {
                question: "'Estudarei amanhã' está em qual tempo?",
                options: [
                  "pretérito perfeito",
                  "presente",
                  "futuro do presente",
                  "futuro do pretérito",
                ],
                answer: 2,
                explanation: "Indica ação futura em relação ao presente.",
              },
              {
                question: "Qual frase está no modo imperativo?",
                options: ["Ele lê muito.", "Leia este livro.", "Se ele lesse...", "Eu li ontem."],
                answer: 1,
                explanation: "O imperativo dá ordem ou pedido.",
              },
            ],
          },
          {
            slug: "pronomes",
            title: "Pronomes e referência",
            duration: "10 min",
            videoId: video,
            explanation:
              "Pronomes substituem ou acompanham o substantivo e mantêm o texto coeso, evitando repetições. Os pessoais podem ser retos (sujeito) ou oblíquos (complemento) — daí a diferença entre 'entre eu e você' (errado) e 'entre mim e você' (certo).",
            examples: [
              "Ana chegou. Ela trouxe o livro.",
              "Entre mim e você não há segredos.",
              "Este (perto de mim), esse (perto de você), aquele (longe).",
            ],
            summary: [
              "Retos: eu, tu, ele... funcionam como sujeito.",
              "Oblíquos: mim, ti, o, a, lhe... funcionam como complemento.",
              "Depois de preposição usa-se o oblíquo: para mim.",
            ],
            exercises: [
              {
                question: "Assinale a alternativa correta:",
                options: [
                  "Este trabalho é para eu fazer.",
                  "Este trabalho é para mim fazer.",
                  "Este trabalho é para mim fazê-lo.",
                  "Este trabalho é pra mim fazer.",
                ],
                answer: 0,
                explanation: "Antes de verbo no infinitivo, usa-se o pronome reto: para eu fazer.",
              },
              {
                question: "'Entre ___ e ela não houve briga.' Complete:",
                options: ["eu", "mim", "me", "comigo"],
                answer: 1,
                explanation: "Depois da preposição 'entre' usa-se o oblíquo tônico 'mim'.",
              },
              {
                question: "O pronome que indica objeto longe dos dois falantes é:",
                options: ["este", "esse", "aquele", "isto"],
                answer: 2,
                explanation: "'Aquele' indica distância dos dois interlocutores.",
              },
            ],
          },
        ],
      },
      {
        slug: "sintaxe-inicial",
        title: "Sintaxe inicial",
        description: "Sujeito, predicado e os termos essenciais.",
        lessons: [
          {
            slug: "sujeito-e-predicado",
            title: "Sujeito e predicado",
            duration: "11 min",
            videoId: video,
            explanation:
              "O sujeito é o termo sobre o qual se declara algo; o predicado é a declaração. Para achar o sujeito, pergunte ao verbo: 'quem?' ou 'o quê?'. Cuidado com o sujeito oculto e com as orações sem sujeito, como as de verbos que indicam fenômenos da natureza.",
            examples: [
              "Os alunos chegaram cedo. → sujeito: os alunos.",
              "Chegamos cedo. → sujeito oculto: nós.",
              "Choveu muito ontem. → oração sem sujeito.",
            ],
            summary: [
              "Sujeito responde 'quem?' antes do verbo.",
              "Sujeito oculto está indicado pela desinência verbal.",
              "Verbos de fenômeno natural formam oração sem sujeito.",
            ],
            exercises: [
              {
                question: "Em 'Fazia frio naquela noite', o sujeito é:",
                options: ["frio", "naquela noite", "oculto (ele)", "inexistente"],
                answer: 3,
                explanation: "'Fazer' indicando fenômeno é impessoal: oração sem sujeito.",
              },
              {
                question: "Em 'Estudamos para a prova', o sujeito é:",
                options: ["a prova", "oculto: nós", "indeterminado", "inexistente"],
                answer: 1,
                explanation: "A desinência -mos indica o sujeito 'nós'.",
              },
              {
                question: "Qual frase tem sujeito indeterminado?",
                options: [
                  "Roubaram minha bicicleta.",
                  "João roubou a bicicleta.",
                  "Choveu granizo.",
                  "Nós fomos embora.",
                ],
                answer: 0,
                explanation: "Verbo na 3ª pessoa do plural sem referência = sujeito indeterminado.",
              },
            ],
          },
        ],
      },
      {
        slug: "concordancia",
        title: "Concordância",
        description: "Verbo e nome combinando certo.",
        lessons: [
          {
            slug: "concordancia-verbal",
            title: "Concordância verbal",
            duration: "10 min",
            videoId: video,
            explanation:
              "O verbo concorda com o sujeito em número e pessoa. As pegadinhas aparecem quando o sujeito vem depois do verbo, quando há expressões partitivas ou quando o verbo 'haver' significa 'existir' — nesse caso ele fica sempre no singular.",
            examples: [
              "Faltaram dois alunos. (sujeito: dois alunos)",
              "Havia muitos livros na estante. (haver = existir, singular)",
              "A maioria dos alunos chegou / chegaram — ambas aceitas.",
            ],
            summary: [
              "Verbo concorda com o núcleo do sujeito.",
              "'Haver' no sentido de existir é impessoal.",
              "'Fazer' indicando tempo também é impessoal: faz dois anos.",
            ],
            exercises: [
              {
                question: "Assinale a correta:",
                options: [
                  "Haviam muitas pessoas na fila.",
                  "Havia muitas pessoas na fila.",
                  "Houveram muitas pessoas na fila.",
                  "Hão de haverem pessoas.",
                ],
                answer: 1,
                explanation: "'Haver' com sentido de existir é impessoal: fica no singular.",
              },
              {
                question: "'___ dois anos que não o vejo.'",
                options: ["Fazem", "Fazem-se", "Faz", "Fazia-se"],
                answer: 2,
                explanation: "'Fazer' indicando tempo decorrido é impessoal.",
              },
              {
                question: "Qual frase está correta?",
                options: [
                  "Chegou os documentos.",
                  "Chegaram os documentos.",
                  "Chegaram o documento.",
                  "Chegou os documento.",
                ],
                answer: 1,
                explanation: "O sujeito 'os documentos' é plural, o verbo também.",
              },
            ],
          },
        ],
      },
    ],
    exam: {
      slug: "simulado-fund2",
      title: "Simulado — Fundamental II",
      description: "5 questões de classes de palavras, sintaxe e concordância.",
      questions: [
        {
          question: "Assinale a frase correta:",
          options: [
            "Haviam muitos alunos.",
            "Existia muitos alunos.",
            "Havia muitos alunos.",
            "Houveram muitos alunos.",
          ],
          answer: 2,
          explanation: "'Haver' no sentido de existir é impessoal.",
        },
        {
          question: "'Se eu ___ tempo, ajudo você.'",
          options: ["ter", "tiver", "tivesse", "terei"],
          answer: 1,
          explanation: "Futuro do subjuntivo: se eu tiver.",
        },
        {
          question: "Em 'Venderam-se casas', o sujeito é:",
          options: ["indeterminado", "casas", "oculto", "inexistente"],
          answer: 1,
          explanation: "Voz passiva sintética: casas foram vendidas.",
        },
        {
          question: "'Nada me abala' — a palavra 'me' é pronome:",
          options: ["reto", "oblíquo", "possessivo", "demonstrativo"],
          answer: 1,
          explanation: "'me' é pronome oblíquo átono.",
        },
        {
          question: "Qual palavra é advérbio?",
          options: ["rápido", "rapidamente", "rapidez", "rápida"],
          answer: 1,
          explanation: "Advérbios de modo costumam terminar em -mente.",
        },
      ],
    },
  },
  {
    slug: "medio",
    name: "Ensino Médio",
    audience: "1ª à 3ª série + ENEM",
    tagline: "Gramática a serviço do texto",
    description:
      "Sintaxe do período composto, regência, crase e uso da norma-padrão na redação. Foco em ENEM e vestibulares.",
    accent: "secondary",
    modules: [
      {
        slug: "periodo-composto",
        title: "Período composto",
        description: "Coordenação e subordinação sem susto.",
        lessons: [
          {
            slug: "oracoes-subordinadas",
            title: "Orações subordinadas",
            duration: "14 min",
            videoId: video,
            explanation:
              "No período composto por subordinação, uma oração exerce função sintática dentro da outra. Substantivas ocupam lugar de sujeito ou objeto, adjetivas equivalem a um adjetivo e vêm ligadas por pronome relativo, e adverbiais indicam circunstância (causa, condição, concessão...).",
            examples: [
              "É necessário que você estude. → subordinada substantiva subjetiva.",
              "O livro que comprei é ótimo. → adjetiva restritiva.",
              "Embora chovesse, saímos. → adverbial concessiva.",
            ],
            summary: [
              "Substantiva: cabe 'isso' no lugar.",
              "Adjetiva: introduzida por pronome relativo.",
              "Adjetiva explicativa vem entre vírgulas.",
            ],
            exercises: [
              {
                question: "'Espero que tudo dê certo.' A subordinada é:",
                options: [
                  "substantiva objetiva direta",
                  "adjetiva restritiva",
                  "adverbial causal",
                  "coordenada aditiva",
                ],
                answer: 0,
                explanation: "'Espero isso' — a oração é objeto direto de 'espero'.",
              },
              {
                question: "Em 'Os alunos, que estudaram, passaram', a vírgula indica oração:",
                options: ["restritiva", "explicativa", "causal", "consecutiva"],
                answer: 1,
                explanation: "Entre vírgulas, a adjetiva é explicativa: todos estudaram.",
              },
              {
                question: "'Embora estivesse cansado, continuou' expressa:",
                options: ["causa", "concessão", "condição", "finalidade"],
                answer: 1,
                explanation: "'Embora' introduz oração concessiva.",
              },
            ],
          },
        ],
      },
      {
        slug: "regencia-e-crase",
        title: "Regência e crase",
        description: "A regra da crase que realmente funciona.",
        lessons: [
          {
            slug: "crase",
            title: "Crase sem mistério",
            duration: "12 min",
            videoId: video,
            explanation:
              "Crase é a fusão da preposição 'a' com o artigo 'a'. O teste mais confiável: troque a palavra feminina por uma masculina. Se aparecer 'ao', há crase. Nunca há crase antes de palavra masculina, verbo ou pronome pessoal.",
            examples: [
              "Vou à escola → vou ao colégio: tem crase.",
              "Vou a Brasília → vou a Roma: sem artigo, sem crase.",
              "Refiro-me a você / Começou a chover: sem crase.",
            ],
            summary: [
              "Troque por masculino: se der 'ao', use à.",
              "Antes de verbo e pronome pessoal, nunca.",
              "Em locuções femininas (à noite, às pressas), sempre.",
            ],
            exercises: [
              {
                question: "Assinale a frase correta:",
                options: [
                  "Refiro-me à você.",
                  "Cheguei à casa de Ana.",
                  "Começou à chover.",
                  "Vou à pé.",
                ],
                answer: 1,
                explanation: "'Cheguei ao lar de Ana' → crase confirmada.",
              },
              {
                question: "'Entreguei o livro ___ professora.'",
                options: ["a", "à", "há", "as"],
                answer: 1,
                explanation: "Entreguei ao professor → há crase.",
              },
              {
                question: "Em qual caso NUNCA há crase?",
                options: [
                  "antes de locução feminina",
                  "antes de nome de cidade que aceita artigo",
                  "antes de verbo",
                  "antes de 'aquela'",
                ],
                answer: 2,
                explanation: "Antes de verbo não existe artigo, logo não há crase.",
              },
            ],
          },
        ],
      },
      {
        slug: "pontuacao-avancada",
        title: "Pontuação avançada",
        description: "Vírgula que muda o sentido do texto.",
        lessons: [
          {
            slug: "virgula-avancada",
            title: "Usos decisivos da vírgula",
            duration: "10 min",
            videoId: video,
            explanation:
              "Nunca se separa sujeito de verbo nem verbo de complemento por vírgula. Ela serve para isolar apostos, vocativos, adjuntos adverbiais deslocados e orações intercaladas — e é isso que a banca cobra.",
            examples: [
              "Ontem, à tarde, saímos. (adverbiais deslocados)",
              "Machado de Assis, autor de Dom Casmurro, morreu em 1908. (aposto)",
              "Errado: Os alunos, chegaram cedo.",
            ],
            summary: [
              "Não separe sujeito de verbo.",
              "Isole apostos e vocativos.",
              "Adverbial deslocado longo pede vírgula.",
            ],
            exercises: [
              {
                question: "Qual frase está pontuada corretamente?",
                options: [
                  "Os candidatos, receberam o resultado.",
                  "Os candidatos receberam, o resultado.",
                  "Ontem, os candidatos receberam o resultado.",
                  "Os, candidatos receberam o resultado.",
                ],
                answer: 2,
                explanation: "Adjunto adverbial deslocado no início é isolado por vírgula.",
              },
              {
                question: "A vírgula em 'Pedro, o médico, chegou' isola um:",
                options: ["vocativo", "aposto", "objeto", "predicativo"],
                answer: 1,
                explanation: "'o médico' explica Pedro: é aposto.",
              },
              {
                question: "Assinale o uso incorreto:",
                options: [
                  "Estudei muito, portanto passei.",
                  "Comprei livros, cadernos e canetas.",
                  "A prova, foi difícil.",
                  "Meninos, prestem atenção.",
                ],
                answer: 2,
                explanation: "Não se separa sujeito do verbo por vírgula.",
              },
            ],
          },
        ],
      },
    ],
    exam: {
      slug: "simulado-medio",
      title: "Simulado — Ensino Médio",
      description: "5 questões no estilo ENEM.",
      questions: [
        {
          question: "Assinale a frase com crase correta:",
          options: [
            "Vou à Brasília.",
            "Assisti à peça ontem.",
            "Refiro-me à ele.",
            "Estou disposto à ajudar.",
          ],
          answer: 1,
          explanation: "Assistir a (ver) + a peça = à peça.",
        },
        {
          question: "'Quem ama cuida' — a oração destacada 'Quem ama' é:",
          options: [
            "substantiva subjetiva",
            "adjetiva restritiva",
            "adverbial condicional",
            "coordenada",
          ],
          answer: 0,
          explanation: "Equivale a 'Isso cuida': funciona como sujeito.",
        },
        {
          question: "Qual período é composto por coordenação?",
          options: [
            "Cheguei quando anoiteceu.",
            "Estudei e passei.",
            "Espero que venha.",
            "O livro que li é bom.",
          ],
          answer: 1,
          explanation: "Duas orações independentes ligadas por 'e'.",
        },
        {
          question: "'Obedeça ___ regras.' Complete corretamente:",
          options: ["as", "às", "há", "a"],
          answer: 1,
          explanation: "Obedecer a + as regras = às regras.",
        },
        {
          question: "A vírgula está corretamente empregada em:",
          options: [
            "Todos os alunos, fizeram a prova.",
            "Na semana passada, viajamos.",
            "Ele comprou, pão e leite.",
            "A cidade que, visitei é linda.",
          ],
          answer: 1,
          explanation: "Adjunto adverbial deslocado é isolado por vírgula.",
        },
      ],
    },
  },
  {
    slug: "concursos",
    name: "Concursos Públicos",
    audience: "Carreiras policiais, tribunais e fiscais",
    tagline: "Português de banca, direto ao ponto",
    description:
      "Treino intensivo em pegadinhas de CESPE, FGV e FCC: reescrita de frases, colocação pronominal, regência e semântica.",
    accent: "accent",
    modules: [
      {
        slug: "pegadinhas-de-banca",
        title: "Pegadinhas de banca",
        description: "Os erros que mais derrubam candidatos.",
        lessons: [
          {
            slug: "colocacao-pronominal",
            title: "Colocação pronominal",
            duration: "13 min",
            videoId: video,
            explanation:
              "Próclise, mesóclise e ênclise. A regra prática: palavras atrativas (negação, advérbio, pronome relativo, indefinido e conjunção subordinativa) puxam o pronome para antes do verbo. Sem atrativo, na norma-padrão o pronome vai depois.",
            examples: [
              "Não me diga. (próclise por negação)",
              "Diga-me a verdade. (ênclise, sem atrativo)",
              "Dir-lhe-ei amanhã. (mesóclise com futuro)",
            ],
            summary: [
              "Palavra atrativa → próclise.",
              "Início de frase nunca começa com pronome átono.",
              "Futuro do presente/pretérito → mesóclise.",
            ],
            exercises: [
              {
                question: "Assinale a correta:",
                options: [
                  "Me empresta o livro, por favor.",
                  "Não me empreste o livro.",
                  "Não empreste-me o livro.",
                  "Empresta-me-á o livro.",
                ],
                answer: 1,
                explanation: "A negação atrai o pronome: próclise.",
              },
              {
                question: "Com verbo no futuro do presente sem atrativo, usa-se:",
                options: ["próclise", "ênclise", "mesóclise", "nenhuma"],
                answer: 2,
                explanation: "Far-se-á, dir-te-ei: mesóclise.",
              },
              {
                question: "Qual está de acordo com a norma-padrão?",
                options: [
                  "Se apresentou ao chefe.",
                  "Apresentou-se ao chefe.",
                  "Se-apresentou ao chefe.",
                  "Apresentou se ao chefe.",
                ],
                answer: 1,
                explanation: "Não se inicia período com pronome átono.",
              },
            ],
          },
          {
            slug: "regencia-verbal",
            title: "Regência verbal",
            duration: "12 min",
            videoId: video,
            explanation:
              "Regência é a relação entre o verbo e seus complementos. Bancas exploram verbos que mudam de sentido conforme a preposição: assistir, aspirar, visar, implicar, preferir.",
            examples: [
              "Assistir ao filme (ver) x assistir o doente (ajudar).",
              "Visar ao cargo (pretender) x visar o cheque (assinar).",
              "Prefiro café a chá (nunca 'do que').",
            ],
            summary: [
              "Assistir = ver → exige preposição 'a'.",
              "Preferir: prefiro X a Y.",
              "Implicar (acarretar) não pede preposição.",
            ],
            exercises: [
              {
                question: "Assinale a correta:",
                options: [
                  "Assisti o jogo ontem.",
                  "Assisti ao jogo ontem.",
                  "Assisti no jogo ontem.",
                  "Assisti do jogo ontem.",
                ],
                answer: 1,
                explanation: "Assistir no sentido de ver exige 'a'.",
              },
              {
                question: "'Prefiro estudar ___ trabalhar.'",
                options: ["do que", "a", "que", "de que"],
                answer: 1,
                explanation: "Preferir algo a algo.",
              },
              {
                question: "'A medida implicou ___ aumento de custos.'",
                options: ["em", "no", "ao", "sem preposição"],
                answer: 3,
                explanation: "Implicar como 'acarretar' é transitivo direto.",
              },
            ],
          },
        ],
      },
      {
        slug: "interpretacao-e-reescrita",
        title: "Interpretação e reescrita",
        description: "Manter o sentido ao reescrever a frase.",
        lessons: [
          {
            slug: "reescrita-de-frases",
            title: "Reescrita mantendo o sentido",
            duration: "11 min",
            videoId: video,
            explanation:
              "A banca troca conectivos e estruturas e pergunta se o sentido foi preservado. É preciso dominar equivalência entre conectivos (porque = visto que), voz ativa e passiva, e o efeito da vírgula sobre orações adjetivas.",
            examples: [
              "Ativa: O júri premiou o autor. Passiva: O autor foi premiado pelo júri.",
              "porque = uma vez que, visto que.",
              "porém = contudo, todavia, entretanto.",
            ],
            summary: [
              "Passiva mantém sentido, muda a estrutura.",
              "Concessivo ≠ causal.",
              "Retirar vírgulas de adjetiva muda o sentido.",
            ],
            exercises: [
              {
                question: "'O diretor assinou o contrato' na voz passiva é:",
                options: [
                  "O contrato assinou o diretor.",
                  "O contrato foi assinado pelo diretor.",
                  "Assinou-se o diretor.",
                  "O diretor foi assinado.",
                ],
                answer: 1,
                explanation: "O objeto vira sujeito paciente.",
              },
              {
                question: "Qual conectivo substitui 'porque' sem mudar o sentido?",
                options: ["embora", "visto que", "portanto", "caso"],
                answer: 1,
                explanation: "Ambos indicam causa.",
              },
              {
                question: "Trocar 'porém' por 'portanto' altera a relação para:",
                options: ["oposição", "conclusão", "causa", "condição"],
                answer: 1,
                explanation: "'Portanto' é conclusivo; muda o sentido do período.",
              },
            ],
          },
        ],
      },
    ],
    exam: {
      slug: "simulado-concursos",
      title: "Simulado — Concursos",
      description: "5 questões no estilo CESPE/FGV.",
      questions: [
        {
          question: "Assinale a colocação pronominal correta:",
          options: [
            "Me parece que vai chover.",
            "Não se sabe o resultado.",
            "Nunca disse-me a verdade.",
            "Tudo resolveu-se bem.",
          ],
          answer: 1,
          explanation: "A negação atrai o pronome para antes do verbo.",
        },
        {
          question: "'Aspirava ___ cargo de diretor.'",
          options: ["o", "ao", "no", "do"],
          answer: 1,
          explanation: "Aspirar no sentido de pretender exige 'a'.",
        },
        {
          question: "Assinale a frase correta quanto à crase:",
          options: [
            "Chegou à uma hora.",
            "Fez o trabalho à mão.",
            "Vendas à prazo.",
            "Refiro-me à isso.",
          ],
          answer: 1,
          explanation: "Locução adverbial feminina de instrumento leva crase.",
        },
        {
          question: "'Fazem cinco anos que trabalho aqui.' O erro está em:",
          options: [
            "concordância verbal (fazer impessoal)",
            "regência",
            "crase",
            "não há erro",
          ],
          answer: 0,
          explanation: "'Fazer' indicando tempo é impessoal: faz cinco anos.",
        },
        {
          question: "A substituição de 'embora' por 'porque' produz relação de:",
          options: ["concessão", "causa", "consequência", "condição"],
          answer: 1,
          explanation: "'Porque' introduz causa, alterando o sentido original.",
        },
      ],
    },
  },
];

export function getLevel(slug: string) {
  return levels.find((level) => level.slug === slug);
}

export function getModule(levelSlug: string, moduleSlug: string) {
  const level = getLevel(levelSlug);
  return { level, module: level?.modules.find((m) => m.slug === moduleSlug) };
}

export const totalLessons = levels.reduce(
  (acc, level) => acc + level.modules.reduce((a, m) => a + m.lessons.length, 0),
  0,
);
