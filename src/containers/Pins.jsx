import React, { useState } from 'react'
import { Routes,Route, useParams } from 'react-router-dom'
import { client } from '../client'

import { Navbar, PinDetails, CreatePin, Search, MasonryLayout, Spinner, Feed } from '../components'
//import { feedQuery } from '../utils/data'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='pins-container px-2 md:px-5' >
      <div className="navbar-container bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>
      <div className="h-full content-conteiner">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-details/:pinId" element={<PinDetails user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins