import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Definir nova senha — Gramaticando" },
      {
        name: "description",
        content: "Crie uma nova senha de acesso para sua conta do Gramaticando.",
      },
      { property: "og:title", content: "Definir nova senha — Gramaticando" },
      {
        property: "og:description",
        content: "Escolha uma nova senha e volte a estudar gramática no Gramaticando.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password.length < 6) {
      toast.error("A senha precisa ter ao menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não coincidem");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Link expirado ou inválido. Solicite um novo e-mail.");
      return;
    }
    toast.success("Senha atualizada!");
    navigate({ to: "/dashboard" });
  }

  return (
    <PublicLayout>
      <section className="surface-hero">
        <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
          <div className="rounded-4xl border border-border bg-card p-8 shadow-lift">
            <h1 className="font-display text-2xl font-bold">Nova senha</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Escolha uma senha com pelo menos 6 caracteres.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input id="password" name="password" type="password" required maxLength={72} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input id="confirm" name="confirm" type="password" required maxLength={72} />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-full surface-primary text-primary-foreground"
              >
                Salvar senha
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
