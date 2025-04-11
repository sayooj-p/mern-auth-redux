import React from 'react'
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth'
import { app } from '../firbase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            console.log("could not sign in with google", error);  
        }
    }
  return (
   <button type='button' onClick={handleGoogleClick} className="bg-red-700 text-white cursor-pointer rounded-lg p-3 hover:opacity-95 uppercase"> 
   Continue with Google </button>
  )
}

export default OAuth
