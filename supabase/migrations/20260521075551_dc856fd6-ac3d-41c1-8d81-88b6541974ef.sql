ALTER TABLE public.mushrooms
  ADD COLUMN IF NOT EXISTS traits jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.mushrooms.traits IS
  'Strukturierte Anatomie-Merkmale für KI-Bestimmung. Schema: { capSurface?: slimy|dry|velvety|scaly, hymeniumType?: gills|tubes|ridges|spines, sporePrintColor?: text }';