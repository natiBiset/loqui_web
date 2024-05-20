'use client'
import './AudioInput.css'
import { record,suspendRecordingBtn,load_chat} from '../chat-audio/submitAudio'
import Link from 'next/link';
// import { load_chat } from '../audio';
import { useEffect } from "react";
export default function AudioForm({userName,userID}){
	useEffect(()=>{load_chat(userName,userID);
		record()

		
	})
    return (
        <div className="microphone-form">
				<form>
		       {/* <form onSubmit={ (e) => { e.preventDefault(); record(e); }}> */}
			        <button type="submit" className="recordButton" onClick={(e) => {e.preventDefault();suspendRecordingBtn()}} >
						
			            <img src = "/microphone.svg" alt="Microphone"/>
						{/* <div className="start-button-text">Start</div> */}
						{/* < FaMicrophone value = {{className :"microphone-icon"}}/> */}
			        </button>
		       </form>
		       <Link href={'/chat'}>
			        <button type="button" className="stopButton">
			            <img src = "/stop-button.png" alt="Stop"/>
						{/* <div className="stop-button-text">Stop</div> */}
		            </button>
			    </Link>
				<form>
			        <button type="button" className="speakerButton" onClick={suspendRecordingBtn}>
			            <img src = "/speaker.svg" alt="various speakers"/>
						{/* <div className="stop-button-text">Stop</div> */}
		            </button>
			    </form>
	    </div>

    )
}