// chatStore.ts
import { create } from 'zustand';

export interface Message {
  id: number;
  text: string;
  fromUser: boolean;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  addMessage: (message: Message) => void;
  removeLastMessage: () => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  removeLastMessage: () => {
    set((state) => ({ messages: state.messages.slice(0, -1) }));
  }
}));

export default useChatStore;
