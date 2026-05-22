CREATE TABLE public.mushrooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_de TEXT NOT NULL,
  name_lat TEXT NOT NULL,
  type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  season TEXT NOT NULL,
  habitat TEXT NOT NULL,
  merkmale TEXT[] NOT NULL DEFAULT '{}',
  verwechslung TEXT NOT NULL,
  fun_fact TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.mushrooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mushrooms are publicly readable"
  ON public.mushrooms
  FOR SELECT
  USING (true);