import './Loader.css'
export default function Loaders({page}){
    if (page === 'chat'){
      return (
	<div className='chat_loader_container'>
	  <span className="chat_loader" style={{display:"none"}}></span>
	</div>
        )
    }
    else if(page === 'audioPlayer'){
        return (
        <div id="audio-bars">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
        )
    }
    else if (page === 'audio'){
        return(<span className="audio_loader" style={{display:"none"}}></span>
    )}
        
    else if (page === 'video'){
        return (<>
        <span className="video_loader" style={{display:"none"}}></span>
        </>
        )
    }
}
