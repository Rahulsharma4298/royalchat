const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('sounds/Message-notification.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name = prompt("Enter Your Name to Join(atleast 5 character)");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    if(name!=null){
        append(`${name} joined the chat`, 'right');
    }

});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
    });

socket.on('left', name =>{
    append(`${name.name} left the chat`,'right');
    });
