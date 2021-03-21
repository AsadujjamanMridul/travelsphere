import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../Header/Header';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App'

const Login = () => {

    const { user } = useParams();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email } = result.user;
                const newLoggedInUser = { name: displayName, email };
                setLoggedInUser(newLoggedInUser);
                history.replace(from);

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }


    const { register, handleSubmit, watch, errors } = useForm();

    const onSignIn = data => {
        const { name, email, password, confirmPassword } = data;
        if (password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const { email } = user;

                    user.updateProfile({
                        displayName: name
                    }).then(function () {
                        const newLoggedInUser = { name, email };
                        setLoggedInUser(newLoggedInUser);
                        history.replace(from);
                    }).catch(function (error) {
                        alert(error);
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
        else {
            alert(`Passwords didn't match`);
        }
    }

    const onLogIn = data => {
        const { email, password } = data;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const { displayName, email } = user;
                const newLoggedInUser = { name: displayName, email };
                setLoggedInUser(newLoggedInUser);
                history.replace(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);
            });
    }

    let form = "";
    if (user === 'new') {
        form = <form className='login-form' onSubmit={handleSubmit(onSignIn)} >
            <h4 className="login-title">Create an account</h4>

            < input className='input' name="name" ref={register({ required: true })} placeholder="Name" />
            {errors.name && <span className='error'>Name is required</span>}

            < input className='input' name="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && <span className='error'>Email is required</span>}

            < input className='input' type='password' name="password" ref={register({ required: true })} placeholder="Passowrd" />
            {errors.password && <span className='error'>Password is required</span>}

            < input className='input' type='password' name="confirmPassword" ref={register({ required: true })} placeholder="Confirm passowrd" />
            {errors.confirmPassword && <span className='error'>This field is required</span>}

            <input className='submit-button' type="submit" value="Create an account" />

            <p className='text-center mt-2'><small>Already have an account?  <Link to='/login/existing' className='create-acc-link'>Login</Link></small></p>
        </form>
    }
    if (user === 'existing') {
        form = <form className='login-form' onSubmit={handleSubmit(onLogIn)} >
            <h4 className="login-title">Login</h4>
            < input className='input' name="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && <span className='error'>Email is required</span>}
            < input className='input' type='password' name="password" ref={register({ required: true })} placeholder="Passowrd" />
            {errors.password && <span className='error'>Password is required</span>}
            <input className='submit-button' type="submit" value="Login" />
            <p className='text-center mt-2'><small>Don't have an account?  <Link to='/login/new' className='create-acc-link'>Create a new one</Link></small></p>
        </form>
    }

    return (
        <div>
            <Header />
            <main className='home-bg d-flex justify-content-center align-items-center'>
                <div className="container d-flex justify-content-center align-items-center">
                    <div>
                        {form}
                        <div className='d-flex py-3'>
                            <hr className='container-fluid mr-3' />or<hr className='container-fluid ml-3' />
                        </div>
                        <div className="d-flex justify-content-center">
                            <div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={handleGoogleSignIn} className="btn login-with-google my-2"><FontAwesomeIcon icon={faGoogle} className='mr-3' />Continue with google</button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn login-with-fb"><FontAwesomeIcon icon={faFacebookF} className='mr-3' />Continue with facebook</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;