const express = require('express');
const router = express.Router();
const pool = require('../models/todos'); // Import the pool object

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos');
    res.json(todos.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  try {
    const { name, dueDate, status } = req.body;
    const result = await pool.query('INSERT INTO todos (name, dueDate, status) VALUES ($1, $2, $3) RETURNING *', [name, dueDate, status]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a todo by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a todo by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dueDate, status } = req.body;
    const result = await pool.query('UPDATE todos SET name = $1, dueDate = $2, status = $3 WHERE id = $4 RETURNING *', [name, dueDate, status, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;