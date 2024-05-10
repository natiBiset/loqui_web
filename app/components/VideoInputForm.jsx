'use client'
import './InputForm.css'
import {handleInput} from '../chat-video/submitVideo';
import { useEffect } from "react"
import { load_chat } from '../chat-video/submitVideo';


export default function VideoInputForm({userName,userID}){
    useEffect(()=>{load_chat(userName,userID)})
    function handleSubmit(e){
        e.preventDefault();
        const userInput = e.target.querySelector('input[type="text"]').value;
        e.target.reset()
        console.log(userInput)
        handleInput(userInput)
        // return input_text

    }
    return(
        <div className="input-form">
	        <form onSubmit={handleSubmit}>
		        <input type="text" id="message" placeholder="Start writting..." autoComplete="off" autoFocus/>
		        <button type="submit" id="submitButton">
		            <img src = "send.png" alt="Submit" />
		        </button>
	        </form>
	    </div> 
    )
}