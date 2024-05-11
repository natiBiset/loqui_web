import { io } from "socket.io-client";
import UserMessage from "../components/UserMessage";
const socket = io('ws://34.195.113.89/socket.io');

import ReactDOM from 'react-dom';


var content = {
    // ID:'male',
    // username: 'mike',
    gender:'f',
    lang:'en-us',
    is_cloned:'no',
    video:'yes',
    audio:'yes'
  }
async function load_chat(userName,userID){  
    if (!userID){
        return
    }
    content.ID = userID
    content.username = userName;  
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
function handleInput(userMessage){
    // const loaderNode = ReactDOM.render(<l-ring size='60' color="coral"></l-ring>, document.createElement('div'));
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
    messageBox.scrollTo(0,messageBox.scrollHeight)
    // messageBox.appendChild(loaderNode)
    const replyMessage = document.createElement('div');
    replyMessage.classList.add('ai-message');
    content.message = userMessage;
    socket.emit('message',content);
    let reply = {'text':[],'video':[]}
    let typing = false
    let replye;
    socket.off('message')
    socket.on('message', (response) =>{
        console.log(`respone is ${typeof response}`)
        if (typeof response === 'string'){
            reply['text'].push(response)
            
            while(reply['text'].length > 0){
                
                if (!typing){
                    replye = reply['text'].shift()
                }
                else{
                    continue;
                }
                console.log(replye)
                let i = 0;
                chatLoader.style.display = "none";
                const interval = setInterval(() => {
                    typing = true
            if ( i < replye.length ) {
                replyMessage.innerHTML += replye[i];
                messageBox.scrollTo(0,messageBox.scrollHeight)
                  i++;
                } else {
                    document.querySelector('input').disabled = false;
                    document.querySelector('input').style.cursor = 'text';
                    clearInterval(interval);
                    typing  = false;

                }
              }, 50);
              messageBox.appendChild(replyMessage);
              
              userMessage = '';
              
        }}
        else{
            reply['video'].push(response)
            while(reply['video'].length > 0){
                const replye = reply['video'].shift()
                console.log("its a video, processing")
                const blob = new Blob([replye]);
                const videoURL = URL.createObjectURL(blob);
                video.loop = false;
                video.src = videoURL;
                video.currentTime = 0.2;
                // loadingDotsVideo.style.display = "none";
                // videoLoader.style.display = "none";
                video.muted = false;
                video.play();
                video.addEventListener('ended',()=>{
                    video.muted = true;
                    video.src = '/silence.mp4'
                    video.currentTime = 0.1;
                    video.play()
                })

                
        }
        
        
        
    }})
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