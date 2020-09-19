import React, { useContext, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Button } from "react-bootstrap";
import {firebaseInitialize, handleFacebookLogin, handleGoogleLogin,createUserWithEmailAndPassword} from "./LoginManager"
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false)

    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const [validationError,setValidationError] = useState('')
    const [userPassword, setUserPassword] = useState({
        password1: '',
        password2: ''
    });
    const [user,setUser] = useState({
        isSignedIn: false,
        firstName:'',
        lastName:'',
        name: '',
        email: '',
        password1: '',
        password2: '',
        photo: '',
        destination : ''
    })

    const handleBlurChange = (e) => {
        let isValid = true;
        if (e.target.name === 'email') {
          isValid = /\S+@\S+\.\S+/.test(e.target.value)? setValidationError(''):setValidationError('Please enter valid email address');
        }
        if (e.target.name === 'password1') {
          const validPasswordLength = e.target.value.length > 6 ? 
             setValidationError(''):setValidationError('Password length should not be less than 6 characters');
          const validPassValue = /\d{1}/.test(e.target.value)? 
            setValidationError(''):setValidationError('Please enter valid password');
          
           validPasswordLength && validPassValue? setUserPassword(e.target.value):setUserPassword('');
           
        }
        if(e.target.name === 'password2')
        {
            (userPassword!=null && userPassword === e.target.value)?
                isValid = true : isValid = false;
            
        }
        if (isValid) {
          let newUser = { ...user };
          newUser[e.target.name] = e.target.value;
          setUser(newUser);
    
        }
      }

    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.fname,user.lname,user.email,user.password)
        .then(response =>{
            // handleUserState(response);
            console.log(response)
        })
    }
    // if (!newUser && user.email && user.password) {
    //     signInWithEmailAndPassword(user.email,user.password)
    //     .then(response =>{
    //         handleUserState(response);
    //     })
    // }

  }
    
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
                {validationError && <p className="alert alert-danger m-3">{validationError}</p>}
                {
                    newUser?
                    <form className="p-3" onSubmit={handleSubmit}>
                        <p className="h5 mb-4">Create an account</p>
                        <div className="grey-text">
                            <MDBInput onBlur={handleBlurChange} label="First Name" group type="text"  name='firstName' required />
                            <MDBInput onBlur={handleBlurChange} label="Last Name" group type="text" name='lastName' required />
                            <MDBInput onBlur={handleBlurChange} label="Username or Email"  group type="email"  name='email' required />
                            <MDBInput onBlur={handleBlurChange} label="Password" group type="password" validate name='password1' required />
                            <MDBInput onBlur={handleBlurChange} label="Confirm Password" group type="password" validate name='password2' required />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" color="warning" className="w-100">Create an account</MDBBtn>
                        </div>
                        <p className="text-center">Already have an account? <strong className="text-warning" onClick={() => setNewUser(false)}>Login</strong></p>
                    </form>
                    :
                    <form className="p-3" onSubmit={handleSubmit}>
                        <p className="h5 mb-4">Login</p>
                        <div className="grey-text">
                            <MDBInput onBlur={handleBlurChange} label="Username or Email"  group type="email" name='email' required />
                            <MDBInput onBlur={handleBlurChange} label="Password" group type="password" name='password1' required />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" color="warning" className="w-100">Login</MDBBtn>
                        </div>
                        <p className="text-center">Don't have an account?
                        <strong className="login-tag text-warning" onClick={() => setNewUser(true)}>Create a new account</strong></p>
                    </form>
                }
                    <Button variant="outline-info" onClick={googleSignIn}>Login with Google</Button>
                    <Button variant="outline-info" onClick={facebookSignIn}>Login with Facebook</Button>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;