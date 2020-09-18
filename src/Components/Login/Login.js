import React, { useContext, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Button } from "react-bootstrap";
import {firebaseInitialize, handleFacebookLogin, handleGoogleLogin} from "./LoginManager"
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const [user,setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        destination : '',
        error: '',
        success: ''
    })

    firebaseInitialize();

    const setUserInfoAndRedirect = (response)=>{
        setUser(response);
        setLoggedInUser(response);
        history.replace(from);
    }

    const googleSignIn = ()=>{
        handleGoogleLogin()
         .then(response =>{
            setUserInfoAndRedirect(response);
         })   
    }

    const facebookSignIn = ()=>{
        handleFacebookLogin()
         .then(response =>{
            setUserInfoAndRedirect(response);
         })
    }

    return (
        <MDBContainer>
            <MDBRow className="justify-content-md-center">
                <MDBCol md="6" style={{border: '1px solid black'}}>
                    <form className="p-3">
                        <p className="h5 mb-4">Create an account</p>
                        <div className="grey-text">
                            <MDBInput label="First Name" group type="text" validate error="wrong"
                                success="right" />
                            <MDBInput label="Last Name" group type="text" validate error="wrong"
                                success="right" />
                            <MDBInput label="Username or Email"  group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Password" group type="password" validate />
                            <MDBInput label="Confirm Password" group type="password" validate />
                        </div>
                        <div className="text-center">
                            <MDBBtn color="warning" className="w-100">Create an account</MDBBtn>
                        </div>
                        <p className="text-center">Already have an account? <span className="text-warning">Login</span></p>
                    </form>
                    <Button variant="outline-info" onClick={googleSignIn}>Login with Google</Button>
                    <Button variant="outline-info" onClick={facebookSignIn}>Login with Facebook</Button>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;