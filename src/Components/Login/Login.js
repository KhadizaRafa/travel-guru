import React, { useContext, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { firebaseInitialize, handleFacebookLogin, handleGoogleLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager"
import { UserContext } from "../../App";
import facebook from '../../resources/Icon/fb.png'
import google from '../../resources/Icon/google.png'
import { useHistory, useLocation } from "react-router-dom";
import './Login.css'

const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [existingUser, setExistingUser] = useState(true)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [validationError, setValidationError] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [dummyUser, setDummyUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        destination: '',
        success: '',
        error: ''
    })

    const setDummyUserValue = (targetField, value) => {
        let dUser = { ...dummyUser }
        dUser[targetField] = value;
        setDummyUser(dUser)
    }

    const handleBlurChange = (e) => {
        if (e.target.name === 'fname' || e.target.name === 'lname') {
           setIsValid(true);
        }
        if (e.target.name === 'email') {
            const validEmail =  /\S+@\S+\.\S+/.test(e.target.value);
            if (validEmail) {
                setIsValid(true);
                setValidationError('')
            }
            else {
                setIsValid(false)
                setValidationError('Please enter valid email address');
            }
        }
        //password
        else if (e.target.name === 'password1') {
            const validPasswordLength = e.target.value.length > 6;
            if (validPasswordLength) {
                setValidationError('')
            }
            else {
                setValidationError('Password length should not be less than 6 characters');
                setIsValid(false)
            }

            if (validPasswordLength) {
                const validPassValue = /\d{1}/.test(e.target.value);
                validPassValue ? setValidationError('') : setValidationError('Please enter valid password');

                setIsValid(validPasswordLength && validPassValue);

            }
        }
        else if (e.target.name === 'password2') {
            if (dummyUser.password1 === e.target.value) {
                setValidationError('');
            }
            else {
                setIsValid(false);
                setValidationError('Password did not match');
            }
        }

        if (isValid) {
            setDummyUserValue(e.target.name, e.target.value)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!existingUser && dummyUser.email && dummyUser.password1) {
            createUserWithEmailAndPassword(dummyUser)
                .then(response => {
                    setUser(response);
                    if (response.isSignedIn) {
                        setLoggedInUser(response);
                        history.replace(from);
                    }
                })
        }
        if (existingUser && dummyUser.email && dummyUser.password1) {
            signInWithEmailAndPassword(dummyUser)
                .then(response => {
                    setUser(response);
                    if (response.isSignedIn) {
                        setLoggedInUser(response);
                        history.replace(from);
                    }
                })
        }

    }

    firebaseInitialize();

    const setUserInfoAndRedirect = (response) => {
        setUser(response);
        setLoggedInUser(response);
        history.replace(from);
    }

    const googleSignIn = () => {
        handleGoogleLogin()
            .then(response => {
                setUserInfoAndRedirect(response);
            })
    }

    const facebookSignIn = () => {
        handleFacebookLogin()
            .then(response => {
                setUserInfoAndRedirect(response);
            })
    }

    return (
        <MDBContainer>
            <MDBRow className="justify-content-md-center">
                <MDBCol md="5" className='userContainer'>
                    {validationError && <p className="alert alert-danger m-3">{validationError}</p>}
                    {
                        user.success && <p style={{ color: "green" }} className="alert alert-danger m-3" > User successfully {!existingUser ? 'created' : 'Logged In'}</p>
                    }
                    {
                        user.error && <p style={{ color: "red" }} className="alert alert-danger m-3">{user.error}</p>
                    }
                    <form className="p-3" onSubmit={handleSubmit}>
                        {!existingUser ? <p className="h5 mb-4">Create an account</p> : <p className="h5 mb-4">Login</p>}
                        <div className="grey-text">
                            {
                                !existingUser && <MDBInput onBlur={handleBlurChange} label="First Name" name='fname' group type="text" required />
                            }
                            {
                                !existingUser && <MDBInput onBlur={handleBlurChange} label="Last Name" name='lname' group type="text" required />
                            }
                            <MDBInput onBlur={handleBlurChange} label="Username or Email" name='email' group type="email" required />
                            <MDBInput onBlur={handleBlurChange} label="Password" name='password1' group type="password" validate required />
                            {
                                (!existingUser) && <MDBInput onBlur={handleBlurChange} label="Confirm Password" name='password2' group type="password" validate required />
                            }
                        </div>
                        {

                            <div className="text-center">
                                <MDBBtn type="submit" color="warning" className="w-100">{!existingUser ? 'Create an account' : 'Login'}</MDBBtn >
                                {
                                    !existingUser ?
                                        <small>Already have an account? <strong className="text-warning loginOrRegisterText" onClick={() => setExistingUser(true)}> Login</strong></small> :

                                        <small>Don't have an account?<strong className="text-warning loginOrRegisterText" onClick={() => setExistingUser(false)}> Create a new account</strong></small>
                                }
                            </div>
                        }

                    </form>
                </MDBCol>
            </MDBRow>
            <div className="d-flex justify-content-center">
                <div className="d-flex mt-3 col-md-6">
                    <hr className="w-50 mr-2" />Or<hr className="w-50 ml-2" />
                </div>
            </div>
            <div>
                <button className="social-icon" onClick={googleSignIn}>
                    <div className="d-flex">
                        <img src={google} className="logo-img"></img>
                        <p className="social-text col-md-10">Continue with Google</p>
                    </div>
                </button>
                <br></br>
                <button className="social-icon" onClick={facebookSignIn}>
                    <div className="d-flex">
                        <img src={facebook} className="logo-img"></img>
                        <p className="social-text col-md-10">Continue with Facebook</p>
                    </div>
                </button>
            </div>


        </MDBContainer>
    );
};

export default Login;