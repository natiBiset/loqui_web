import { io } from "socket.io-client";
const socket = io('ws://34.195.113.89/socket.io');



var content = {
    // ID:'sample8',
    gender:'f',
    lang:'en-us',
    is_cloned:'no',
    // video:'no'
  }
async function load_chat(userName,userID){   
    if (!userID){
        return
    }
    content.ID = userID
    content.username = userName 
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

export function handleSignUp(e){
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const form = document.querySelector("form") 
    const userInput = e.target.querySelector('input[type="text"]').value;
    e.target.reset() 
    console.log('user is ', userInput)
    

}
function handleInput(userMessage){
    // const loaderNode = ReactDOM.render(<l-ring size='60' color="coral"></l-ring>, document.createElement('div'));
    const messageBox = document.querySelector(".message-area");
    const newMessage = document.createElement('div');
    const chatLoader = document.querySelector(".chat_loader");
    document.getElementById("message").placeholder = "Continue writing...";
    chatLoader.style.display = "block";
    newMessage.classList.add('user-message');
    newMessage.textContent = userMessage;
    messageBox.appendChild(newMessage);
    messageBox.scrollTo(0,messageBox.scrollHeight)
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
        if (reply){
    let i = 0;
    chatLoader.style.display = "none";
    const interval = setInterval(() => {
        if ( i < reply.length ) {
            replyMessage.innerHTML += reply[i];
            messageBox.scrollTo(0,messageBox.scrollHeight)
              i++;
            } else {
                // messageBox.scrollTo(0,messageBox.scrollHeight)
                document.querySelector('input').disabled = false;
                document.getElementById("message").focus();
                document.querySelector('input').style.cursor = 'text';
                clearInterval(interval);
            }
          }, 50);	
    messageBox.appendChild(replyMessage);
    
    
}})
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