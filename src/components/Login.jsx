import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode"

import shareVideo from '../assets/share.mp4'
import logoWhite from '../assets/logoWhite.png'
import { client } from '../client'



const Login = () => {
    const navigate = useNavigate()

  return (
    <div className='login-container flex justify-start items-center flex-col h-screen'>
        <div className="relative w-full h-full">
            <video 
                src={shareVideo}
                typeof='video/mp4'
                loop
                autoPlay
                muted
                controls={false}
                className='w-full h-full object-cover'
            />
        </div>
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
            <div className="p-5">
                <img src={logoWhite} width='130px' alt='logo' />
            </div>

            <div className="shadow 2xl" id='loginBtn'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    //const {clientId} = credentialResponse
                    const {name, picture, email, jti} = jwt_decode(credentialResponse.credential)
                    //console.log(jwt_decode(credentialResponse.credential))
                    
                    localStorage.setItem('user', JSON.stringify({
                        googleId: jti,
                        userName: name,
                        userEmail: email,
                        userImage: picture,
                    }))

                    const doc = {
                        _id: jti,
                        _type: 'user',
                        userName: name,
                        image: picture
                    }

                    client.createIfNotExists(doc)
                        .then(() => {
                            navigate('/', {replace: true})
                        })
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            </div>
        </div>
    </div>
  )
}

export default Login