import React, { useRef, useState } from 'react';
import './JoinRoom.css'

const JoinRoom: React.FC = () => {

    const roomID = useRef<HTMLInputElement>(null);

    const [showBtn, setshowBtn] = useState(false);

    const listenLen = (val: string) => {
        if (val.length === 6) {
            setshowBtn(true)
        }
        else setshowBtn(false);
    }

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
                <button className="btn" style={{ top: showBtn ? 0 : '-40px' }}>Join</button>
            </div>
        </div>
    )
}

export default JoinRoom;