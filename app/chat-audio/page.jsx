import Sidebar from "../components/Sidebar"
import AudioForm from "../components/AudioInput";
import { cookies } from "next/headers";
import SignUp from "../components/SignUp";
import AudioChatBox from "../components/AudioChatBox";
export const metadata = {
    title: "LoquiLabs | Audio Chat",
    description: "Audio chat with LoquiAI",
  };

let userName  = cookies().get('username') ? cookies().get('username').value : 'Guest';
let userID = cookies().get('id') ?  cookies().get('id').value : undefined;
export default function AudioChatPage(){    
    async function onSubmitText(formData){
        'use server'      
        userName = formData.get('username')
        userID = Math.random().toString(16).slice(2)
        console.log(userName)
        if(!userName){
            userName = 'Guest'
       }
       cookies().set('signedIn' ,true)
       cookies().set('username' ,userName)
       cookies().set('id',userID)
       
    }

    // load_chat();
    return (
<>
        {!cookies().get('signedIn') && <SignUp  onSubmitText = {onSubmitText}/>}
        <Sidebar userName={userName}/>
        <AudioChatBox />
        <AudioForm userName={userName} userID={userID}/>
        

</>

    )
}
