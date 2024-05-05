import Sidebar from "../components/Sidebar"
import ChatBox from "../components/ChatBox"
import VideoInputForm from "../components/VideoInputForm"
import VideoPlayer from "../components/Videoplayer";
import VideoChatBox from "../components/VideoChatBox";
import SignUp from "../components/SignUp";
import { cookies } from "next/headers";

export const metadata = {
    title: "LoquiLabs | Video chat",
    description: "Video chat with LoquiAI",
  };
;
let userName  = cookies().get('username').value  ?? 'Guest';
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
<>
        {!cookies().get('signedIn') && <SignUp  onSubmitText = {onSubmitText}/>}

        <Sidebar userName={userName}/>
        {/* <VideoPlayer /> */}
        <VideoChatBox />
        
        <VideoInputForm userName={userName} userID={userID}/>
        
        

</>

    )
}