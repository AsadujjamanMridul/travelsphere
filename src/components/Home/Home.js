import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css'
import data from '../../data/data.json'
import Transport from '../Transport/Transport';

const Home = () => {

    const [transports, setTransports] = useState([]);
    useEffect(() => {
        setTransports(data);
    }, [])

    return (
        <div>
            <Header/>
            <main className='home-bg d-flex justify-content-center align-items-center'>
                <div className="container">
                    <div className="player-info-container row m-0 pb-5">
                        {
                            transports.map(transport => <Transport transport={transport} key={transport.name}></Transport>)
                        }
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;