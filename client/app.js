///CONST  

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');


///SOCKET

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))

///GLOBAL VARIABLES

let userName;
//console.log('user name is: ',userName);
//console.log ('loginForm is:', loginForm )


/// LOGIN

function login(event){
    event.preventDefault();
    if (userNameInput.value === '' || userNameInput.value === undefined ){
        alert('no username')
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}


function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }

}



function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }



/// LISTENERS

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);