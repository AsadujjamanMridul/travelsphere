import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css'

const Transport = (props) => {

    const { name, image } = props.transport;
    return (

        <div className="col-md-6 col-lg-3 my-3">
            <Link to={`/destination/by_${name.toLowerCase()}`}>
                <div className="card shadow-sm transport-card">
                    <img src={image} className="card-img-top w-50 m-auto py-5" alt="..." />
                    <div className="card-body card-bg">
                        <h5 className="card-title text-center transport-name">{name}</h5>
                    </div>
                </div>
            </Link>
        </div >

    );
};

export default Transport;