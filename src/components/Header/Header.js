import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { UserContext } from '../../App'


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    let loginButtonToggle;
    if (loggedInUser.name === undefined) {
        loginButtonToggle =
            <Link className="nav-link nav-login-btn" to="/login/existing" tabIndex="-1" aria-disabled="true">Login</Link>
    }
    else {
        loginButtonToggle =
            <a className="nav-link userName" href="#">{loggedInUser.name}</a>
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light header-bg py-2 mt-2">
                <div className="container">
                    <Link className="navbar-brand travelsphere" to="/">Travelsphere</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                            <Link className="nav-link" to={`/destination/by_car`}>Destination</Link>
                            <a className="nav-link" href="#">Blog</a>
                            <a className="nav-link" href="#">Contact</a>
                            {
                                loginButtonToggle
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;