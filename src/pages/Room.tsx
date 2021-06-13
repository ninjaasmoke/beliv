import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { getCookie } from '../helper/cookies';
import '../styles/Room.css';

import copy from '../assets/images/copy.svg';
import share from '../assets/images/share.svg';
import send from '../assets/images/send_btn.png';
import { usePeerContext } from '../context/PeerContext';
import Message from '../components/Message';
import CenterSpinner from '../components/CenterSpinner';

interface RoomParams {
    roomID: string
}

const Room: React.FC<RouteComponentProps<RoomParams>> = ({ match }) => {

    const [connecting, setConnecting] = useState(true);

    const { roomID } = match.params;
    const { userData } = useAuthContext();
    const { messages, setMessages, peerConnection, peerConnOpen, peer, setPeerConnection } = usePeerContext();

    const input = useRef<HTMLTextAreaElement>(null);

    const sendChat = () => {
        const msg = input.current?.value;
        // .replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''); // To replace emoji
        const m = { text: msg, sender: userData.name, senderID: userData.googleId, senderImg: userData.imageUrl }
        if (msg && peerConnection && peerConnOpen) {
            peerConnection.send({ message: m, type: 'message' });
            setMessages && setMessages((msgs: any) => [...msgs, { ...m, sent: true }]);
            input.current?.value && (input.current.value = "");
            msgAcitvity();
        }
    }

    const msgAcitvity = () => {
        const lastTop = document.getElementById('lastMsg')?.offsetTop;
        if (lastTop)
            document.getElementById('messages')?.scrollTo(0, lastTop);
        document.getElementById('sendChat')?.focus();
    }

    const connect = (roomID: string) => {
        setConnecting(true);
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
                setConnecting(false);
            }
        }, 2000);
    }

    useEffect(() => {
        if (getCookie('email') === '') window.location.replace('/login')
    }, [userData])

    useEffect(() => {
        connect(roomID);
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === "Enter" && input.current?.value) {
                sendChat();
            }
        })
    }, [])

    return (
        <>
            {
                connecting
                    ? <CenterSpinner />
                    : <div className="room">
                        <div className="roomMain">
                            {/* <video src=""></video> */}
                            {/* <iframe width="100%"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe> */}
                        </div>
                        <div className="roomSideBar">
                            <div className="copy">
                                <h5>Copy Room ID</h5>
                                <div>
                                    <span>{roomID}</span>
                                    <button onClick={() => { navigator.clipboard.writeText(roomID) }} title="Copy Room ID">
                                        <img className="optIcon" src={copy} alt="Copy" />
                                    </button>
                                </div>
                                <hr />
                                <span onClick={() => navigator.share({
                                    url: window.location.href,
                                    title: 'Join my beliv room',
                                    text: roomID
                                })}>Share roomID with your friends. <img className="optIcon" src={share} alt="Share" /> </span>
                            </div>
                            <div className="header">
                                <img className="headerImg" src={userData.imageUrl} alt="" />
                                <div className="headerName">{userData.name}</div>
                            </div>
                            <div className="chatting">
                                <div className="messages" id="messages">
                                    {
                                        messages.map((msg, msgIdx) => <Message msg={msg.text} sender={msg.sender} sent={msg.sent} key={msgIdx} />)
                                    }
                                    <div className="lastMsg" id="lastMsg" />
                                </div>
                                <div className="chatTextArea">
                                    <textarea ref={input} name="sendChat" id="sendChat" rows={1} placeholder="Type a message..."></textarea>
                                    <button className="sndBtn" onClick={sendChat}><img src={send} alt="Send Button" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Room;