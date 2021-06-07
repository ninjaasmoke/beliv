import React from 'react';
import { useAuthContext } from '../context/AuthContext';

interface Props { }
const ProfileCard: React.FC<Props> = () => {
    const { userData } = useAuthContext();
    return (
        <div className="profileCard">
            <img src="https://source.unsplash.com/800x280/?developer,coding,programmer,audio,music,party" className="bgImg" alt="Profile BackGround" />
            <div className="profile">
                <img className="profileImg" src={userData.imageUrl} alt="User Profile" />
                <div className="profileData">
                    <span className="profileName">{userData.name}</span> <br />
                    <span className="profileId">@{userData.googleId}</span> <br />
                    <span className="profileId">{userData.email}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;