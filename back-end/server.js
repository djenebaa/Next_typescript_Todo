const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
require('dotenv').config(); // hide config
let cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // enable cross-origin requests

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});


// Route Post
// date format: YYYY-MM-DD
app.post('/create', (req, res) => {
    const { date, task, state } = req.body;

    db.query('INSERT INTO Todo (task, state) VALUES (?, ?)', [task, state], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error creating record');
        } else {
            console.log(results);
            res.status(200).send('Record created successfully');
        }
    });
});

// Route Get

app.get('/', (req, res) => {
    db.query('SELECT * FROM Todo', (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
            console.log(results);
        }


    })
})

// Route Get By Id

app.get('/:id', (req, res) => {
    let id = req.params.id;
    db.query('SELECT * FROM Todo WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length === 0) {
            res.status(404).send("Record with id " + id + " not found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});


// Route Put

app.put('/update/:id', (req, res) => {
    const newTask = req.body.task;
    const newState = req.body.state;
    const id = req.params.id;
  
    // Update data
    db.query(
      'UPDATE Todo SET task = ?, state = ? WHERE id = ?',
      [newTask, newState, id],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.affectedRows === 0) {
          res.status(404).send(`Record with id ${id} not found`);
        } else {
          // Fetch the updated data from the database
          db.query('SELECT * FROM Todo WHERE id = ?', [id], (err, updatedResults) => {
            if (err) {
              console.log(err);
            }
            if (updatedResults.length === 0) {
              res.status(404).send(`Record with id ${id} not found`);
            } else {
              res.send(updatedResults[0]); // Send the updated data as the response
              console.log(updatedResults[0]);
            }
          });
        }
      }
    );
  });
  


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    // Delete data
    db.query("DELETE FROM Todo WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting record");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Record with id " + id + " not found");
      } else {
        res.send("Record deleted successfully");
      }
    });
  });
  


app.listen(4000, () => { console.log(`Starting server on port 4000`) })