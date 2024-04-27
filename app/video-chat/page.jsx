import Sidebar from "../components/Sidebar"
import ChatBox from "../components/ChatBox"
import VideoInputForm from "../components/VideoInputForm"
import VideoPlayer from "../components/Videoplayer";
import VideoChatBox from "../components/VideoChatBox";

export const metadata = {
    title: "LoquiLabs | Video chat",
    description: "Video chat with LoquiAI",
  };

export default function ChatPage(){

    return (
<>
        <Sidebar />
        {/* <VideoPlayer /> */}
        <VideoChatBox />
        
        <VideoInputForm/>
        
        

</>

    )
}