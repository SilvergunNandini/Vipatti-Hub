-- Seed data for the emergency response platform

-- Insert sample users
INSERT INTO users (email, name, location, skills)
VALUES
  ('john.doe@example.com', 'John Doe', 'Downtown', ARRAY['First Aid', 'Driving', 'Construction']),
  ('jane.smith@example.com', 'Jane Smith', 'Westside', ARRAY['Medical', 'Cooking', 'Organization']),
  ('mike.johnson@example.com', 'Mike Johnson', 'Northside', ARRAY['Engineering', 'Heavy Lifting', 'Communication']),
  ('sarah.williams@example.com', 'Sarah Williams', 'Eastside', ARRAY['First Aid', 'Childcare', 'Cooking']),
  ('david.brown@example.com', 'David Brown', 'Southside', ARRAY['Construction', 'Driving', 'Security'])
ON CONFLICT (email) DO NOTHING;

-- Insert sample emergencies
INSERT INTO emergencies (title, description, type, location, severity, status)
VALUES
  ('Wildfire', 'Active wildfire spreading in the northern hills', 'Natural Disaster', 'North County', 'critical', 'active'),
  ('Flash Flood Warning', 'Heavy rainfall causing flash flooding in low-lying areas', 'Natural Disaster', 'Downtown & River District', 'warning', 'active'),
  ('Major Road Closure', 'Highway 101 closed due to accident', 'Infrastructure', 'Highway 101, Mile Marker 45', 'caution', 'active'),
  ('Power Outage', 'Widespread power outage affecting East District', 'Infrastructure', 'East District', 'caution', 'active'),
  ('Medical Emergency Response', 'Multiple ambulances dispatched to Central Park area', 'Medical', 'Central Park', 'warning', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample resources
INSERT INTO resources (name, description, type, location, available, quantity, contact_info, urgent)
VALUES
  ('Bottled Water (24 pack)', 'Cases of bottled water available for distribution', 'Water', 'Downtown', true, 10, 'Contact John at 555-1234', false),
  ('First Aid Supplies', 'Basic first aid kits and medical supplies', 'Medical', 'Westside', true, 5, 'Contact Sarah at 555-2345', false),
  ('Canned Food (Assorted)', 'Various canned goods and non-perishable items', 'Food', 'Northside', true, 20, 'Contact Michael at 555-3456', false),
  ('Portable Generator', 'Small generator available for emergency power', 'Power', 'Eastside', true, 1, 'Contact Robert at 555-4567', false),
  ('Temporary Shelter (3 spots)', 'Safe space available for those displaced', 'Shelter', 'Southside', true, 3, 'Contact Lisa at 555-5678', false),
  ('Insulin Medication', 'Urgently needed for diabetic patient', 'Medical', 'Downtown', false, 1, 'Contact David at 555-6789', true),
  ('Drinking Water', 'Clean drinking water needed for family of 4', 'Water', 'Westside', false, 5, 'Contact Maria at 555-7890', false),
  ('Batteries (AA/AAA)', 'Batteries needed for flashlights and radios', 'Power', 'Northside', false, 10, 'Contact Thomas at 555-8901', false),
  ('Non-perishable Food', 'Food supplies needed for elderly couple', 'Food', 'Eastside', false, 7, 'Contact Anna at 555-9012', false)
ON CONFLICT DO NOTHING;

-- Insert sample discussions
INSERT INTO discussions (title, content, category, urgent)
VALUES
  ('Water distribution points in Downtown area', 'Does anyone know where the official water distribution centers are located downtown?', 'Resources', false),
  ('Volunteer needed for elderly assistance', 'Looking for volunteers to help check on elderly residents in the Westside neighborhood', 'Help Needed', true),
  ('Road closure updates for Highway 101', 'Latest information on Highway 101 closure and alternative routes', 'Updates', false),
  ('Community kitchen initiative at Central Park', 'We are organizing a community kitchen at Central Park. Looking for volunteers and donations.', 'Initiative', false)
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, event_date, location, featured)
VALUES
  ('Emergency Preparedness Workshop', 'Learn essential skills for emergency preparedness', '2025-06-15 10:00:00', 'Community Center', false),
  ('First Aid Training', 'Basic first aid training provided by Red Cross volunteers', '2025-06-18 14:00:00', 'Medical Center', false),
  ('Community Resource Distribution', 'Distribution of essential supplies to affected communities', '2025-06-20 09:00:00', 'Central Park', true)
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, category, progress, featured)
VALUES
  ('Community Garden Initiative', 'Creating sustainable food sources through community gardens in each neighborhood', 'Sustainability', 65, false),
  ('Emergency Communication Network', 'Building a resilient communication system that works during infrastructure failures', 'Infrastructure', 40, true),
  ('Neighborhood Watch Program', 'Organizing community members to maintain security and safety during emergencies', 'Safety', 80, false),
  ('Alternative Transportation Routes', 'Mapping and maintaining alternative routes for when main roads are blocked', 'Transportation', 25, false)
ON CONFLICT DO NOTHING;
