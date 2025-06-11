import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, {   useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../firebase/firebase.config';
import axios from 'axios';





const AuthProvider = ({children}) => {
    
    const provider = new GoogleAuthProvider();
    const [user,setUser]= useState(null);
    const [loading,setLoading] = useState(true);
  
//     useEffect(()=>{
//       const unSubscribe =  onAuthStateChanged(auth,(currentUser)=>{
//             setUser(currentUser);
//             // console.log('Current User:',currentUser);
//             if (currentUser?.email) {
//             setLoading(false);
//             const userData = {
//                email: currentUser?.email,
//                role: 'user'
//            };

//            axios.post('http://localhost:3000/jwt', userData)
//           .then(res => {
//     const token = res.data.token;
//     localStorage.setItem('token', token);
//   })

//   .catch(err => {
//     console.error('JWT request failed:', err);
//   });
            
//         });
//         return ()=> unSubscribe()
//     },[]);
    


  
   

    // create a new user
   
   useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser?.email) {
      const userData = {
        email: currentUser?.email,
        role: 'user'
      };

      try {
        const res = await axios.post('http://localhost:3000/jwt', userData,{
            withCredentials: true
        });
        localStorage.setItem('token', res.data.token);
      } catch (err) {
        console.error('JWT request failed:', err);
      } finally {
        setLoading(false);
      }
    } else {
      localStorage.removeItem('token'); 
      setLoading(false);
    }
  });

  return () => unSubscribe();
}, []);

   
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