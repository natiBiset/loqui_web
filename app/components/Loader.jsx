import './Loader.css'
export default function Loaders({page}){
    if (page === 'chat'){
        return (
        <span className="chat_loader" style={{display:"none"}}></span>
        )
    }
    else if(page === 'audio'){
        return (<>
        </>
        )
    }
    else if (page === 'video'){
        return (<>
        <span className="video_loader" style={{display:"none"}}></span>
        </>
        )
    }
}