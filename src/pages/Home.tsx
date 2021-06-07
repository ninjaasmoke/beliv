import React from 'react'
import Nav from '../components/Nav'

interface Props { }

const Home: React.FC<Props> = () => {
    return (
        <div>
            <Nav />
            <main className="container" ></main>
        </div>
    )
}

export default Home;