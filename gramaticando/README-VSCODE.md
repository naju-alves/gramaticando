# Gramaticando — como rodar no Visual Studio Code

Plataforma de ensino de gramática da língua portuguesa (TanStack Start + React 19 + Vite 7 + Tailwind v4 + Supabase/Lovable Cloud).

## Requisitos
- Node.js 20+ (ou Bun 1.1+)
- VS Code

## Passos
1. Descompacte o arquivo e abra a pasta `gramaticando` no VS Code (`File > Open Folder`).
2. Instale as dependências:
   ```bash
   npm install     # ou: bun install
   ```
3. Confira o arquivo `.env` (já incluído, com chaves públicas). Se preferir, copie de `.env.example`.
4. Rode em desenvolvimento:
   ```bash
   npm run dev     # http://localhost:8080
   ```
5. Build de produção:
   ```bash
   npm run build && npm run preview
   ```

## Scripts
- `dev` — servidor de desenvolvimento
- `build` — build de produção
- `preview` — pré-visualiza o build
- `lint` — ESLint
- `format` — Prettier

## Estrutura
```
gramaticando/
├─ .vscode/            # configurações e extensões recomendadas
├─ public/             # arquivos estáticos (favicon, robots.txt)
├─ src/
│  ├─ assets/          # imagens
│  ├─ components/      # componentes e UI (shadcn)
│  ├─ data/            # currículo (níveis, módulos, aulas, exercícios)
│  ├─ hooks/           # hooks de progresso, perfil, etc.
│  ├─ integrations/    # cliente do backend (Supabase)
│  ├─ lib/             # utilitários
│  ├─ routes/          # páginas (rotas de arquivo do TanStack Router)
│  ├─ styles.css       # design system (cores pastel, temas claro/escuro)
│  └─ router.tsx       # configuração do roteador
├─ supabase/           # migrações do banco de dados
├─ package.json
└─ vite.config.ts
```

> Observação: a pasta `node_modules` não vai no zip — ela é recriada com `npm install`.
