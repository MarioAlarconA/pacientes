const express = require('express');
const cors = require('cors');

const peliculasRoutes = require('./routes/peliculas');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/peliculas', peliculasRoutes);

app.listen(3000, () => {
  console.log('API bien http://localhost:3000');
});

const pool = require('./db');

pool.connect()
  .then(() => console.log('🔥 Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error DB', err));