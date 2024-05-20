import "./VideoChatBox.css"
import Loaders from "./Loader"
import VideoPlayer from "./Videoplayer"
import Options from "./Options"

// import InputForm from "./InputForm"


export default function VideoChatBox(){
    return (
    <div className="chat-box">
        <VideoPlayer />
	    <div className="video-message-area"> </div>
        <Loaders page = {'chat'} />
	    {/* <InputForm /> */}
       
	</div>
    )
}