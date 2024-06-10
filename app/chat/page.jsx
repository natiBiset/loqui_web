import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import InputForm from "../components/InputForm";
import { cookies } from "next/headers";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";

export const metadata = {
  title: "LoquiLabs | Chat",
  description: "Chat with LoquiAI",
};



export default function ChatPage(){
  const cookieStore = cookies();
  const userName = cookieStore.get('username') ? cookies().get('username').value : 'Guest'
  const userID = cookieStore.get('id') ?  cookies().get('id').value : undefined;
  const isSignedIn = cookieStore.get('signedIn') ? cookieStore.get('signedIn').value : false;

  
  
  return (
    <div className="chat-container">      
      {!isSignedIn && <SignUp/>}
      <Sidebar userName={userName}/>
      <div className="main-container">
	<ChatBox />
	<InputForm userName={userName} userID={userID} /> 
	<Footer /> 
      </div>
      
    </div>
    
  )
}
