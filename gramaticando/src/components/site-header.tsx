import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpenCheck, LogOut, Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home", params: {} },
  { to: "/niveis/$nivel", label: "Níveis", params: { nivel: "fundamental-1" } },
  { to: "/blog", label: "Blog", params: {} },
  { to: "/sobre", label: "O Gramaticando", params: {} },
  { to: "/sobre-nos", label: "Sobre Nós", params: {} },
  { to: "/contato", label: "Contato", params: {} },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-2xl surface-primary text-primary-foreground shadow-soft">
            <BookOpenCheck className="size-5" />
          </span>
          <span className="truncate font-display text-xl font-semibold">Gramaticando</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              params={link.params as never}

              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === link.to && "bg-muted text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Button asChild variant="secondary" className="rounded-full">
                <Link to="/perfil">
                  <UserRound className="size-4" /> Meu Perfil
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut} aria-label="Sair">
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild className="rounded-full surface-primary text-primary-foreground shadow-soft">
                <Link to="/auth" search={{ modo: "cadastro" }}>
                  Criar conta
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-xs">
              <SheetTitle className="px-1 font-display text-lg">Gramaticando</SheetTitle>
              <div className="mt-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    params={link.params as never}

                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                  {user ? (
                    <>
                      <Button asChild variant="secondary" className="rounded-full">
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                          Painel
                        </Link>
                      </Button>
                      <Button asChild variant="secondary" className="rounded-full">
                        <Link to="/perfil" onClick={() => setOpen(false)}>
                          Meu Perfil
                        </Link>
                      </Button>
                      <Button variant="ghost" className="rounded-full" onClick={handleSignOut}>
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="rounded-full">
                        <Link to="/auth" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="rounded-full surface-primary text-primary-foreground"
                      >
                        <Link
                          to="/auth"
                          search={{ modo: "cadastro" }}
                          onClick={() => setOpen(false)}
                        >
                          Criar conta
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
