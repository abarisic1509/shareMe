import React from 'react'
import {ThreeCircles} from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='spinner-wrapper flex flex-col gap-5 justify-center items-center w-full height-full py-5'>
      <ThreeCircles color='#000000' height={50} width={200} />
      <p className='text-lg text-center px-2' >{message}</p>
    </div>
  )
}


export default Spinner