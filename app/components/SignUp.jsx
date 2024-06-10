'use client'

import {useState} from 'react';
import './SignUp.css'
export default function SignUp(){
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:3000/api/cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Error submitting form:', response.statusText);
    }
  };
    return (
        <div className="modal">
        <div className="modal-content">
          <h1 className='modal-text'>Hey, what is you name?</h1>
          <form onSubmit={handleSubmit} className='modal-form'>
            <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} name="username" required placeholder='Username' autoComplete="off" autoFocus/>
            <button type="submit">Start Chat</button>
          </form>
        </div>
      </div>
    
    )
}
