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
let userName  = cookies().get('username') ? cookies().get('username').value : 'Guest'
let userID = cookies().get('id') ?  cookies().get('id').value : undefined;
export default function ChatPage(){
    // let userName = 
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

    
    return (
<>      
        {/* {!cookies().get('signedIn') && <SignUp  onSubmitText = {onSubmitText}/>} */}
        
        <Sidebar userName={userName}/>
        {/* <ChatBox />
        <InputForm userName={userName} userID={userID} /> 
        
        <Footer /> */}
        

</>

    )
}
