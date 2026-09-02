CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT 'fundamental-1',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level_slug TEXT NOT NULL,
  module_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lesson_progress_own" ON public.lesson_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level_slug TEXT NOT NULL,
  quiz_slug TEXT NOT NULL,
  quiz_title TEXT NOT NULL DEFAULT '',
  score NUMERIC(5,2) NOT NULL DEFAULT 0,
  correct_count INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quiz_attempts_own" ON public.quiz_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'level', 'fundamental-1')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- GRAMATICANDO
-- Melhoria do banco de dados - Supabase / PostgreSQL
-- ============================================================

-- ============================================================
-- 1. MÓDULOS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    level_slug TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT modules_level_slug_slug_key
        UNIQUE (level_slug, slug)
);

-- ============================================================
-- 2. AULAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    level_slug TEXT NOT NULL,
    module_slug TEXT NOT NULL,
    slug TEXT NOT NULL,

    title TEXT NOT NULL,
    duration TEXT NOT NULL DEFAULT '',
    video_id TEXT,

    explanation TEXT NOT NULL DEFAULT '',

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT lessons_level_module_slug_key
        UNIQUE (level_slug, module_slug, slug)
);

-- ============================================================
-- 3. EXEMPLOS DAS AULAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lesson_examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lesson_id UUID NOT NULL
        REFERENCES public.lessons(id)
        ON DELETE CASCADE,

    content TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. RESUMOS DAS AULAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lesson_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lesson_id UUID NOT NULL
        REFERENCES public.lessons(id)
        ON DELETE CASCADE,

    content TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. QUESTÕES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lesson_id UUID
        REFERENCES public.lessons(id)
        ON DELETE CASCADE,

    quiz_slug TEXT,

    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL DEFAULT '',

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT questions_lesson_or_quiz_check
        CHECK (
            lesson_id IS NOT NULL
            OR quiz_slug IS NOT NULL
        )
);

-- ============================================================
-- 6. ALTERNATIVAS DAS QUESTÕES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id UUID NOT NULL
        REFERENCES public.questions(id)
        ON DELETE CASCADE,

    option_text TEXT NOT NULL,

    is_correct BOOLEAN NOT NULL DEFAULT false,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 7. RESPOSTAS DOS ALUNOS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    attempt_id UUID NOT NULL
        REFERENCES public.quiz_attempts(id)
        ON DELETE CASCADE,

    question_id UUID NOT NULL
        REFERENCES public.questions(id)
        ON DELETE CASCADE,

    selected_option_id UUID
        REFERENCES public.question_options(id)
        ON DELETE SET NULL,

    is_correct BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT quiz_answers_attempt_question_key
        UNIQUE (attempt_id, question_id)
);

-- ============================================================
-- 8. MELHORAR PROGRESSO DAS AULAS
-- ============================================================

-- Remove a restrição antiga, caso exista.
ALTER TABLE public.lesson_progress
DROP CONSTRAINT IF EXISTS lesson_progress_user_id_lesson_slug_key;

-- Cria uma restrição mais correta.
-- Agora a mesma aula pode existir em módulos/níveis diferentes
-- sem causar conflito no progresso do usuário.

ALTER TABLE public.lesson_progress
ADD CONSTRAINT lesson_progress_unique_lesson
UNIQUE (
    user_id,
    level_slug,
    module_slug,
    lesson_slug
);

-- ============================================================
-- 9. ÍNDICES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_modules_level
ON public.modules(level_slug);

CREATE INDEX IF NOT EXISTS idx_modules_order
ON public.modules(level_slug, display_order);

CREATE INDEX IF NOT EXISTS idx_lessons_level_module
ON public.lessons(level_slug, module_slug);

CREATE INDEX IF NOT EXISTS idx_lessons_order
ON public.lessons(
    level_slug,
    module_slug,
    display_order
);

CREATE INDEX IF NOT EXISTS idx_examples_lesson
ON public.lesson_examples(lesson_id);

CREATE INDEX IF NOT EXISTS idx_summaries_lesson
ON public.lesson_summaries(lesson_id);

CREATE INDEX IF NOT EXISTS idx_questions_lesson
ON public.questions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_questions_quiz
ON public.questions(quiz_slug);

CREATE INDEX IF NOT EXISTS idx_question_options_question
ON public.question_options(question_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user
ON public.lesson_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user
ON public.quiz_attempts(user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_attempt
ON public.quiz_answers(attempt_id);

-- ============================================================
-- 10. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 11. PERMISSÕES PARA CONTEÚDO EDUCACIONAL
-- ============================================================

GRANT SELECT ON public.modules
TO authenticated;

GRANT SELECT ON public.lessons
TO authenticated;

GRANT SELECT ON public.lesson_examples
TO authenticated;

GRANT SELECT ON public.lesson_summaries
TO authenticated;

GRANT SELECT ON public.questions
TO authenticated;

GRANT SELECT ON public.question_options
TO authenticated;

-- ============================================================
-- 12. POLÍTICAS DE LEITURA
-- ============================================================

DROP POLICY IF EXISTS "modules_select_authenticated"
ON public.modules;

CREATE POLICY "modules_select_authenticated"
ON public.modules
FOR SELECT
TO authenticated
USING (true);


DROP POLICY IF EXISTS "lessons_select_authenticated"
ON public.lessons;

CREATE POLICY "lessons_select_authenticated"
ON public.lessons
FOR SELECT
TO authenticated
USING (true);


DROP POLICY IF EXISTS "lesson_examples_select_authenticated"
ON public.lesson_examples;

CREATE POLICY "lesson_examples_select_authenticated"
ON public.lesson_examples
FOR SELECT
TO authenticated
USING (true);


DROP POLICY IF EXISTS "lesson_summaries_select_authenticated"
ON public.lesson_summaries;

CREATE POLICY "lesson_summaries_select_authenticated"
ON public.lesson_summaries
FOR SELECT
TO authenticated
USING (true);


DROP POLICY IF EXISTS "questions_select_authenticated"
ON public.questions;

CREATE POLICY "questions_select_authenticated"
ON public.questions
FOR SELECT
TO authenticated
USING (true);


DROP POLICY IF EXISTS "question_options_select_authenticated"
ON public.question_options;

CREATE POLICY "question_options_select_authenticated"
ON public.question_options
FOR SELECT
TO authenticated
USING (true);

-- ============================================================
-- 13. POLÍTICA DAS RESPOSTAS
-- ============================================================

DROP POLICY IF EXISTS "quiz_answers_select_own"
ON public.quiz_answers;

CREATE POLICY "quiz_answers_select_own"
ON public.quiz_answers
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.quiz_attempts qa
        WHERE qa.id = quiz_answers.attempt_id
        AND qa.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "quiz_answers_insert_own"
ON public.quiz_answers;

CREATE POLICY "quiz_answers_insert_own"
ON public.quiz_answers
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.quiz_attempts qa
        WHERE qa.id = quiz_answers.attempt_id
        AND qa.user_id = auth.uid()
    )
);

-- ============================================================
-- 14. TRIGGER PARA updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS modules_updated_at
ON public.modules;

CREATE TRIGGER modules_updated_at
BEFORE UPDATE ON public.modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();


DROP TRIGGER IF EXISTS lessons_updated_at
ON public.lessons;

CREATE TRIGGER lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 15. PERMISSÃO DO TRIGGER
-- ============================================================

REVOKE EXECUTE
ON FUNCTION public.update_updated_at_column()
FROM PUBLIC;

-- ============================================================
-- FIM DA MIGRATION
-- ============================================================
