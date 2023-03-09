import React, {useState, useRef, useEffect} from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'

import { CreatePin, Login, Navbar, PinDetails, Search, Sidebar, UserProfile } from '../components'
import Pins from './Pins'

import { client } from '../client'
import logo from '../assets/logo.png'
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)  
  const scrollRef = useRef(null)

  const navigate = useNavigate()

  //fetch userinfo from localstorage
  const userInfo = fetchUser()

  //use info from localstorage to fetch user from database
  useEffect(() => {
    const query = userQuery(userInfo?.googleId)
  
    client.fetch(query)
      .then(data => {
        setUser(data[0])
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, [])
  
  
 !user && navigate('/login')
  return (
    <div className='home-container flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-in-out'>
      <header className="sidebar-container desktop-sidebar hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </header>
      <header className="sidebar-container flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <button 
            className='cursor-pointer' 
            onClick={() => setToggleSidebar(true)}
            aria-label='Open Sidebar'
            aria-expanded={toggleSidebar}
          >
            <HiMenu fontSize={40} />
          </button>
          <Link to={'/'}>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='Profile' className='w-10' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="mobile-sidebar fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <button className="absolute w-full flex justify-end items-center p-2 cursor-pointer"  onClick={() => setToggleSidebar(false)} aria-label='Close Sidebar'>
              <AiFillCloseCircle fontSize={30} />
            </button>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </header>
        <main className="main-container pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef} style={{marginTop:'.5rem'}}>
          <Routes>
            <Route path='/*' element={<Pins user={user && user} />} />
            <Route path='/user-profile/:userId' element={<UserProfile />} />
          </Routes>
        </main>
    </div>
  )
}

export default Home