import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../store/chatStore';
import copy from '../../../assets/Copy.svg'
import like from '../../../assets/Like.svg'
import dislike from '../../../assets/Dislike.svg'
import tuning from '../../../assets/Tuning.svg'
import ActionMenu from './ActionMenu';

const ChatGPTMessage = (message: { message: Message }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(message.message.text)
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  }
  return (
    <div key={message.message.id} className={`p-[16px] rounded-[16px] bg-orange-light flex flex-col gap-[8px]`}>
      <ReactMarkdown>{(message.message.text)}</ReactMarkdown>
      <div className='flex justify-between'>
        <div className='flex gap-[4px]'>
          <div className='p-[4px]'><img src={like} /></div>
          <div className='p-[4px]'><img src={dislike} /></div>
          <div className='p-[4px] cursor-pointer relative' onClick={() => setMenuOpen(menuOpen => !menuOpen)}>
            <img src={tuning} />
            {menuOpen && (
              <ActionMenu />
            )}
          </div>
          
        </div>
        <img src={copy} className='cursor-pointer' onClick={handleCopy} />
      </div>
    </div>
  )
}

export default ChatGPTMessage
