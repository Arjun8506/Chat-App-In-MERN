import React from 'react'
import { GiHighFive } from "react-icons/gi";

function NoChatSelected() {
  return (
    <div className='text-white py-4 px-4'>
      <div className="noselected absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
        Welcome to <span className='text-center uppercase text-green-400 text-5xl mx-2'>chat-app <GiHighFive className='text-yellow-300 text-center' /></span>
      </div>
    </div>
  )
}

export default NoChatSelected