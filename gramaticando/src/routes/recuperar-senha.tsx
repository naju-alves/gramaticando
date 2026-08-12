import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Gramaticando" },
      {
        name: "description",
        content: "Receba um link por e-mail para redefinir a senha da sua conta no Gramaticando.",
      },
      { property: "og:title", content: "Recuperar senha — Gramaticando" },
      {
        property: "og:description",
        content: "Redefina a senha da sua conta do Gramaticando em poucos passos.",
      },
    ],
  }),
  component: RecoverPage,
});

function RecoverPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    const parsed = z.string().email().max(255).safeParse(email);
    if (!parsed.success) {
      toast.error("Informe um e-mail válido");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar o e-mail agora.");
      return;
    }
    setSent(true);
  }

  return (
    <PublicLayout>
      <section className="surface-hero">
        <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
          <div className="rounded-4xl border border-border bg-card p-8 shadow-lift">
            <h1 className="font-display text-2xl font-bold">Recuperar senha</h1>
            {sent ? (
              <p className="mt-4 rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
                Se este e-mail estiver cadastrado, enviamos um link para redefinir a senha. Verifique
                também a caixa de spam.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Informe seu e-mail e enviaremos um link para criar uma nova senha.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" required maxLength={255} />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-full surface-primary text-primary-foreground"
                  >
                    Enviar link
                  </Button>
                </form>
              </>
            )}
            <Link
              to="/auth"
              className="mt-6 block text-center text-sm font-semibold text-primary hover:underline"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
