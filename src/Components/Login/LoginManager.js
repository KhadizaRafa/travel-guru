import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const firebaseInitialize = () => {
    if(firebase.apps.length === 0)
     firebase.initializeApp(firebaseConfig)
}

export const createUserWithEmailAndPassword = (fname,lname,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response)
      updateUserName(fname,lname);
      return (true, '');  
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      return (false, errorMessage)
    });
  }

  export const updateUserName = (fname,lname) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: fname+' '+lname
     
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