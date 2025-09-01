
CREATE TABLE public.user_settings (
  user_id uuid NOT NULL,
  theme text NOT NULL DEFAULT 'light'::text,
  language text NOT NULL DEFAULT 'en'::text,
  currency text NOT NULL DEFAULT 'NGN'::text,
  notifications jsonb NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NULL,
  CONSTRAINT user_settings_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;
