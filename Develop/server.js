const express = require('express');
const path = require('path');


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

