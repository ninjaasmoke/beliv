import React from 'react'
import Nav from '../components/Nav'
import NewRoom from '../components/NewRoom'

interface Props { }

const Home: React.FC<Props> = () => {
    return (
        <div>
            <Nav />
            <main className="container" >
                <NewRoom />
            </main>
        </div>
    )
}

export default Home;