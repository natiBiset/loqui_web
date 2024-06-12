'use client'
import './error.css'
import {useEffect} from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
	//log the error
    }, [error])
    
    return (
	<div className=container>
	    <div className=error-content>
		<h1 className=error-message>
		    {error.message}		    
		</h1>		
	    </div>
	</div>
    )
}
