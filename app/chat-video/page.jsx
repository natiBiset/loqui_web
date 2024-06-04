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
let userName  = cookies().get('username') ? cookies().get('username').value : 'Guest';
let userID = cookies().get('id') ?  cookies().get('id').value : undefined;
export default function ChatPage(){
    async function onSubmitText(formData){
        'use server'
        userName = formData.get('username')
        userID = Math.random().toString(16).slice(2)
        console.log(userName)
        if(!userName){
            userName = 'Guest'
       }
       cookies().set('signedIn' ,true);
       cookies().set('username' ,userName);
       cookies().set('id',userID)
       
       
    }

    return (
<div className="chat-container">
        {!cookies().get('signedIn') && <SignUp  onSubmitText = {onSubmitText}/>}

        <Sidebar userName={userName}/>
        {/* <VideoPlayer /> */}
        <div className="main-container">
        <VideoChatBox />
        <VideoInputForm userName={userName} userID={userID}/>
        </div>
        
        
        
         {/*
        <Footer /> */}

</div>

    )
}
