import React from 'react';
import './CenterSpinner.css';

const CenterSpinner: React.FC<{ msg: string }> = ({ msg }) => {
    return (
        <div className="spinWrapper">
            {msg}
            <div className="centerSpinner"></div>
        </div>
    )
}

export default CenterSpinner;