import React from 'react'
import JoinRoom from '../components/JoinRoom'
import Nav from '../components/Nav'
import NewRoom from '../components/NewRoom'

interface Props { }

const Home: React.FC<Props> = () => {
    return (
        <div>
            <Nav />
            <main className="container" >
                <NewRoom />
                <JoinRoom />
            </main>
        </div>
    )
}

export default Home;