import React from 'react'
import { useMutation } from 'react-query';
import { fetchAIResponse } from '../../../hooks/ChatGptQuery';
import useChatStore from '../../../store/chatStore';
import shorter from '../../../assets/Minimize.svg'
import longer from '../../../assets/Maximize.svg'
import simpler from '../../../assets/Hamburger_Menu.svg'
import casual from '../../../assets/Balloon.svg'
import prof from '../../../assets/Suitcase.svg'

type Menu = {
  name: string,
  prompt: string
}[];

const menu = [
  {
    name: 'Shorter',
    prompt: 'Make your previous message shorter',
    img: shorter
  },
  {
    name: 'Longer',
    prompt: 'Make your previous message longer',
    img: longer
  },
  {
    name: 'Simpler',
    prompt: 'Make your previous message simpler',
    img: simpler
  },
  {
    name: 'Casual',
    prompt: 'Make your previous message casual',
    img: casual
  },
  {
    name: 'Professional',
    prompt: 'Make your previous message professional',
    img: prof
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
      <div className=' text-[12px] color-text-gray'>Modify:</div>
      <ul className='flex flex-col'>
        {menu.map((item, index) => (
          <li className='py-[11px] px-[8px] rounded-[4px] flex gap-[8px] hover:bg-blue-menu_item' onClick={() => sendMessage(item.prompt)}>
            <img src={item.img} className='w-[16px]' />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActionMenu
