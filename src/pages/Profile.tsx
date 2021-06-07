import React from 'react';
import ProfileCard from '../components/ProfileCard';
import '../styles/Profile.css'

interface Props { }
const Profile: React.FC<Props> = () => {
    return (
        <div className="pContainer">
            <ProfileCard />
        </div>
    )
}

export default Profile;