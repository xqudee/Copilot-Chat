import React from 'react'
import { useMutation } from 'react-query';
import { fetchAIResponse } from '../../../hooks/ChatGptQuery';
import useChatStore from '../../../store/chatStore';

type Menu = {
  name: string,
  prompt: string
}[];

const menu = [
  {
    name: 'Shorter',
    prompt: 'Make your previous message shorter'
  },
  {
    name: 'Longer',
    prompt: 'Make your previous message longer'
  },
  {
    name: 'Simpler',
    prompt: 'Make your previous message simpler'
  },
  {
    name: 'Casual',
    prompt: 'Make your previous message casual'
  },
  {
    name: 'Professional',
    prompt: 'Make your previous message professional'
  }
]

const ActionMenu = () => {
  const { addMessage, setLoading, removeLastMessage, messages } = useChatStore();
  const { mutate, data, isLoading, isError } = useMutation(fetchAIResponse, {
    onSuccess: (data) => {
      addMessage({ id: Date.now(), text: data, fromUser: false });
      setLoading(false);
    },
  });

  const sendMessage = async (text: string) => {
    try {
      const lastMessage = messages[messages.length - 1]
      removeLastMessage();
      setLoading(true);
      mutate(text + ':\n' + lastMessage.text);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className='absolute w-[160px] bottom-0 left-[100%] flex flex-col gap-[5px] bg-white p-[8px] rounded-[8px] shadow-menu;
    '>
      <div>Modify:</div>
      <ul className='flex flex-col'>
        {menu.map((item, index) => (
          <li className='py-[11px] px-[8px] rounded-[4px] hover:bg-blue-menu_item' onClick={() => sendMessage(item.prompt)}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ActionMenu
