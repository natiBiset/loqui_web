import Sidebar from "../components/Sidebar"
import AudioForm from "../components/AudioInput";
import { cookies } from "next/headers";
import SignUp from "../components/SignUp";
import AudioChatBox from "../components/AudioChatBox";
import Footer from "../components/Footer";
export const metadata = {
    title: "LoquiLabs | Audio Chat",
    description: "Audio chat with LoquiAI",
  };


export default function AudioChatPage(){
  const cookieStore = cookies();
  const userName = cookieStore.get('username') ? cookies().get('username').value : 'Guest'
  const userID = cookieStore.get('id') ?  cookies().get('id').value : undefined;
  const isSignedIn = cookieStore.get('signedIn') ? cookieStore.get('signedIn').value : false;


  return (
    <div className="chat-container">
      {!isSignedIn && <SignUp/>}
      <Sidebar userName={userName}/>
      <div className="main-container">
        <AudioChatBox />
        <AudioForm userName={userName} userID={userID}/>
        <Footer /> 
      </div>      
    </div>
    
  )
}
