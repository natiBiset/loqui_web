import './Profile.css'
export default function Profile({userName}){
	// userName = 'a'
    return (
        <div className="profile-box">
	            <div className="profile-symb">
		            <span className="profile-symb-text">{userName[0].toUpperCase()}</span>
	            </div>
	            <span className="profile-text">{userName}</span>
	        </div>
    )
}