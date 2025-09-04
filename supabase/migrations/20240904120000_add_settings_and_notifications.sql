
CREATE TABLE public.user_settings (
  user_id uuid NOT NULL,
  theme text NOT NULL DEFAULT 'light'::text,
  language text NOT NULL DEFAULT 'en'::text,
  currency text NOT NULL DEFAULT 'NGN'::text,
  notifications jsonb NULL DEFAULT '{"booking_updates": true, "new_messages": true, "promotions": false}',
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT user_settings_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Example Notification Insert
INSERT INTO public.notifications (user_id, title, description, type)
SELECT id, 'Welcome to BeautyHub!', 'We are excited to have you. Start by exploring salons near you.', 'welcome' FROM auth.users;

-- Example User Settings Insert
INSERT INTO public.user_settings (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
