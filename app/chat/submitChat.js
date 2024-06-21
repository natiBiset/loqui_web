import { io } from "socket.io-client";

var content = {
    // ID:'sample8',
    gender:'f',
    lang:'en-us',
    is_cloned:'no',
    // video:'no'
}
let socket;
async function load_chat(userName,userID,setIsLoading,setError){
  let count = 0
  if (!userID){
    return
  }
  try{
    socket = io('ws://34.195.113.89/socket.io',{
        'reconnection': true,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax' : 5000,
        'reconnectionAttempts': 3
    });
    content.ID = userID;
    content.username = userName;
    socket.on('connect', () => {
      setIsLoading(true);
    });
    socket.on("connect_error", (err) => {
      count+=1;
      if (count === 3){
	setIsLoading(false);
	setError(`An error occurred. Please try reloading the page.`);
      }      
      
    });
    // console.log('loading');
    // console.log(content);
    socket.emit('load',content);
    socket.on('load',(response) =>{
      if(response === 'model loaded'){
	setIsLoading(false);
      }
      
    });

  }catch(error){
    console.error('Error in load_chat:', error);
    setIsLoading(false);
    setError('An unexpected error occurred.');
    
  }
  
}

export function handleSignUp(e){
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const form = document.querySelector("form") 
    const userInput = e.target.querySelector('input[type="text"]').value;
    e.target.reset() 
    // console.log('user is ', userInput)
    

}
function handleInput(userMessage){
  // const loaderNode = ReactDOM.render(<l-ring size='60' color="coral"></l-ring>, document.createElement('div'));
  const chatBox = document.querySelector(".chat-box")
  const messageBox = document.querySelector(".message-area");
  const newMessage = document.createElement('div');
  const chatLoader = document.querySelector(".chat_loader");
  document.getElementById("message").placeholder = "Continue writing...";
  chatLoader.style.display = "block";
  newMessage.classList.add('user-message');
  newMessage.textContent = userMessage;
  messageBox.appendChild(newMessage);
  chatBox.scrollTo(0,chatBox.scrollHeight)
  // messageBox.appendChild(loaderNode)
  const replyMessage = document.createElement('div');
  replyMessage.classList.add('ai-message');
  content.message = userMessage;
  socket.off('message')
  socket.emit('message',content);
  let reply = ''
  socket.on('message', (response) =>{
    
    if (response.content){
      reply = response.content
      let i = 0;
      chatLoader.style.display = "none";
      const interval = setInterval(() => {
        if ( i < reply.length ) {
          replyMessage.innerHTML += reply[i];
          chatBox.scrollTo(0,chatBox.scrollHeight)
          i++;
        } 
        else {
          // messageBox.scrollTo(0,messageBox.scrollHeight)
          document.querySelector('input').disabled = false;
          document.getElementById("message").focus();
          document.querySelector('input').style.cursor = 'text';
          
          clearInterval(interval);
          
        }
      }, 50);
      messageBox.appendChild(replyMessage);	
      
      
      
    }
    document.querySelector('input').disabled = true;
    document.querySelector('input').style.cursor = 'not-allowed';
    userMessage = '';
  }
	   )
  
  
  // replyMessage.textContent = response.content
  // messageBox.appendChild(replyMessage);
  // messageBox.scrollTop = messageBox.scrollHeight;
  
  // replyMessage.textContent = userMessage.toUpperCase();
  // messageBox.appendChild(replyMessage);
  // messageBox.scrollTop = messageBox.scrollHeight;
}

export function disconnectSocket(){
  if (socket){
    // console.log('disconnecting')
    socket.emit('disconnect_now','')
  }
}
export  {handleInput,load_chat}
