import React from 'react';
import './Spinner.css';

interface Props {
    show: boolean
}
export const Spinner: React.FC<Props> = ({ show }) => {
    return (
        <div className="spinner" style={{ display: show ? 'block' : 'none' }}></div>
    )
}