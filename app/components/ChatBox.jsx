'use client'
import "./ChatBox.css"
import Loaders from "./Loader"
import VideoPlayer from "./Videoplayer"

// import InputForm from "./InputForm"


export default function ChatBox(){
    return (
    <div className="chat-box">
        {/* <VideoPlayer /> */}
        <Loaders page = {'chat'} />
	    <div className="message-area">
        
        </div>
        
	    {/* <InputForm /> */}
	</div>
    )
}
