import { nanoid } from 'nanoid';
import Peer from 'peerjs';
import { createContext, useContext, useState, useEffect } from 'react';
import { PeerProp } from './types';

const defaultPeerVal: PeerProp = {
    peer: null,
    peerConnection: null,
    setPeerConnection: null,
    messages: [],
    setMessages: null
}

const PeerContext = createContext<PeerProp>(defaultPeerVal);

export default function PeerProvider({ children }: { children: any }) {
    const [peer, setPeer] = useState<Peer | null>(null);

    const [peerConnection, setPeerConnection] = useState<Peer.DataConnection | null>(null);

    const [messages, setMessages] = useState<String[]>([]);

    useEffect(() => {
        const data = (data: any) => {
            console.log(data);
            if (data.type === "message") {
                setMessages && setMessages((m: any) => [...m, data[data.type]]);
            }
            // else if (data.type === "event") {
            //     if (data.event === "messages")
            // }
        }
        const error = (err: any) => {
            console.error(err);
        }
        const close = () => {
            console.log("Closed peer");
        }
        if (peerConnection) {
            peerConnection.on('data', data);
            peerConnection.on('error', error);
            peerConnection.on('close', close);
        }
    }, [peerConnection]);

    useEffect(() => {
        const peer = new Peer(nanoid(6));

        const open = (id: string) => {
            console.log(id);
            setPeer(peer);
        };
        const err = (err: any) => {
            if (err.type === "unavailable-id") {
                window.location.reload();
            }
        };
        const connection = (conn: Peer.DataConnection) => {
            console.log("Getting connection from: ", conn.peer);
            setPeerConnection(conn);
        };
        peer.on("open", open);
        peer.on("error", err);
        peer.on("connection", connection);
    }, []);

    return (
        <PeerContext.Provider value={{
            peer,
            peerConnection,
            setPeerConnection,
            messages,
            setMessages
        }} >
            {children}
        </PeerContext.Provider>
    )
}

export function usePeerContext() {
    return useContext(PeerContext);
}