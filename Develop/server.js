const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const notesData = require('./db/db.json');



const app = express();
const PORT = 3001;

// middleware

app.use(express.static('public'));



// route for home page

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// reference from GW Mini project Module 11- wildcard route
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);


//code provided by GW - should appear after installing npm and running node server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  db = JSON.parse(db);
  res.json(db);

  // creating body for note
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(db);

});


// GET Route for retrieving ALL the notes derived from Activity 28
app.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Create notes ( worked with Myles Smith, MaSandra and Joseph Sell in breakout)
app.get('/api/notes', (req, res) => {
  fs.readFromFile('/public/db/db.json').then((data)=> {
    res.json(JSON.parse(data)) ;
  });



// post the notes to the db file as json data ( worked with Myles Smith, MaSandra and Joseph Sell in breakout)
app.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('/public/db/db.json');
  db = JSON.parse(db);
  res.json(db);


  // creating the new note as an object and giving it a unique id.
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(db);
})
});