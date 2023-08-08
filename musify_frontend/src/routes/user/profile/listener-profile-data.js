import { useNavigate } from 'react-router-dom';

const ListenerProfileDataComponent = (profile) => {
    const navigate = useNavigate();
    const nameInitials = profile.user.firstName.charAt(0) + profile.user.lastName.charAt(0);
    return (
        <div className="p-5 w-100 d-flex justify-content-center row nav-bar border-b border-solid">
                <button className="col-1 back-btn" onClick={() => navigate('/home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </button>
                <div className="col-2">
                    <div className="profile-icon rounded-circle d-flex justify-content-center align-items-center"> 
                        <span className= "font-bold bg-transparent"> {nameInitials}</span>
                    </div>
                </div>
                <div className="col-9">
                    <div className="profile-info text-white d-flex align-items-end">
                        <div>
                        <p className="text-sm"> Listener</p>

                        <h1 className="green-color bg-transparent listener-title">{profile.user.firstName}</h1>

                        <p className="text-sm"> 1 Public Playlist . 1 Follower . 4 Following </p>
                        {/* change follow to unfollow if following */}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ListenerProfileDataComponent;