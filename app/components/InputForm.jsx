'use client'
import './InputForm.css'
import {handleInput} from '../chat/submitChat';
import { useEffect,useState ,useRef} from "react"
import { load_chat } from '../chat/submitChat';
import {disconnectSocket} from '../chat/submitChat'


export default function InputForm({userName,userID}){
  const [isLoading,setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isLoaded = useRef(false)
  // const [error,setError] = useState(null);
  // const[isConnected,setIsConnected] = useState(false);
  useEffect(
    ()=>{if(!isLoaded.current){
      isLoaded.current = true;
      load_chat(userName,userID,setIsLoading,setError);
      window.onbeforeunload = ()=>disconnectSocket()}
        }
  )
  function handleSubmit(e){
    e.preventDefault();
    if (!isLoading){            
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
      
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
	<input type="text" id="message" placeholder="Start writing..." autoComplete="off" disabled = {isLoading || error} autoFocus className={(isLoading || error) ? 'disabled-input' : ''}/>
	<button type="submit" id="submitButton">
	  <img src = "send.png" alt="Submit" />
	</button>
      </form>
    </div> 
  )
}
