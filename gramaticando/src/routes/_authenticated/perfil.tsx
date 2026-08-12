import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { levels, totalLessons } from "@/data/curriculum";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useAttempts, useProfile, useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Gramaticando" },
      { name: "description", content: "Edite seus dados e veja suas estatísticas de estudo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useProfile(user?.id);
  const { data: progress = [] } = useProgress(user?.id);
  const { data: attempts = [] } = useAttempts(user?.id);

  const [fullName, setFullName] = useState("");
  const [level, setLevel] = useState("fundamental-2");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setLevel(profile.level ?? "fundamental-2");
    setBio(profile.bio ?? "");
  }, [profile]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    if (fullName.trim().length < 2) {
      toast.error("Informe seu nome completo");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim().slice(0, 100), level, bio: bio.trim().slice(0, 300) })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Não foi possível salvar seu perfil");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Perfil atualizado!");
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const average =
    attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
      : 0;

  return (
    <PublicLayout>
      <section className="surface-hero border-b border-border/50">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-12 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-full surface-primary font-display text-xl font-bold text-primary-foreground">
              {(profile?.full_name || user?.email || "?").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">
                {profile?.full_name || "Meu perfil"}
              </h1>
              <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="secondary" className="rounded-full" onClick={signOut}>
            <LogOut className="size-4" /> Sair
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={save}
          className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
        >
          <h2 className="font-display text-xl font-bold">Dados pessoais</h2>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input
              id="fullName"
              value={fullName}
              maxLength={100}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="level">Nível de estudo</Label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {levels.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Sobre você</Label>
            <Textarea
              id="bio"
              rows={4}
              maxLength={300}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte seu objetivo de estudo"
            />
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="rounded-full surface-primary text-primary-foreground"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Estatísticas</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Aulas concluídas", `${progress.length} de ${totalLessons}`],
                ["Simulados realizados", String(attempts.length)],
                ["Média nos simulados", `${average}%`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="secondary" className="mt-5 w-full rounded-full">
              <Link to="/dashboard">Ir para o painel</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
