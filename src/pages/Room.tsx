import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import '../styles/Room.css'

import copy from '../assets/images/copy.svg'

interface RoomParams {
    roomID: string
}

const Room: React.FC<RouteComponentProps<RoomParams>> = ({ match }) => {
    const { roomID } = match.params;
    console.log(roomID)
    return (
        <div className="room">
            <div className="roomMain">
                <h1>Main</h1>
            </div>
            <div className="roomSideBar">
                <div className="copy">
                    <h5>Copy Room ID</h5>
                    <span>{match.params.roomID}</span>
                    <button onClick={() => { navigator.clipboard.writeText(match.params.roomID) }} title="Copy Room ID"> <img src={copy} alt="Copy" /> </button>
                </div>
            </div>
        </div>
    )
}

export default Room;