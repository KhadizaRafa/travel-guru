import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const firebaseInitialize = () => {
    if(firebase.apps.length === 0)
     firebase.initializeApp(firebaseConfig)
}

export const createUserWithEmailAndPassword = (user) =>{
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password1)
    .then(response => {
      updateUserName(user.fname,user.lname);
      const singedInUser = {
            isSignedIn: true,
            name : user.name,
            email: user.email,
            password : user.password1,
            success: true,
            error:''
        }
    return singedInUser;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      const singedInUser = {
        isSignedIn: false,
        name : user.name,
        email: user.email,
        password : user.password1,
        success: false,
        error: errorMessage
    }
     return singedInUser;
    });
  }

export const signInWithEmailAndPassword = (user)=>{
    return firebase.auth().signInWithEmailAndPassword(user.email,user.password1)
    .then((response) => {
          const {email} = response.user
          const singedInUser = {
                isSignedIn: true,
                email: email,
                success: true,
                error:''
            }
        return singedInUser;
    })
    .catch(function (error) {
      var errorMessage = error.message;
      const singedInUser = {
                isSignedIn: false,
                email: user.email,
                success: false,
                error:errorMessage
            }
      return singedInUser;
    });
  }

  export const updateUserName = (fname,lname) => {
    var user = firebase.auth().currentUser;
    const userName = fname + ' ' + lname
    user.updateProfile({
      displayName: userName
    }).then(function () {
      console.log('User updated successfully')
    }).catch(function (error) {
      console.log(error)
    });
  }

export const handleGoogleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(response =>{
          
            const {displayName,photoURL,email} = response.user
            const singedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return singedInUser;
            
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage)
            var email = error.email;
            console.log(email)
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential)
            // ...
        });
}

export const handleFacebookLogin = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
        .then(response =>{
           const {displayName,email,photoURL} = response.user;
           const singedInUser = {
               isSignedIn: true,
               name : displayName,
               email : email,
               photo : photoURL,
               
           }
        return singedInUser;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

