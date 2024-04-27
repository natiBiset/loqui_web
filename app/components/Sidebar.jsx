"use client";
import './Sidebar.css'
import Profile from './Profile'
import { usePathname} from 'next/navigation';


export default function Sidebar(){
    
    const pathname = usePathname();
    console.log(`this is the current page : ${pathname}`)

    return(
        <div className="sidebar">
            <h1 id='company_name'>LOQUILABS AI</h1>
            <p id='statement'>Let's Humanize AI</p>
            <nav className="menu-box">
                <ul>
                    <li id="chat-menu" >
                        <a href="/chat" className={pathname == "/chat" ? "active" : ""}>
                            New Text Chat 
                            <img src="chatt.png" alt="chat_Image"/>
                        </a>
                    </li>
                    <li id="audio-menu" >
                        <a href="/audio-chat" className={pathname == "/audio-chat" ? "active" : ""}>
                            New Audio Chat
                            <img src="mic.png" alt="mic_Image"></img>
                        </a>
                    </li>
                    <li id="video-menu" >
                        <a href="/video-chat" className={pathname == "/video-chat" ? "active" : ""} >
                            New Video Chat
                            <img src="video.png" alt="video_Image"/>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <Profile />

        </div>
    )
}