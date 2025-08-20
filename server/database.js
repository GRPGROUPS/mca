// Database configuration and connection
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open database
const db = new sqlite3.Database(path.join(__dirname, 'money_manager.db'));

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Transactions table
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      category TEXT,
      note TEXT,
      date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`);

    console.log('Database initialized successfully');
  });
}

// Close database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
  });
}

module.exports = { db, initializeDatabase, closeDatabase };
