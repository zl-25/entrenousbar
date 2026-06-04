-- ============================================
-- SCRIPT SQL POUR SUPABASE - ENTRE NOUS BAR
-- À copier-coller dans l'éditeur SQL de Supabase
-- (Supabase > SQL Editor > New Query > Coller > Run)
-- ============================================

-- Table des événements
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Soirée',
  day TEXT,
  month TEXT,
  year TEXT,
  date TEXT,
  time TEXT DEFAULT '22:00',
  "endTime" TEXT DEFAULT '05:00',
  price TEXT DEFAULT 'Gratuit',
  image TEXT,
  "cardImage" TEXT,
  description TEXT DEFAULT '[]',
  artists TEXT DEFAULT '[]',
  "neonClass" TEXT DEFAULT 'neon-green',
  tickets TEXT DEFAULT '[]',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  persons INTEGER DEFAULT 1,
  date TEXT,
  time TEXT,
  type TEXT DEFAULT 'Standard',
  status TEXT DEFAULT 'En attente',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des newsletters
CREATE TABLE IF NOT EXISTS newsletters (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des tickets
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  event_id INTEGER,
  event_title TEXT,
  ticket_type TEXT,
  ticket_name TEXT,
  price TEXT,
  buyer_name TEXT,
  buyer_email TEXT,
  buyer_phone TEXT,
  qr_data TEXT,
  status TEXT DEFAULT 'valid',
  scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des membres (équipe admin)
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'editor',
  initials TEXT,
  "lastLogin" TEXT DEFAULT 'Jamais',
  status TEXT DEFAULT 'Actif',
  "accessCode" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVER ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policies : permettre l'accès public en lecture et écriture via la clé anon
-- (Pour un vrai projet de production, tu voudras des politiques plus strictes)

CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update events" ON events FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete events" ON events FOR DELETE USING (true);

CREATE POLICY "Allow public read reservations" ON reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update reservations" ON reservations FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete reservations" ON reservations FOR DELETE USING (true);

CREATE POLICY "Allow public read newsletters" ON newsletters FOR SELECT USING (true);
CREATE POLICY "Allow public insert newsletters" ON newsletters FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete newsletters" ON newsletters FOR DELETE USING (true);

CREATE POLICY "Allow public read tickets" ON tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert tickets" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update tickets" ON tickets FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read members" ON members FOR SELECT USING (true);
CREATE POLICY "Allow public insert members" ON members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update members" ON members FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete members" ON members FOR DELETE USING (true);

-- ============================================
-- CRÉER LE BUCKET STORAGE POUR LES IMAGES
-- ============================================

INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);

-- Policy pour permettre l'upload d'images
CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-images');
CREATE POLICY "Allow public read images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
