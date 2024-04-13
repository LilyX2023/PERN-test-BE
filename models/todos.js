const pool = require('./connection');

// Define schema query
const createTodosTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dueDate DATE,
    status BOOLEAN
  )
`;

// Create todos table
pool.query(createTodosTableQuery)
  .then(res => console.log('Todos table created successfully'))
  .catch(err => console.error('Error creating todos table:', err));

module.exports = pool;