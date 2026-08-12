import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type ProgressRow = {
  id: string;
  lesson_slug: string;
  level_slug: string;
  module_slug: string;
  completed_at: string;
};

export type AttemptRow = {
  id: string;
  quiz_slug: string;
  quiz_title: string;
  level_slug: string;
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string;
};

export function useProgress(userId?: string) {
  return useQuery({
    queryKey: ["lesson_progress", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("*")
        .order("completed_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ProgressRow[];
    },
  });
}

export function useAttempts(userId?: string) {
  return useQuery({
    queryKey: ["quiz_attempts", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as AttemptRow[];
    },
  });
}

export function useCompleteLesson(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      level_slug: string;
      module_slug: string;
      lesson_slug: string;
    }) => {
      if (!userId) throw new Error("Sessão expirada");
      const { error } = await supabase
        .from("lesson_progress")
        .upsert(
          { ...payload, user_id: userId, completed_at: new Date().toISOString() },
          { onConflict: "user_id,lesson_slug" },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson_progress"] });
    },
  });
}

export function useSaveAttempt(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      quiz_slug: string;
      quiz_title: string;
      level_slug: string;
      score: number;
      correct_count: number;
      total_questions: number;
    }) => {
      if (!userId) throw new Error("Sessão expirada");
      const { error } = await supabase.from("quiz_attempts").insert({ ...payload, user_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz_attempts"] });
    },
  });
}

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
