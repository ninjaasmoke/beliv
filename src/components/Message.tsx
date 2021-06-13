import React from 'react';
import './Message.css';

interface MsgProps {
    msg: string,
    sender: string,
    sent: boolean,
    type: string
}

const Message: React.FC<MsgProps> = ({ msg, sender, sent, type }) => {
    return (
        <>
            {type
                ? <div className="joinMessage">{sent ? "You joined!" : msg}</div>
                : <div className={sent ? "message sent" : "message"}>
                    {!sent ? <span>{sender.split(' ')[0]}</span> : ""} {msg}
                </div>
            }
        </>
    )
}

export default Message;