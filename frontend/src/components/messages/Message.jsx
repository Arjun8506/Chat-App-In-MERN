import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

function Message({ message }) {

  const { authUser, setauthUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilepic : selectedConversation.profilepic;
  const bubbleBgColor = fromMe ? 'bg-green-500' : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className= {`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 pb-2 ${bubbleBgColor}`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-white text-xs flex gap-1 items-center'>
        {formattedTime}
      </div>
    </div>
  )
}

export default Message