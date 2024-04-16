import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatWindow from './components/CopilotChat/CopilotChatComponents/ChatWindow';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <ChatWindow />
      </div>
    </QueryClientProvider>
  );
}

export default App;
