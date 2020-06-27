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
  socket.on('join', (userName) => { 
    console.log('New client! Its id – ' + socket.id);
    db.users.push({author: userName, id: socket.id});
    socket.broadcast.emit('message', {author: 'ChatBot', content: userName + ` has joined to the conversation!`});
    //console.log('users: ', db.users);
    //const users = db.users;
    //console.log('the users in db:',users)
});
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left')
    const users = db.users;
    //console.log('the users in db:',users)
    const leaver = db.users.find(user => user.id === socket.id).author;
    console.log('the leaver is: ', leaver)
    const leaverIndex = db.users.findIndex(user => user.id === socket.id);
    //console.log('leaver index is: ',leaverIndex)
    db.users.splice(leaverIndex, 1);
    socket.broadcast.emit('message', {author: 'ChatBot', content: leaver + ` has left the building!`});
    //const restusers = db.users;
    //console.log('the rest of users in db:', restusers)
  
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});


