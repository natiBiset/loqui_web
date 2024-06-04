import './Profile.css'
export default function Profile({userName}){
	// userName = 'a'
    return (
        <div className="profile-box">
			<div className="profile-content-container">
			<div className="profile-symb">
		            <span className="profile-symb-text">{userName[0].toUpperCase()}</span>
	            </div>
				<div className="profile-text">
				  {userName}
				</div>

			</div>
	            
	        </div>
    )
}