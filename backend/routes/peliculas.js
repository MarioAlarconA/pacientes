const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM peliculas');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { titulo, descripcion, anio, genero } = req.body;

  await pool.query(
    'INSERT INTO peliculas (titulo, descripcion, anio, genero) VALUES ($1,$2,$3,$4)',
    [titulo, descripcion, anio, genero]
  );

  res.json({ mensaje: 'pelicula creada' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    'DELETE FROM peliculas WHERE id=$1',
    [id]
  );

  res.json({ mensaje: 'pelicula eliminada' });
});

module.exports = router;