CREATE TABLE public.ai_adviser_access_state (
  id text PRIMARY KEY,
  status integer NOT NULL,
  message text NOT NULL,
  blocked_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_adviser_access_state TO service_role;
REVOKE ALL ON public.ai_adviser_access_state FROM anon, authenticated;
ALTER TABLE public.ai_adviser_access_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ai_adviser_access_state IS 'Server-only durable AI Gateway access blocks. Stores no visitor descriptions or recommendation history. An owner clears a block only after service access is restored.';