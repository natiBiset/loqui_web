import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import InputForm from "../components/InputForm";
import '../components/InputForm.css';
import Footer from "../components/Footer";

export const metadata = {
    title: "LoquiLabs | Chat",
    description: "Chat with LoquiAI",
  };

export default function ChatPage(){

    return (
<>
        <Sidebar />
        <ChatBox />
        <InputForm />
        
        {/* <Footer /> */}
        

</>

    )
}