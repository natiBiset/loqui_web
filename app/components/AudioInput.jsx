'use client'
import { FaMicrophone } from "react-icons/fa6";;
import './AudioInput.css'
import { record,suspendRecording,load_chat } from '../audio-chat/submitAudio'
// import { load_chat } from '../audio';
import { useEffect } from "react";
export default function AudioForm({userName,userID}){
	useEffect(()=>{load_chat(userName,userID)})
    return (
        <div className="microphone-form">
		       <form onSubmit={ (e) => { e.preventDefault(); record(e); }}>
			        <button type="submit" className="recordButton" >
						
			            <img src = "/microphone.svg" alt="Microphone"/>
						<div className="start-button-text">Start</div>
						{/* < FaMicrophone value = {{className :"microphone-icon"}}/> */}
			        </button>
		       </form>
		       <form>
			        <button type="button" className="stopButton" onClick={suspendRecording}>
			            <img src = "/stop-button.png" alt="Stop"/>
						<div className="stop-button-text">Stop</div>
		            </button>
			    </form>
	    </div>

    )
}