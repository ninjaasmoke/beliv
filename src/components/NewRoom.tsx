import React from 'react'
import { Link } from 'react-router-dom'
import { usePeerContext } from '../context/PeerContext';

const NewRoom: React.FC = () => {
    const { peer } = usePeerContext();

    const style: React.CSSProperties = {
        borderRadius: 8,
        backgroundColor: 'var(--sec)',
        padding: '12px 24px',
        cursor: 'pointer',
        width: '224px',
        margin: '0 auto',
        fontWeight: 700,
        color: 'var(--color)',
        textAlign: 'center'
    }
    return (
        <Link to={'/room/' + peer?.id}>
            <div className="newRoom" style={style}>
                Enter your room
            </div>
        </Link>
    )
}

export default NewRoom;