'use client'
import './AudioInput.css'
import { record,suspendRecordingBtn,load_chat,showDropDown,selectFromDropDown} from '../chat-audio/submitAudio'
import Link from 'next/link';
// import { load_chat } from '../audio';
import { useEffect,useState ,useRef} from "react"
import {disconnectSocket} from '../chat-audio/submitAudio'

export default function AudioForm({userName,userID}){
    const [isLoading,setIsLoading] = useState(true);
    const isLoaded = useRef(false)

    useEffect(()=>{
	if(!isLoaded.current){
	    isLoaded.current = true;
	    load_chat(userName,userID,setIsLoading);
	    console.log('isloaded',isLoading)
	   

	    window.onbeforeunload = ()=>disconnectSocket()}
	if (!isLoading){
	     record()
	}
		
	})
    return (
	<>{ isLoading && 
	    <div className="loader-container">
		<div className="loader-text">
		    Connecting
		</div>
		<div className="loader"></div>
	    </div>}
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
					<div className="dropup">
					<button type="button" className="speakerButton" onClick={(e) => {e.preventDefault();showDropDown()}}>
			            <img src = "/speaker.svg" alt="various speakers"/>
						{/* <div className="stop-button-text">Stop</div> */}
		            </button>
					<div className="dropup-content">
    					<div className="speaker-1" onClick={(e) => {e.preventDefault();selectFromDropDown(1)}}>Speaker 1</div>
    					<div className="speaker-2" onClick={(e) => {e.preventDefault();selectFromDropDown(2)}}>Speaker 2</div>
  					</div>
					</div>
			        
			    </form>
	</div>
	</>

    )
}
