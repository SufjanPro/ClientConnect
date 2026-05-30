const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (do të zëvendësohet me database)
let clients = [
  {
    id: uuidv4(),
    name: 'Test Client 1',
    email: 'client1@example.com',
    phone: '0690000000',
    company: 'Tech Company',
    createdAt: new Date()
  }
];

// Routes

// GET - Merr të gjithë klientët
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

// GET - Merr një klient sipas ID
app.get('/api/clients/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ message: 'Klient nuk u gjet' });
  }
  res.json(client);
});

// POST - Krijo klient të ri
app.post('/api/clients', (req, res) => {
  const { name, email, phone, company } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Emri dhe emaili janë të detyrueshëm' });
  }

  const newClient = {
    id: uuidv4(),
    name,
    email,
    phone: phone || '',
    company: company || '',
    createdAt: new Date()
  };

  clients.push(newClient);
  res.status(201).json(newClient);
});

// PUT - Përditëso klient
app.put('/api/clients/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ message: 'Klient nuk u gjet' });
  }

  const { name, email, phone, company } = req.body;
  if (name) client.name = name;
  if (email) client.email = email;
  if (phone) client.phone = phone;
  if (company) client.company = company;

  res.json(client);
});

// DELETE - Fshi klient
app.delete('/api/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Klient nuk u gjet' });
  }

  const deletedClient = clients.splice(index, 1);
  res.json(deletedClient[0]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend është aktiv' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend është aktiv në http://localhost:${PORT}`);
});
