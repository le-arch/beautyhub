-- Create favorites table to join users and salons
CREATE TABLE favorites (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    salon_id INT REFERENCES salons(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, salon_id)
);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for favorites
CREATE POLICY "Users can manage their own favorites"
ON favorites
FOR ALL
USING (auth.uid() = user_id);

-- Optional: Allow reading if the profile is public, adjust as needed.
CREATE POLICY "Allow read access to all"
ON favorites
FOR SELECT
USING (true);
