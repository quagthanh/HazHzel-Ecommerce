import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface ChatState {
    socket: Socket | null;
    activeConversationId: string | null;
    activeChatUserId: string | null;
    setSocket: (socket: Socket | null) => void;
    setActiveChat: (convId: string, userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    socket: null,
    activeConversationId: null,
    activeChatUserId: null,
    setSocket: (socket) => set({ socket }),
    setActiveChat: (convId, userId) => set({ activeConversationId: convId, activeChatUserId: userId }),
}));