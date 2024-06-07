'use client'
import './InputForm.css'
import {handleInput} from '../chat/submitChat';
import { useEffect,useState ,useRef} from "react"
import { load_chat } from '../chat/submitChat';
import {disconnectSocket} from '../chat/submitChat'


export default function InputForm({userName,userID}){
    const [isLoading,setIsLoading] = useState(true);
    const isLoaded = useRef(false)
    // const [error,setError] = useState(null);
    // const[isConnected,setIsConnected] = useState(false);
    useEffect(
        ()=>{if(!isLoaded.current){
	    isLoaded.current = true;
	    load_chat(userName,userID,setIsLoading);
            window.onbeforeunload = ()=>disconnectSocket()}
        }
    )
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
	    {console.log(isLoading,", isloading")}
	    { isLoading &&
	    <div className="loader-container">
		<div className="loader-text">
		    Connecting
		</div>
		<div className="loader"></div>
	    </div>}
	    
	    
	        <form onSubmit={handleSubmit}>
		        <input type="text" id="message" placeholder="Start writing..." autoComplete="off" autoFocus/>
		        <button type="submit" id="submitButton">
		            <img src = "send.png" alt="Submit" />
		        </button>
	        </form>
	    </div> 
    )
}
