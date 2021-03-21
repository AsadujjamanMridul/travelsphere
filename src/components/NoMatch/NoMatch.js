import React from 'react';
import Header from '../Header/Header';
import './NoMatch.css'

const NoMatch = () => {
    return (
        <div >
            <Header />
            <div className="home-bg d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="not-found-code text-center">404 Error</h1>
                    <br />
                    <h1 className="not-found-msg text-center">Oops! The Page you're looking for, doesn't exist!</h1>
                </div>
            </div>

        </div>
    );
};

export default NoMatch;