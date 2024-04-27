export default function Loader({page}){
    if (page === 'chat'){
        return (
        <div className="loading-dots">
		    <div className="dot"></div>
		    <div className="dot"></div>
		    <div className="dot"></div>
	    </div>
        )
    }
    else if(page === 'audio'){
        return (<>
        </>
        )
    }
    else if (page === 'video'){
        return (<>
        
        </>
        )
    }
}