'use client'
import './InputForm.css'
import {handleInput} from '../video-chat/submitVideo';
import { useEffect } from "react"
import { load_chat } from '../video-chat/submitVideo';


export default function VideoInputForm(){
    useEffect(()=>{load_chat()})
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
		        <input type="text" id="message" placeholder="Enter your message" autoComplete="off" autoFocus/>
		        <button type="submit" id="submitButton">
		            <img src = "send.png" alt="Submit" />
		        </button>
	        </form>
	    </div> 
    )
}