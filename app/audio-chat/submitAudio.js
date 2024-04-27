import { io } from "socket.io-client";
const socket = io('ws://34.195.113.89/socket.io');


var content = {
    ID:'sample2',
    username: 'mike',
    gender:'f',
    lang:'en-us',
    is_cloned:'no',
    // video:'no'
  }
async function load_chat(){    
    socket.on('connect', () => {
        console.log('Successfully connected to the Socket.IO server!');
    });
    console.log('loading');
    console.log(content);
    socket.emit('load',content);
    socket.on('load',(response) =>{
        console.log(response)

    });
  }

function sst(){
    const formData = new FormData();
    formData.append("ID","sample");
    // navigator.mediaDevices.getUserMedia({audio : true})
}
function handleInput(userMessage){
    const recordButton = document.querySelector(".recordButton");
    const stopButton = document.querySelector(".stopButton");
    const messageBox = document.querySelector(".message-area");
    const newMessage = document.createElement('div');
    newMessage.classList.add('user-message');
    newMessage.textContent = userMessage;
    messageBox.appendChild(newMessage);
    // messageBox.appendChild(loaderNode)
    const replyMessage = document.createElement('div');
    replyMessage.classList.add('ai-message');
    content.message = userMessage;
    socket.emit('message',content);
    let reply = ''
    const replyPromise = new Promise( (resolve)=>
    {socket.on('message', (response) =>{
        resolve(response.content) 
        
    })})
    replyPromise.then((reply) =>{
    let i = 0;
    const interval = setInterval(() => {
        if ( i < reply.length ) {
            replyMessage.innerHTML += reply[i];
              i++;
            } else {
                document.querySelector('input').disabled = false;
                document.querySelector('input').style.cursor = 'text';
                clearInterval(interval);
            }
          }, 50);	
    messageBox.appendChild(replyMessage);
    
})
document.querySelector('input').disabled = true;
document.querySelector('input').style.cursor = 'not-allowed';
userMessage = '';
    // replyMessage.textContent = response.content
    // messageBox.appendChild(replyMessage);
    // messageBox.scrollTop = messageBox.scrollHeight;

    // replyMessage.textContent = userMessage.toUpperCase();
    // messageBox.appendChild(replyMessage);
    // messageBox.scrollTop = messageBox.scrollHeight;
}

function disconnect(){
    socket.emit('disconnect_now','')
}
export  {handleInput,load_chat}