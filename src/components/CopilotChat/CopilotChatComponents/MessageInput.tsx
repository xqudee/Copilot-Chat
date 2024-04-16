import React, { useState } from 'react'
import useChatStore, { Message } from '../../../store/chatStore';
import { fetchAIResponse } from '../../../hooks/ChatGptQuery';
import { useMutation } from 'react-query';

type PredefinedOptions = {
  title: string,
  options: {
    name: string,
    prompt: string
  }[]
}[]

const predefinedOptions: PredefinedOptions = [
  {
    title: 'Define Strategy',
    options: [
      {
        name: 'Goal Setting',
        prompt: ''
      },
      {
        name: 'Strategic Initiatives',
        prompt: ''
      },
      {
        name: 'Business Plan Outline',
        prompt: ''
      }
    ]
  },
  {
    title: 'Marketing research',
    options: [
      {
        name: 'Customer Profiles',
        prompt: ''
      },
      {
        name: 'Industry Trends',
        prompt: ''
      }
    ]
  },
  {
    title: 'Risk Assessment',
    options: [
      {
        name: 'Swot Analysis',
        prompt: ''
      },
      {
        name: 'Risk Register',
        prompt: ''
      },
      {
        name: 'Risk Score',
        prompt: ''
      }
    ]
  }
]

const MessageInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { addMessage, setLoading, messages } = useChatStore();
  const { mutate, data, isLoading, isError } = useMutation(fetchAIResponse, {
    onSuccess: (data) => {
      addMessage({ id: Date.now(), text: data, fromUser: false });
      setLoading(false);
    },
  });

  const sendMessage = async (text: string) => {
    addMessage({ id: Date.now(), text: text, fromUser: true });
    try {
      setLoading(true);
      mutate(text);
    } catch (error) {
        console.error(error);
    }
  }

  const sendPrompt = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.currentTarget.textContent != null) sendMessage(e.currentTarget.textContent)
  }

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    sendMessage(inputValue);
    setInputValue('');
};

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <div className={`w-[-webkit-fill-available] flex flex-col justify-between ${messages.length == 0 && 'h-[90%]'}`}>
      {messages.length == 0 && (
        <div className='flex flex-col gap-[8px] overflow-auto'>
          {predefinedOptions.map((element, i) => (
            <div key={i} className='py-[24px] px-[8px] border-b-[2px] flex flex-col gap-[16px]'>
              <div className='text-[18px] font-[500]'>{element.title}</div>
              <ul className='flex flex-col gap-[8px]'>
                {element.options.map((option, j) => (
                  <li key={j} onClick={(e) => sendPrompt(e)} className='py-[8px] px-[16px] rounded-[50px] bg-blue-option w-fit cursor-pointer'>{option.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={(e) => handleMessageSend(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e)}
        placeholder="Enter a prompt"
        className='w-[-webkit-fill-available] rounded-[50px] bg-blue-input px-[16px] py-[14px] outline-none'
      />
    </form>

      {isError && <div>Error fetching response from ChatGPT</div>}
    </div>
  );
}

export default MessageInput
