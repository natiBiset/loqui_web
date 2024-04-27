import "./VideoChatBox.css"
import Loader from "./Loader"
import VideoPlayer from "./Videoplayer"

// import InputForm from "./InputForm"


export default function VideoChatBox(){
    return (
    <div className="chat-box">
        <VideoPlayer />
	    <div className="video-message-area"></div>
        <Loader page = {'chat'} />
	    {/* <InputForm /> */}
	</div>
    )
}