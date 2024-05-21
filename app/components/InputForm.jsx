'use client'
import './InputForm.css'
import {handleInput} from '../chat/submitChat';
import { useEffect } from "react"
import { load_chat } from '../chat/submitChat';
import {disconnectSocket} from '../chat/submitChat'


export default function InputForm({userName,userID}){
    useEffect(
        ()=>{load_chat(userName,userID);
            window.onbeforeunload = ()=>disconnectSocket()
        }
    )
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
		        <input type="text" id="message" placeholder="Start writing..." autoComplete="off" autoFocus/>
		        <button type="submit" id="submitButton">
		            <img src = "send.png" alt="Submit" />
		        </button>
	        </form>
	    </div> 
    )
}