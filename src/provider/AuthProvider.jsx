import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, {   useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../firebase/firebase.config';





const AuthProvider = ({children}) => {
    
    const provider = new GoogleAuthProvider();
    const [user,setUser]= useState(null);
    const [loading,setLoading] = useState(true);
  
    useEffect(()=>{
      const unSubscribe =  onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            // console.log('Current User:',currentUser);
            setLoading(false);
            
        });
        return ()=> unSubscribe()
    },[]);
    


  
   

    // create a new user
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    // Sign in a user 
    const signInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    // Sign in with Google


    const loginWithGoogle = ()=>{
        return signInWithPopup(auth,provider);
    }



    // Update Profile

    const updateUserProfile = (updateData)=>{
        return updateProfile(auth.currentUser,updateData);
    }
    
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth,email);

    }

    // Sign Out user
    const signOutUser = ()=>{
      return signOut(auth);
    }




    const authData = {
        user,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        loginWithGoogle,
        resetPassword,
        loading

    }

    return  <AuthContext value={authData}>{children}</AuthContext>


};

export default AuthProvider;