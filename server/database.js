const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'entrenous.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à SQLite:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    
    // Initialisation des tables
    db.serialize(() => {
      // Table Events (Mise à jour avec les nouveaux champs détaillés)
      // Note: SQLite ALTER TABLE n'est pas très flexible, si on voulait être propre on ferait une migration.
      // Mais vu que c'est un projet naissant, on crée la table avec tous les champs si elle n'existe pas.
      // Pour forcer la création propre on utilise DROP TABLE IF EXISTS pour le dev (À NE PAS FAIRE EN PROD).
      // db.run(`DROP TABLE IF EXISTS events`);
      
      db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT,
        time TEXT,
        type TEXT,
        price TEXT,
        image TEXT,
        day TEXT,
        month TEXT,
        year TEXT,
        endTime TEXT,
        priceNum INTEGER,
        neonClass TEXT,
        description TEXT,
        djs TEXT
      )`);

      // Essayer d'ajouter les colonnes manquantes au cas où la table existait déjà
      const addColumn = (col, type) => {
        db.run(`ALTER TABLE events ADD COLUMN ${col} ${type}`, (err) => {
          // Ignore error if column already exists
        });
      };
      addColumn('day', 'TEXT');
      addColumn('month', 'TEXT');
      addColumn('year', 'TEXT');
      addColumn('endTime', 'TEXT');
      addColumn('priceNum', 'INTEGER');
      addColumn('neonClass', 'TEXT');
      addColumn('description', 'TEXT');
      addColumn('djs', 'TEXT');

      // Table Reservations
      db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        persons INTEGER,
        type TEXT,
        date TEXT,
        time TEXT,
        phone TEXT,
        email TEXT,
        status TEXT DEFAULT 'En attente',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Table Transactions
      db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        method TEXT,
        time TEXT,
        amount TEXT,
        isIncome BOOLEAN,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Table Clients
      db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        visits INTEGER DEFAULT 1,
        total_spent TEXT,
        last_visit DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Table Gallery
      db.run(`CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Table Newsletters
      db.run(`CREATE TABLE IF NOT EXISTS newsletters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Table Tickets
      db.run(`CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        scanned_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Vérifier s'il y a déjà des événements (seed initial)
      db.get('SELECT COUNT(*) as count FROM events', (err, row) => {
        if (!err && row.count === 0) {
          console.log('Création des données de test...');
          const insertEvent = db.prepare('INSERT INTO events (title, date, time, type, price, image, day, month, year, endTime, priceNum, neonClass, description, djs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
          
          insertEvent.run(
            'Soirée d\'Inauguration', '15 Juin 2026', '20:00', 'Gala', 'Gratuit', '/1000397585.png',
            '15', 'JUIN', '2026', '04:00', 0, 'neon-text',
            JSON.stringify(['Une soirée exceptionnelle pour inaugurer notre nouveau bar en plein air. Venez découvrir notre cadre idyllique.']),
            JSON.stringify([])
          );
          
          insertEvent.run(
            'Afro Vibes Night', '22 Juin 2026', '22:00', 'Clubbing', '10 000 FCFA', '/1000397586.png',
            '22', 'JUIN', '2026', '05:00', 10000, 'neon-text-green',
            JSON.stringify(['La meilleure soirée Afro de l\'année.']),
            JSON.stringify([{name: 'DJ Léo', style: 'Afrobeats', image: '/1000397611.png'}])
          );
          
          insertEvent.finalize();
        }
      });
      
      // Seed Newsletters
      db.get('SELECT COUNT(*) as count FROM newsletters', (err, row) => {
        if (!err && row.count === 0) {
          const insertNews = db.prepare('INSERT INTO newsletters (email) VALUES (?)');
          insertNews.run('contact@client.com');
          insertNews.run('fan.clubbing@gmail.com');
          insertNews.finalize();
        }
      });
    });
  }
});

module.exports = db;
