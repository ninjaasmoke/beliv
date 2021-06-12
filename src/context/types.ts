import Peer from "peerjs"

export type AuthProps = {
    userData: UserData,
    addUser: (userData: UserData) => void,
    logoutUser: () => void

}

export type UserData = {
    email: string,
    familyName: string,
    givenName: string,
    googleId: string,
    imageUrl: string,
    name: string
}

export type PeerProp = {
    peer: Peer | null;
    peerConnection: Peer.DataConnection | null;
    setPeerConnection: React.Dispatch<React.SetStateAction<Peer.DataConnection | null>> | null,
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>> | null;
}
