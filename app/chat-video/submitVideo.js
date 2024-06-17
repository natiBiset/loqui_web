import { io } from "socket.io-client";

let socket;
var content = {
  // ID:'male',
  // username: 'mike',
  gender:'f',
  lang:'en-us',
  is_cloned:'no',
  video:'yes',
  audio:'yes'
}
async function load_chat(userName,userID,setIsLoading){  
  if (!userID){
    return
  }
  socket = io('ws://34.195.113.89/socket.io');
  content.ID = userID
  content.username = userName;  
  socket.on('connect', () => {
    setIsLoading(true);
    // console.log('Successfully connected to the Socket.IO server!');
  });
  // console.log('loading');
  // console.log(content);
  socket.emit('load',content);
  socket.on('load',(response) =>{
    setIsLoading(false)
    
  });
}
export function disconnectSocket(){
  if(socket){
    socket.emit('disconnect_now','')}
}

function handleInput(userMessage){
  const chatBox = document.querySelector(".chat-box")
  const messageBox = document.querySelector(".video-message-area");
  const video = document.getElementById("my-video");
  const newMessage = document.createElement('div');
  const videoLoader = document.querySelector(".video_loader");
  const chatLoader = document.querySelector(".chat_loader");
  document.getElementById("message").placeholder = "Continue writing...";
  chatLoader.style.display = "block";
  // videoLoader.style.display = "block";
  newMessage.classList.add('user-message');
  newMessage.textContent = userMessage;
  messageBox.appendChild(newMessage);
  chatBox.scrollTo(0,chatBox .scrollHeight)
  // messageBox.appendChild(loaderNode)
  const replyMessage = document.createElement('div');
  replyMessage.classList.add('ai-message');
  content.message = userMessage;
  socket.off('message')
  socket.emit('message',content);
  let reply = {'text':[],'video':[]}
  let typing = false
  let playing = false;
  let replye;
  let last = false;
  
  socket.on('message', (response) =>{
    // console.log("ack",acknow)
    
    if (response ==='stopToken'){
      document.querySelector('input').disabled = false;
      document.querySelector('input').style.cursor = 'text';
      chatLoader.style.display = "none";
      document.querySelector('input').focus();
      last = true;
    }
    if (typeof response === 'string' && response!=='stopToken'){
      reply['text'].push(response)
      animateStream() 
    }
    else if(typeof response !== 'string' && response!=='stopToken' ){
      reply['video'].push(response)
      playNextVideo()
    }
  })
  
  function animateStream(){
    if(!typing && reply['text'].length > 0){
      typing = true    
      replye = reply['text'].shift()
      let i = 0;
      const interval = setInterval(() => {
        if ( i < replye.length ) {
          replyMessage.innerHTML += replye[i];
          chatBox.scrollTo(0,chatBox.scrollHeight)
          i++;
        }
        else {
	  
          clearInterval(interval);
          typing  = false;
          animateStream()
          
        }
      },
				   50);
      messageBox.appendChild(replyMessage);
    }
  }
  function playNextVideo(){
    if (!playing && reply['video'].length > 0){
      const replye = reply['video'].shift()
      playing = true;
      chatLoader.style.display = "none";
      const blob = new Blob([replye]);
      const videoURL = URL.createObjectURL(blob);
      setTimeout(() => { 
        video.load()
        video.loop = false;
        video.src = videoURL;
        video.currentTime = 0.2;
        video.muted = false;
        video.play().catch((e)=>{console.log("playing eror, ",e)});
        video.addEventListener('ended',onVideoEnded)
        
      }
		 ,50)
      
      
      
    }
    
  }
  
  function onVideoEnded(){
    if(!last){
      chatLoader.style.display = "block";
      
    }
    
    playing= false;
    video.removeEventListener('ended',onVideoEnded)
    
    setTimeout(() => {
      video.load()
      video.src = '/silence.mp4'
      video.muted = true;
      video.loop = true;
      video.currentTime = 0.4;
      video.play()
      
      playNextVideo()
    }) 
    
  }
  document.querySelector('input').disabled = true;
  document.querySelector('input').style.cursor = 'not-allowed';
  
  
}


// replyMessage.textContent = response.content
// messageBox.appendChild(replyMessage);
// messageBox.scrollTop = messageBox.scrollHeight;

// replyMessage.textContent = userMessage.toUpperCase();
// messageBox.appendChild(replyMessage);
// messageBox.scrollTop = messageBox.scrollHeight;


function disconnect(){
  socket.emit('disconnect_now','')
}
export  {handleInput,load_chat}
