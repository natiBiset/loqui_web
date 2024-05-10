import './SignUp.css'
import { handleSignUp } from '../chat/submitChat';
export default function SignUp({onSubmitText}){
    
    return (
        <div className="modal">
        <div className="modal-content">
          <h1 className='modal-text'>Hey, what is you name?</h1>
          <form action={onSubmitText} className='modal-form'>
            <input type="text" id="username" name="username" required placeholder='Username' autoComplete="off" autoFocus/>
            <button type="submit">Start Chat</button>
          </form>
        </div>
      </div>
    
    )
}
