import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import axios from 'axios';

const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const[user,setUser] =useState(null);
    const[loader,setLoader] = useState(true);
    const[error,setError] = useState('');

    const auth = getAuth(app);

    //SignipNewUser
    const signUP = async (email,password) => {
        try
        {
            setLoader(true);
            return await createUserWithEmailAndPassword(auth, email, password)
        }
    catch (error){
        setError(error.code)
        throw error;
    }
}

//login user
const login = async (email,password) => {
    try{
        setLoader(true) 
        return await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        setError(error.code);
        throw error;
    }
}

//logout user
const logout = async () => {
    try{
        return await signOut(auth)
    }catch(error){
        setError(error.code);
        throw error;
    }
}

//update user profile
const updateUser = async (name,photo) => {
    try{
        await updateProfile(auth.currentUser, {
            displayName: name , photoURL: photo
        })
            setUser(auth.currentUser)

    }catch(error){
        setError(error.code);
        throw error;
}
}

// Google Login 
const googleProvider = new GoogleAuthProvider();
const googleLogin = async () =>
{
   try{
    setLoader(true)
    return await signInWithPopup(auth, googleProvider)
   }
   catch(error){
    setError(error.code);
    throw error;
}
}


//Observer for Usera
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) =>
    {
        setUser(user)
        if(user) {
            axios.post('http://localhost:5000/api/set-token',{email: user.email, name: user.displayName})
                 .then((data) => {
                if(data.data.token) {
                    /* console.log(data.data) */
                    localStorage.setItem('token', data.data.token);
                    setLoader(false)
                }
            })
        }
        else{
            localStorage.removeItem('token');
            setLoader(false)
        }
    })

    return () => unsubscribe()
},[])

    const contextValu = {user, signUP,login, logout,updateUser,googleLogin,error,setError,loader,setLoader}
  return (
    <AuthContext.Provider value={contextValu}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }