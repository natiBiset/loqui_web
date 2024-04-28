import './Videoplayer.css'
import Loaders from './Loader'
export default function VideoPlayer(){
    return (

        
        <div className="video-player">
			<Loaders page = {'video'} />

	        <video id ="my-video">
		        <source src="" type="video/mp4" />
	        </video>
        </div>
    )
}