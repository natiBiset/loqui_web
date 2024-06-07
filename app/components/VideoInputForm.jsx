'use client'
import './InputForm.css'
import {handleInput} from '../chat-video/submitVideo';
import { useEffect,useState ,useRef} from "react"
import { load_chat,disconnectSocket } from '../chat-video/submitVideo';


export default function VideoInputForm({userName,userID}){
    const [isLoading,setIsLoading] = useState(true);
    const isLoaded = useRef(false)
    useEffect(()=>
	{
	    if(!isLoaded.current){
		isLoaded.current = true;
		load_chat(userName,userID,setIsLoading);
		window.addEventListener('beforeunload', function(event) {
		    const video = document.querySelector('video');
		    video.pause()
		});
		window.onbeforeunload = ()=>disconnectSocket()}
        
    })
    function handleSubmit(e){
	if (!isLoading){
            e.preventDefault();
            const userInput = e.target.querySelector('input[type="text"]').value;
            e.target.reset()
            console.log(userInput)
            handleInput(userInput)}
        // return input_text

    }
    return(
	
        <div className="input-form">
	    { isLoading &&
	    <div className="loader-container">
		<div className="loader-text">
		    Connecting
		</div>
		<div className="loader"></div>
	    </div>}
	        <form onSubmit={handleSubmit}>
		        <input type="text" id="message" placeholder="Start writting..." autoComplete="off" autoFocus/>
		        <button type="submit" id="submitButton">
		            <img src = "send.png" alt="Submit" />
		        </button>
	        </form>
	    </div> 
    )
}
