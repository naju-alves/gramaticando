import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { levels } from "@/data/curriculum";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  modo: z.enum(["login", "cadastro"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — Gramaticando" },
      {
        name: "description",
        content:
          "Acesse sua conta do Gramaticando para salvar o progresso, fazer exercícios e simulados de gramática.",
      },
      { property: "og:title", content: "Entrar ou criar conta — Gramaticando" },
      {
        property: "og:description",
        content: "Login e cadastro na plataforma de gramática Gramaticando.",
      },
    ],
  }),
  component: AuthPage,
});

const credentialsSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido").max(255),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres").max(72),
});

function AuthPage() {
  const { modo } = Route.useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = credentialsSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("Não foi possível entrar. Verifique e-mail e senha.");
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/dashboard" });
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const level = String(form.get("level") ?? "fundamental-1");
    const parsed = credentialsSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!fullName || fullName.length > 100) {
      toast.error("Informe seu nome completo");
      return;
    }
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      ...parsed.data,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName, level },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(
        error.message.includes("already")
          ? "Este e-mail já está cadastrado."
          : "Não foi possível criar a conta.",
      );
      return;
    }
    setEmailSent(true);
    toast.success("Cadastro criado! Confirme seu e-mail para entrar.");
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <PublicLayout>
      <section className="surface-hero">
        <div className="mx-auto flex max-w-md flex-col px-4 py-14 sm:py-20">
          <div className="rounded-4xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <h1 className="font-display text-2xl font-bold">Acesse o Gramaticando</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Salve seu progresso e continue de onde parou.
            </p>

            {emailSent ? (
              <div className="mt-6 rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
                Enviamos um link de confirmação para o seu e-mail. Confirme o cadastro e volte para
                fazer login.
              </div>
            ) : (
              <Tabs defaultValue={modo} className="mt-6">
                <TabsList className="grid w-full grid-cols-2 rounded-full">
                  <TabsTrigger value="login" className="rounded-full">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="cadastro" className="rounded-full">
                    Cadastrar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="mt-5 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="login-email">E-mail</Label>
                      <Input id="login-email" name="email" type="email" required maxLength={255} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="login-password">Senha</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        maxLength={72}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-full surface-primary text-primary-foreground"
                    >
                      Entrar
                    </Button>
                    <Link
                      to="/recuperar-senha"
                      className="text-center text-sm font-semibold text-primary hover:underline"
                    >
                      Esqueci minha senha
                    </Link>
                  </form>
                </TabsContent>

                <TabsContent value="cadastro">
                  <form onSubmit={handleSignUp} className="mt-5 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="signup-name">Nome completo</Label>
                      <Input id="signup-name" name="fullName" required maxLength={100} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-email">E-mail</Label>
                      <Input id="signup-email" name="email" type="email" required maxLength={255} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-level">Nível de ensino</Label>
                      <select
                        id="signup-level"
                        name="level"
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {levels.map((level) => (
                          <option key={level.slug} value={level.slug}>
                            {level.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-password">Senha</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        maxLength={72}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-full surface-primary text-primary-foreground"
                    >
                      Criar conta
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}

            <div className="my-6 flex items-center gap-3 text-xs uppercase text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
            </div>

            <Button variant="outline" className="w-full rounded-full" onClick={handleGoogle}>
              Continuar com o Google
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
