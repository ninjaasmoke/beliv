import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { getCookie } from '../helper/cookies';
import { usePeerContext } from '../context/PeerContext';
import Message from '../components/Message';
import CenterSpinner from '../components/CenterSpinner';
import '../styles/Room.css';

import copy from '../assets/images/copy.svg';
import share from '../assets/images/share.svg';
import send from '../assets/images/send_btn.png';
import fs from '../assets/images/fullscreen.svg';

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
        if (lastTop) {
            // document.getElementById('messages')?.scrollTo(0, (lastTop + 40));
            document.getElementById('lastMsg')?.scrollIntoView()
        }
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
                const event = `${userData.name.split(' ')[0]} connected!`;
                const m = { text: event, sender: userData.name, senderID: userData.googleId, senderImg: userData.imageUrl, type: 'joinMessage' }
                console.log(event);
                conn?.send({ message: m, type: 'message' });
                setMessages && setMessages((msgs: any) => [...msgs, { ...m, sent: true }]);

            }
        }, 2000);
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const keyListen = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "Enter" && input.current?.value) {
            sendChat();
        }
        else if (e.ctrlKey && e.key === "i") {
            toggleFullScreen();
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keyListen);
        return () => {
            document.removeEventListener('keydown', keyListen);
        }
    }, [keyListen])

    useEffect(() => {
        if (peer && roomID !== peer.id) { connect(roomID); }
        else { setConnecting(false); }
    }, [])


    return (
        <>
            {
                connecting
                    ? <CenterSpinner msg="Connecting" />
                    : <div className="room">
                        <div className="roomMain">
                            {/* <video src=""></video> */}
                            {/* <iframe width="100%"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe> */}
                            <img src={fs} className="fullScreenToggle" alt="Fullscreen Toggle" onClick={toggleFullScreen} />
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
                                })}>Share roomID with your friend. <img className="optIcon" src={share} alt="Share" /> </span>
                            </div>
                            <hr className="roomHR" />
                            <div className="header">
                                <img className="headerImg" src={userData.imageUrl} alt="" />
                                <div className="headerName">{userData.name}</div>
                            </div>
                            <hr className="roomHR" />
                            <div className="chatting">
                                <div className="messages" id="messages">
                                    {
                                        messages &&
                                        messages.map((msg, msgIdx) => <Message msg={msg.text} sender={msg.sender} sent={msg.sent} key={msgIdx} type={msg.type ?? ""} />)
                                    }
                                    <div className="lastMsg" />
                                    <div id="lastMsg" />
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