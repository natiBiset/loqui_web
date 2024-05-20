import Loaders from "./Loader"
import './AudioPlayer.css'
export default function AudioPlayer(){
    return (
        <div className="audio-player">
			<Loaders page = {'audioPlayer'} />
            <Loaders page = {'audio'}/>

	        <audio id ="my-audio">
		        <source src="" type="audio/wav" />
	        </audio>
        </div>
    )
}