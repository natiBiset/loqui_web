'use client'
import './AudioInput.css'

export default function AudioForm(){
    return (
        <div className="microphone-form">
		       <form>
			        <button type="button" className="recordButton">
			            <img src = "/phone-call.png" alt="Microphone"/>
			        </button>
		       </form>
		       <form>
			        <button type="button" className="stopButton">
			            <img src = "/stop-button.png" alt="Stop"/>
		            </button>
			    </form>
	    </div>

    )
}