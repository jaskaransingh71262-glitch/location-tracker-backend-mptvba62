const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
let locations = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/locations', (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  const location = { id: nextId++, latitude, longitude };
  locations.push(location);
  res.json(location);
});

app.get('/api/locations', (req, res) => {
  res.json({ locations });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});