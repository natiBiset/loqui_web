import Sidebar from "../components/Sidebar"
import VideoChatBox from "../components/VideoChatBox";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";
import { cookies } from "next/headers"; 
import VideoInputForm from "../components/VideoInputForm";

export const metadata = {
    title: "LoquiLabs | Video chat",
    description: "Video chat with LoquiAI",
  };
;

export default function ChatPage(){
  const cookieStore = cookies();
  const userName = cookieStore.get('username') ? cookies().get('username').value : 'Guest'
  const userID = cookieStore.get('id') ?  cookies().get('id').value : undefined;
  const isSignedIn = cookieStore.get('signedIn') ? cookieStore.get('signedIn').value : false;

    return (
      <div className="chat-container">
	{!isSignedIn && <SignUp/>}
	<Sidebar userName={userName}/>
	{/* <VideoPlayer /> */}
	<div className="main-container">
	  <VideoChatBox />
	  <VideoInputForm userName={userName} userID={userID}/>
	  <Footer /> 
	</div>
      </div>
      
    )
}
