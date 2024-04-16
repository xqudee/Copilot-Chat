import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatWindow = () => {
  return (
    <div className='p-[16px] border rounded-lg w-[40%] h-[80%] flex flex-col  gap-[8px]'>
      <div className='flex py-[8px] justify-between'>
        <h1 className='font-[600] text-[20px] leading-[24px]'>Financial Copilot Chat</h1>

      </div>
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default ChatWindow
