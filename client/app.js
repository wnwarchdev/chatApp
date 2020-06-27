///CONST  

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');


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



/// LISTENERS

loginForm.addEventListener('submit', login);