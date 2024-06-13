// controllers/notes.js

const db = require('../config/DBconnect');

// Function to add a note
const addNote = async (req, res) => {

  const { note,Userid } = req.body;
  const employee_id = Userid;
  const  notes=note;// Hardcoded for now, will be replaced with token logic

  // Get current date and time
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);

  // SQL query to insert a new note
  const sql = 'INSERT INTO notes (Date, Time, note, employee_id) VALUES (?, ?, ?, ?)';
  const values = [currentDate, currentTime, notes, employee_id];

  try {
    // Execute the query
    await db.query(sql, values);
    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update a note
const updateNote =(req, res) => {
  const { id } = req.params;
  const { date, time, note, employee_id } = req.body;
  const sql = 'UPDATE notes SET date = ?, time = ?, note = ?, employee_id = ? WHERE note_id = ?';
  db.query(sql, [date, time, note, employee_id, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};


// Function to delete a note
const deleteNote = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notes WHERE note_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};



const getnote = (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};


module.exports = { addNote, updateNote, deleteNote,getnote };