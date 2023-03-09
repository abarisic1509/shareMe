import React, { useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './containers/Home'
import { fetchUser } from './utils/fetchUser'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const User = fetchUser()

    if (!User) navigate('/login')
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="/*" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
