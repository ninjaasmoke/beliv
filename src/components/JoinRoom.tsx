import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { usePeerContext } from '../context/PeerContext';
import './JoinRoom.css'

const inpStyle: React.CSSProperties = {
    borderRadius: 8,
    backgroundColor: 'var(--sec)',
    padding: '12px 24px',
    width: '224px',
    margin: '0 auto',
    marginTop: 20,
    border: 'none',
    color: 'var(--color)',
    outline: 'none'
}

const JoinRoom: React.FC = () => {
    const history = useHistory();

    const { peer, setPeerConnection } = usePeerContext();

    const roomID = useRef<HTMLInputElement>(null);

    const [showBtn, setshowBtn] = useState(false);

    const listenLen = (val: string) => {
        if (val.length >= 6) {
            setshowBtn(true)
        }
        else setshowBtn(false);
    }

    const connect = (roomID: string) => {
        const conn = peer?.connect(roomID);
        console.log(conn);
        conn && setPeerConnection && setPeerConnection(conn);
        const interval = setInterval(() => {
            console.log(
                "checking connetionState",
                conn?.peerConnection?.connectionState
            );
            if (
                conn?.peerConnection?.connectionState &&
                conn?.peerConnection?.connectionState === "failed"
            ) {
                conn.close();
                setPeerConnection && setPeerConnection(null);
                connect(roomID);
                clearInterval(interval);
            } else if (
                (conn?.peerConnection?.connectionState &&
                    conn?.peerConnection?.connectionState === "connected") ||
                !conn?.peerConnection?.connectionState
            ) {
                clearInterval(interval);
                history.push(`/room/${roomID}`);
            }
        }, 2000);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input style={inpStyle}
                ref={roomID} name="joinRoom" id="joinRoom"
                autoCorrect="false"
                autoComplete="false"
                autoCapitalize="false"
                placeholder="Enter friend's room ID"
                onChange={(e) => { listenLen(e.target.value) }} />
            <div className="btnDis">
                <button className="btn" style={{ top: showBtn ? 0 : '-40px' }} onClick={() => {
                    if (roomID.current?.value)
                        connect(roomID.current.value)
                }} >Join</button>
            </div>
        </div>
    )
}

export default JoinRoom;