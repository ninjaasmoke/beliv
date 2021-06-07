import React from 'react'
import { Link } from 'react-router-dom'

const NewRoom: React.FC = () => {
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
        <Link to={'/room/roomID'}>
            <div className="newRoom" style={style}>
                Create new room &nbsp;+
            </div>
        </Link>
    )
}

export default NewRoom;