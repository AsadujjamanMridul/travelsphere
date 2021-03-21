import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import data from '../../data/data.json'
import Header from '../Header/Header';
import './Destination.css'
import map from '../../images/map.png'

const Destination = () => {

    const { transport } = useParams();

    const [transports, setTransports] = useState([]);
    useEffect(() => {
        setTransports(data);
    }, [])

    const transportDetail = {
        name: '',
        image: '',
        onePerson: '',
        twoPersons: '',
        threePersons: ''
    };

    const travarseTransports = transports.find((trnsprt) => {
        if (trnsprt.name.toLowerCase() == transport) {
            transportDetail.name = trnsprt.name;
            transportDetail.image = trnsprt.image;
            transportDetail.onePerson = trnsprt.onePerson;
            transportDetail.twoPersons = trnsprt.twoPersons;
            transportDetail.threePersons = trnsprt.threePersons;
        }
    })

    const [travelDetails, setTravelDetails] = useState({
        pickFrom: '',
        isValid: false,
        destination: ''
    })

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        const { pickFrom, destination } = data;
        const newTraveDetail = {
            pickFrom: pickFrom,
            destination: destination,
            isValid: true
        }
        setTravelDetails(newTraveDetail);
    }


    return (
        <div>
            <Header />
            <div className="hr-bg py-3 container">
                <hr />
            </div>
            <main className='home-bg d-flex justify-content-center'>
                <div className="container row">
                    <div className="m-auto col-md-3 my-3 select-destination">
                        {!travelDetails.isValid &&
                            <form className='destination-form' onSubmit={handleSubmit(onSubmit)} >

                                < input className='input container-fluid' name="pickFrom" ref={register({ required: true })} placeholder="Pick From" />
                                {errors.pickFrom && <span className='error'>This field is required</span>}

                                < input className='input container-fluid' name="destination" ref={register({ required: true })} placeholder="Destination" />
                                {errors.destination && <span className='error'>This field is required</span>}
                                <input className='container-fluid  submit-button' type="submit" value="Search" />
                            </form>}
                        {travelDetails.isValid &&
                            <div>
                                <div className="py-3">
                                    <div className="container-fluid destination-detail">
                                        <h5>From: {travelDetails.pickFrom}</h5>
                                        <h5>To: {travelDetails.destination}</h5>
                                    </div>
                                    <div className="container-fluid d-flex align-items-center justify-content-between">
                                        <img src={transportDetail.image} alt="..." className="w-25 my-3" />
                                        <p>{transportDetail.name}</p>
                                        <p><FontAwesomeIcon icon={faUser} className='mr-2' />1</p>
                                        <p className='text-right'>${transportDetail.onePerson}</p>
                                    </div>
                                    <div className="container-fluid d-flex align-items-center justify-content-between">
                                        <img src={transportDetail.image} alt="..." className="w-25 my-3" />
                                        <p>{transportDetail.name}</p>
                                        <p><FontAwesomeIcon icon={faUserFriends} className='mr-2' />2</p>
                                        <p className='text-right'>${transportDetail.twoPersons}</p>
                                    </div>
                                    <div className="container-fluid d-flex align-items-center justify-content-between">
                                        <img src={transportDetail.image} alt="..." className="w-25 my-3" />
                                        <p>{transportDetail.name}</p>
                                        <p><FontAwesomeIcon icon={faUsers} className='mr-2' />3</p>
                                        <p className='text-right'>${transportDetail.threePersons}</p>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className="m-auto col-md-8">
                        <img src={map} alt="" className="w-100 my-3"/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Destination;