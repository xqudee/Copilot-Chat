import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { Message } from '../../../store/chatStore';
import InteractionIcons from './InteractionIcons';

const ChatGPTMessage = (message: { message: Message }) => {
  return (
    <div key={message.message.id} className={`p-[16px] rounded-[16px] bg-orange-light flex flex-col gap-[8px]`}>
      <ReactMarkdown>{(message.message.text)}</ReactMarkdown>
      <InteractionIcons message={message.message} />
    </div>
  )
}

export default ChatGPTMessage
