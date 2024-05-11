import './Videoplayer.css'
import Loaders from './Loader'
export default function VideoPlayer(){
    return (

        
        <div className="video-player">
			<Loaders page = {'video'} />

	        <video id ="my-video" muted autoPlay loop>
		        <source src="/sample_loop.mp4" type="video/mp4" />
	        </video>
        </div>
    )
}