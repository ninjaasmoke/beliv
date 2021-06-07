import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

interface RoomParams {
    roomID: string
}

const Room: React.FC<RouteComponentProps<RoomParams>> = ({ match }) => {
    const { roomID } = match.params;
    console.log(roomID)
    return (
        <div>
            <h1>Room {match.params.roomID} </h1>
        </div>
    )
}

export default Room;