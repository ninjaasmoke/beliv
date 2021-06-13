import React from 'react'
import CenterSpinner from '../components/CenterSpinner'
import JoinRoom from '../components/JoinRoom'
import Nav from '../components/Nav'
import NewRoom from '../components/NewRoom'
import { usePeerContext } from '../context/PeerContext'

interface Props { }

const Home: React.FC<Props> = () => {
    const { peer } = usePeerContext();
    return (
        <div>
            <Nav />
            <main className="container" >
                {
                    !peer
                        ? <CenterSpinner msg="Starting to beliv" />
                        : <>
                            <NewRoom />
                            <JoinRoom />
                        </>
                }
            </main>
        </div>
    )
}

export default Home;