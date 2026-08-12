import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { PublicLayout, PageHero } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Fale com o Gramaticando" },
      {
        name: "description",
        content:
          "Tire dúvidas, envie sugestões de conteúdo ou fale sobre uso do Gramaticando em escolas e cursinhos.",
      },
      { property: "og:title", content: "Contato — Gramaticando" },
      {
        property: "og:description",
        content: "Fale com a equipe do Gramaticando: dúvidas, sugestões e parcerias.",
      },
    ],
  }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("Informe um e-mail válido").max(255),
  message: z.string().trim().min(10, "Escreva ao menos 10 caracteres").max(1000),
});

function Contact() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    event.currentTarget.reset();
    toast.success("Mensagem enviada! Respondemos em até 2 dias úteis.");
  }

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Fale com a gente"
        title="Contato"
        description="Dúvidas sobre conteúdo, sugestões de aula ou uso do Gramaticando na sua escola? Escreva para nós."
      />

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, title: "E-mail", text: "contato@gramaticando.com.br" },
            { icon: MessageCircle, title: "Suporte", text: "Segunda a sexta, das 9h às 18h" },
            { icon: MapPin, title: "Onde estamos", text: "São Paulo — SP, atendimento 100% online" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl surface-sun text-highlight-foreground">
                <item.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" required maxLength={100} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" required maxLength={255} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" rows={6} required maxLength={1000} />
          </div>
          <Button type="submit" className="rounded-full surface-primary text-primary-foreground">
            Enviar mensagem
          </Button>
        </form>
      </section>
    </PublicLayout>
  );
}
