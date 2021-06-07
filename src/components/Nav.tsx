import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import './Nav.css'
import profile from '../assets/images/profile_icon.png';
import settings from '../assets/images/settings_icon.png';
import logout from '../assets/images/logout_icon.png';

interface Props {

}

const Nav: React.FC<Props> = () => {
    const { userData, logoutUser } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    return (
        <nav className="nav">
            <Link to="/"><h1>beliv</h1></Link>
            <div className="userD" onClick={() => setShowMenu(true)}>
                <img src={userData.imageUrl} alt="User Image" width={36} height={36} />
                <span>{userData.givenName}</span>
            </div>
            <div className="popUpWrapper" style={{ display: showMenu ? 'block' : 'none' }} onClick={() => setShowMenu(false)}>
                <div className="popUp">
                    <ul>
                        <Link to="/profile"><li><img src={profile} /> Profile</li></Link>
                        <Link to="/settings"><li><img src={settings} /> Settings</li></Link>
                        <li className="logout" onClick={() => setShowLogout(true)}><img src={logout} /> Logout</li>
                    </ul>
                </div>
            </div>
            <div className={"popUpWrapper" + " " + "logoutWrapper"} style={{ display: showLogout ? 'block' : 'none' }}>
                <div className="logoutMenu">
                    Are you sure you want to log out?
                        <span className="cancel" onClick={() => setShowLogout(false)}>✕</span>
                    <div className="logoutButtons">
                        <button className="logoutButton" onClick={() => logoutUser()} >Yes</button>
                        <button className="cancelButton" onClick={() => setShowLogout(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;