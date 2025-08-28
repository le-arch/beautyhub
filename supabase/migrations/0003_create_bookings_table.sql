-- Create bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    salon_id INT REFERENCES salons(id) ON DELETE CASCADE NOT NULL,
    booking_time TIMESTAMPTZ NOT NULL,
    service_name TEXT NOT NULL,
    status TEXT CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled')) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
ON bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
ON bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON bookings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Salon owners can view bookings for their salon"
ON bookings
FOR SELECT
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'owner' AND
  salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
);

CREATE POLICY "Salon owners can update bookings for their salon"
ON bookings
FOR UPDATE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'owner' AND
  salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
);
