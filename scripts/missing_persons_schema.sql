-- Add missing persons and items tables

CREATE TABLE IF NOT EXISTS missing_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  description TEXT NOT NULL,
  last_seen_location TEXT NOT NULL,
  last_seen_time TIMESTAMP WITH TIME ZONE NOT NULL,
  contact_info TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'missing' CHECK (status IN ('missing', 'found')),
  urgent BOOLEAN DEFAULT false,
  reported_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS missing_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  last_seen_location TEXT NOT NULL,
  last_seen_time TIMESTAMP WITH TIME ZONE NOT NULL,
  contact_info TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'missing' CHECK (status IN ('missing', 'found')),
  urgent BOOLEAN DEFAULT false,
  reported_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Government assistance tracking table
CREATE TABLE IF NOT EXISTS government_assistance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_name TEXT NOT NULL,
  assistance_type TEXT NOT NULL CHECK (assistance_type IN ('army', 'airforce', 'navy', 'medical', 'supplies')),
  mission_description TEXT NOT NULL,
  location TEXT NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_duration INTERVAL,
  capacity TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'en-route', 'arrived', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  resources TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_missing_persons_status ON missing_persons(status);
CREATE INDEX IF NOT EXISTS idx_missing_persons_urgent ON missing_persons(urgent);
CREATE INDEX IF NOT EXISTS idx_missing_items_status ON missing_items(status);
CREATE INDEX IF NOT EXISTS idx_missing_items_urgent ON missing_items(urgent);
CREATE INDEX IF NOT EXISTS idx_government_assistance_status ON government_assistance(status);
CREATE INDEX IF NOT EXISTS idx_government_assistance_type ON government_assistance(assistance_type);
