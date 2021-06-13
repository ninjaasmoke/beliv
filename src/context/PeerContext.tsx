import { nanoid } from 'nanoid';
import Peer from 'peerjs';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { PeerProp } from './types';

const defaultPeerVal: PeerProp = {
    peer: null,
    peerConnection: null,
    peerConnOpen: false,
    setPeerConnection: null,
    messages: [],
    setMessages: null,
    joiners: [],
    setJoiners: null,
}

const PeerContext = createContext<PeerProp>(defaultPeerVal);

export default function PeerProvider({ children }: { children: any }) {
    const { userData } = useAuthContext();
    const [peer, setPeer] = useState<Peer | null>(null);
    const [peerConnOpen, setPeerConnOpen] = useState(false);

    const [peerConnection, setPeerConnection] = useState<Peer.DataConnection | null>(null);

    const [messages, setMessages] = useState<any[]>([]);
    const [joiners, setJoiners] = useState<any[]>([]);

    const data = (data: any) => {
        console.log(data);
        if (data.type === "message") {
            setMessages && setMessages((m: any) => [...m, data[data.type]]);
        } else if (data.type === "meta") {

        }
    }
    const error = (err: any) => {
        console.error(err);
        setPeerConnOpen(false);
    }
    const close = () => {
        setPeerConnOpen(false);
        setMessages([]);
        console.log("Closed peerConnection");
    }
    const open = () => {
        setPeerConnOpen(true);
        console.log("Opened peerConnection")
    }
    useEffect(() => {
        if (peerConnection) {
            peerConnection.on('data', data);
            peerConnection.on('error', error);
            peerConnection.on('close', close);
            peerConnection.on('open', open);
        }
    }, [peerConnection]);

    useEffect(() => {
        const peer = new Peer(nanoid(6));

        const open = (id: string) => {
            console.log(id);
            setPeer(peer);
            setPeerConnOpen(true);
        };
        const err = (err: any) => {
            setPeerConnOpen(false);
            if (err.type === "unavailable-id") {
                window.location.reload();
            }
        };
        const connection = (conn: Peer.DataConnection) => {
            console.log(conn.peer, " Has connected!");
            setPeerConnection(conn);
        };
        peer.on("open", open);
        peer.on("error", err);
        peer.on("connection", connection);
    }, []);

    return (
        <PeerContext.Provider value={{
            peer,
            peerConnOpen,
            peerConnection,
            setPeerConnection,
            messages,
            setMessages,
            joiners,
            setJoiners
        }} >
            {children}
        </PeerContext.Provider>
    )
}

export function usePeerContext() {
    return useContext(PeerContext);
}