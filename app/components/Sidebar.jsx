"use client";
import './Sidebar.css'
import Profile from './Profile'
import { usePathname} from 'next/navigation';


export default function Sidebar({userName}){
    
    const pathname = usePathname();
    console.log(`this is the current page : ${pathname}`)

    return(
        <div className="sidebar">
            <section className='info-container'>
                <h1 id='company_name'>LOQUILABS AI</h1>
                <h1 id='mobile-company-name'>L</h1>
                <p id='statement'>Let's Humanize AI</p>
            </section>
            <nav className="menu-box">
                <ul>
                    <li id="chat-menu" >
                        <a href="/chat" className={pathname == "/chat" ? "active" : ""}>
                           <span id='menu-text' > New Text Chat </span> 
                            <img src="chatt.png" alt="chat_Image"/>
                        </a>
                    </li>
                    <li id="audio-menu" >
                        <a href="/chat-audio" className={pathname == "/chat-audio" ? "active" : ""}>
                        <span id='menu-text' >New Audio Chat</span> 
                            <img src="mic.png" alt="mic_Image"></img>
                        </a>
                    </li>
                    <li id="video-menu" >
                        <a href="/chat-video" className={pathname == "/chat-video" ? "active" : ""} >
                        <span id='menu-text' > New Video Chat</span> 
                            <img src="video.png" alt="video_Image"/>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <Profile userName={userName} />

        </div>
    )
}