import "./ChatBox.css"
import Loader from "./Loader"
import VideoPlayer from "./Videoplayer"

// import InputForm from "./InputForm"


export default function ChatBox(){
    return (
    <div className="chat-box">
        {/* <VideoPlayer /> */}
	    <div className="message-area"></div>
        <Loader page = {'chat'} />
	    {/* <InputForm /> */}
	</div>
    )
}
