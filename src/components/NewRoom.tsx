import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { usePeerContext } from '../context/PeerContext';

const NewRoom: React.FC = () => {
    const { userData } = useAuthContext();
    const { peer } = usePeerContext();

    const style: React.CSSProperties = {
        borderRadius: 8,
        backgroundColor: 'var(--sec)',
        padding: '12px 24px',
        cursor: 'pointer',
        width: 'fit-content',
        margin: '0 auto',
        fontWeight: 700,
        color: 'var(--color)'
    }
    return (
        <Link to={'/room/' + peer?.id}>
            <div className="newRoom" style={style}>
                Create new room &nbsp;+
            </div>
        </Link>
    )
}

export default NewRoom;