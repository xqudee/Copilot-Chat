import React from 'react'
// import useChatGPTQuery from '../hooks/ChatGptQuery';
import useChatStore from '../../../store/chatStore';
import ChatGPTMessage from './ChatGPTMessage';
import dots from '../../../assets/dots.gif'

const MessageList = () => {
  const { messages, loading } = useChatStore(); 

  const userClasses = '';
  const assistantClass = ''

  return (
    <>
      {messages.length > 0 && (
        <div className='flex flex-col justify-between h-[-webkit-fill-available] overflow-auto gap-2'>
          <div className='flex flex-col gap-2 justify-start'>
            {messages.map((message, index) => (
              message.fromUser ? (
                <div key={index} className={`p-[16px] rounded-[16px] self-end bg-blue-message`}>
                  {(message.text)}
                </div>
              ) : (
                <ChatGPTMessage message={message} />
              )
            ))}
          </div>
            {loading && (
              <div className='flex gap-1 w-[100%] items-end'>
                <span>Copilot is thinking</span>
                <img src={dots} className='w-[20px] h-fit pb-[4px]' />
              </div>
            )}
        </div>
      )}
    </>
  )
}

export default MessageList
