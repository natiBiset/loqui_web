import AudioPlayer from "./AudioPlayer"
import './AudioChatBox.css'


// import InputForm from "./InputForm"


export default function AudioChatBox(){
    return (
    <div className="chat-box">
        
	    <div className="audio-message-area">
            
        
        </div>
        <div className="audio-player-container">
            <AudioPlayer />
            </div>
	</div>
    )
}