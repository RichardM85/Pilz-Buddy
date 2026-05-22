
ALTER TABLE public.mushrooms
  ADD COLUMN IF NOT EXISTS sporenfarbe TEXT NOT NULL DEFAULT 'Unbekannt',
  ADD COLUMN IF NOT EXISTS mikroskopie TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS sicherheitsstufe TEXT NOT NULL DEFAULT 'Mit Sorgfalt essbar',
  ADD COLUMN IF NOT EXISTS quellen TEXT NOT NULL DEFAULT 'DGfM · Roth/Frank/Kormann: Giftpilze – Pilzgifte';
