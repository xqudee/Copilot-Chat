import React, { useState } from 'react'
import copy from '../../../assets/Copy.svg'
import like from '../../../assets/Like.svg'
import dislike from '../../../assets/Dislike.svg'
import tuning from '../../../assets/Tuning.svg'
import ActionMenu from './ActionMenu';
import { Message } from '../../../store/chatStore'

const InteractionIcons = ({message} : {message: Message}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text)
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-[4px] items-center'>
        <div className='p-[4px]'><img src={like} /></div>
        <div className='p-[4px]'><img src={dislike} /></div>
        <div className='p-[4px] cursor-pointer relative' onClick={() => setMenuOpen(menuOpen => !menuOpen)}>
          <div className={`${menuOpen && 'bg-menu-active'} rounded-[50%] p-[4px]`}>
            <img src={tuning} />
          </div>
          {menuOpen && (
            <ActionMenu />
          )}
        </div>
        
      </div>
      <img src={copy} className='cursor-pointer' onClick={handleCopy} />
    </div>
  )
}

export default InteractionIcons
