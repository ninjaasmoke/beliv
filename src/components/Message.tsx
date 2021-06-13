import React from 'react';
import './Message.css';

interface MsgProps {
    msg: string,
    sender: string,
    sent: boolean
}

const Message: React.FC<MsgProps> = ({ msg, sender, sent }) => {
    return (
        <div className={sent ? "message sent" : "message"}>
            {!sent ? <span>{sender.split(' ')[0]}</span> : ""} {msg}
        </div>
    )
}

export default Message;