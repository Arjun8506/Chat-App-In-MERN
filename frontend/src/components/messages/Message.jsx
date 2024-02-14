import React from 'react'

function Message() {
  return (
    <div className='chat chat-end'>
      <div className="chat-image avatar">
        <div className='w-10 rounded-full'>
          <img src={"https://img.icons8.com/?size=48&id=23239&format=png"} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi I'm Arjun Nagar</div>
      <div className='chat-footer opacity-50 text-white text-xs flex gap-1 items-center'>20:40</div>
    </div>
  )
}

export default Message