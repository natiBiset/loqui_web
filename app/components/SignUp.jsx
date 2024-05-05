import './SignUp.css'
import { handleSignUp } from '../chat/submitChat';
export default function SignUp({onSubmitText}){
    
    return (
        <div className="modal">
        <div className="modal-content">
          <h1 className='modal-text'>Sign Up</h1>
          <form action={onSubmitText}>
            <input type="text" id="username" name="username" required placeholder='Username' autoComplete="off" autoFocus/>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    
    )
}
