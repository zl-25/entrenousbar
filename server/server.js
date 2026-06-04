const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir les images uploadées statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Redirection pour éviter le "Cannot GET /" sur le port 3000
app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage });

// =======================
// UPLOAD API
// =======================
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// =======================
// EVENTS API
// =======================
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse JSON fields
    const formatted = rows.map(r => ({
      ...r,
      description: r.description ? JSON.parse(r.description) : [],
      djs: r.djs ? JSON.parse(r.djs) : []
    }));
    res.json(formatted);
  });
});

app.post('/api/events', (req, res) => {
  const { title, date, time, type, price, image, day, month, year, endTime, priceNum, neonClass, description, djs } = req.body;
  const descJson = JSON.stringify(description || []);
  const djsJson = JSON.stringify(djs || []);

  db.run(`INSERT INTO events (title, date, time, type, price, image, day, month, year, endTime, priceNum, neonClass, description, djs) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [title, date, time, type, price, image, day, month, year, endTime, priceNum, neonClass, descJson, djsJson], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, ...req.body });
  });
});

app.delete('/api/events/:id', (req, res) => {
  db.run('DELETE FROM events WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// RESERVATIONS API
// =======================
app.get('/api/reservations', (req, res) => {
  db.all('SELECT * FROM reservations ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/reservations', (req, res) => {
  const { name, persons, type, date, time, phone, email } = req.body;
  db.run('INSERT INTO reservations (name, persons, type, date, time, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [name, persons, type, date, time, phone, email], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, status: 'En attente' });
  });
});

app.put('/api/reservations/:id/status', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE reservations SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes, status });
  });
});

// =======================
// TRANSACTIONS API
// =======================
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// =======================
// GALLERY API
// =======================
app.get('/api/gallery', (req, res) => {
  db.all('SELECT * FROM gallery ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/gallery', (req, res) => {
  const { url } = req.body;
  db.run('INSERT INTO gallery (url) VALUES (?)', [url], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, url });
  });
});

app.delete('/api/gallery/:id', (req, res) => {
  db.run('DELETE FROM gallery WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// NEWSLETTERS API
// =======================
app.get('/api/newsletters', (req, res) => {
  db.all('SELECT * FROM newsletters ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/newsletters', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });
  db.run('INSERT INTO newsletters (email) VALUES (?)', [email], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, email });
  });
});

// =======================
// TICKETS API
// =======================
// Create a ticket after purchase
app.post('/api/tickets', (req, res) => {
  const { reference, event_id, event_title, ticket_type, ticket_name, price, buyer_name, buyer_email, buyer_phone, qr_data } = req.body;
  if (!reference) return res.status(400).json({ error: 'Référence requise' });
  db.run(`INSERT INTO tickets (reference, event_id, event_title, ticket_type, ticket_name, price, buyer_name, buyer_email, buyer_phone, qr_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [reference, event_id, event_title, ticket_type, ticket_name, price, buyer_name, buyer_email, buyer_phone, qr_data],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, reference, status: 'valid' });
    });
});

// Verify/scan a ticket
app.get('/api/tickets/verify/:code', (req, res) => {
  const code = req.params.code;
  db.get('SELECT * FROM tickets WHERE reference = ?', [code], (err, ticket) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!ticket) {
      return res.json({ valid: false, error: 'Ticket introuvable dans la base de données' });
    }
    if (ticket.status === 'used') {
      return res.json({ valid: false, alreadyUsed: true, error: 'Ce ticket a déjà été scanné et utilisé', scanned_at: ticket.scanned_at, ticket });
    }
    // Mark as used
    db.run('UPDATE tickets SET status = ?, scanned_at = ? WHERE id = ?', ['used', new Date().toISOString(), ticket.id], function(updateErr) {
      if (updateErr) return res.status(500).json({ error: updateErr.message });
      res.json({ valid: true, ticket: { ...ticket, status: 'used' } });
    });
  });
});

// List all tickets
app.get('/api/tickets', (req, res) => {
  db.all('SELECT * FROM tickets ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Serveur Backend démarré sur http://localhost:${PORT}`);
});
