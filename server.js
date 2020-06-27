const express = require('express');
const path = require('path');
const db = require('./db.js');
const socket = require('socket.io');


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
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message and disconnect events \n');
});