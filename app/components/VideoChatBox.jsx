import "./VideoChatBox.css"
import Loaders from "./Loader"
import VideoPlayer from "./Videoplayer"
import Options from "./Options"

// import InputForm from "./InputForm"


export default function VideoChatBox(){
    return (
    <div className="chat-box">
        {/* */}
        <Loaders page = {'chat'} />
	    <div className="video-message-area"> </div>
        <div className="video-player-container">
        <VideoPlayer /> 
        </div>
	    {/* <InputForm /> */}
       
	</div>
    )
}