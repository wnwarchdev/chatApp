const express = require('express');
const path = require('path');
const db = require('./db.js');


const app = express();


const messages = db.messages;
//console.log(messages)

//show app
app.use(express.static(path.join(__dirname, '/client')));


//error
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

//run on 8000
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });