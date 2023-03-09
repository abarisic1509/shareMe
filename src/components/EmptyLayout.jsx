import React from 'react'
import { Link } from 'react-router-dom'

const EmptyLayout = () => {
  return (
    <div className='no-results-container flex flex-col items-center justify-center gap-10 p-10'>
        <h1 className='text-4xl text-bold'>No pins yet</h1>
        <p>Click button below and create one</p>
        <Link 
            to='/create-pin'
            className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
        >
            Create pin
        </Link>
    </div>
  )
}

export default EmptyLayout