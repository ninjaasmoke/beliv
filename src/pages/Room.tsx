import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import '../styles/Room.css'

import copy from '../assets/images/copy.svg'
import share from '../assets/images/share.svg'
import { useAuthContext } from '../context/AuthContext';
import { getCookie } from '../helper/cookies';

interface RoomParams {
    roomID: string
}

const Room: React.FC<RouteComponentProps<RoomParams>> = ({ match }) => {
    const { roomID } = match.params;
    const { userData } = useAuthContext();
    useEffect(() => {
        if (getCookie('email') === '') window.location.replace('/login')
    }, [userData])
    return (
        <div className="room">
            <div className="roomMain">
                <h1>Main</h1>
            </div>
            <div className="roomSideBar">
                <div className="copy">
                    <h5>Copy Room ID</h5>
                    <div>
                        <span>{roomID}</span>
                        <button onClick={() => { navigator.clipboard.writeText(roomID) }} title="Copy Room ID">
                            <img className="optIcon" src={copy} alt="Copy" />
                        </button>
                    </div>
                    <hr />
                    <span onClick={() => navigator.share({
                        url: window.location.href,
                        title: 'Join my beliv room',
                        text: roomID
                    })}>Share roomID with your friends. <img className="optIcon" src={share} alt="Share" /> </span>
                </div>
                <div className="header">
                    <img className="headerImg" src={userData.imageUrl} alt="" />
                    <div className="headerName">{userData.name}</div>
                </div>
                <div className="chatting">

                </div>
            </div>
        </div>
    )
}

export default Room;