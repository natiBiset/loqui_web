import Sidebar from "../components/Sidebar"
import ChatBox from "../components/ChatBox"
import AudioForm from "../components/AudioInput";

export const metadata = {
    title: "LoquiLabs | Audio Chat",
    description: "Audio chat with LoquiAI",
  };

export default function ChatPage(){

    // load_chat();
    return (
<>
        <Sidebar />
        <ChatBox />
        <AudioForm />
        

</>

    )
}
