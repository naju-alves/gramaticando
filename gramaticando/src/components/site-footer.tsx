import { Link } from "@tanstack/react-router";
import { BookOpenCheck } from "lucide-react";

import { levels } from "@/data/curriculum";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-2xl surface-primary text-primary-foreground">
              <BookOpenCheck className="size-5" />
            </span>
            <span className="font-display text-xl font-semibold">Gramaticando</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Ensino de gramática da língua portuguesa com trilhas por nível, videoaulas curtas,
            exercícios interativos e simulados com correção automática.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Níveis
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {levels.map((level) => (
              <li key={level.slug}>
                <Link
                  to="/niveis/$nivel"
                  params={{ nivel: level.slug }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {level.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/sobre" className="text-muted-foreground transition-colors hover:text-foreground">
                Sobre o Gramaticando
              </Link>
            </li>
            <li>
              <Link to="/sobre-nos" className="text-muted-foreground transition-colors hover:text-foreground">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-muted-foreground transition-colors hover:text-foreground">
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gramaticando. Aprender de verdade, sem decoreba.
      </div>
    </footer>
  );
}
