import './Videoplayer.css'
export default function VideoPlayer(){
    return (

        
        <div className="video-player">
	        <div className="loading-dots-video" style={{display: "none"}}>
		    <div className="dot"></div>
		    <div className="dot"></div>
		    <div className="dot"></div>
	        </div>

	        <video id ="my-video">
		        <source src="" type="video/mp4" />
	        </video>
        </div>
    )
}