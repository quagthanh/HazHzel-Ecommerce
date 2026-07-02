import { useEffect } from 'react';
import { io } from 'socket.io-client';
import useSWR from 'swr';
import axios from 'axios';
import { useChatStore } from '@/library/stores/useChatStore';
import { useSession } from 'next-auth/react';
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL || 'http://localhost:30051221';
const APP_ID = process.env.NEXT_PUBLIC_CHAT_APP_ID;

const fetcher = async (url: string, token: string) => {
    const res = await axios.get(`${CHAT_API_URL}${url}`, {
        headers: { Authorization: `Bearer ${token}`, 'x-app-id': APP_ID }
    });
    return res.data.data;
};

export const useChatService = () => {
    const { data: session, status } = useSession();
    const token = session?.access_token;

    const { socket, setSocket, activeConversationId } = useChatStore();

    useEffect(() => {
        if (status === "loading" || !token || !APP_ID) return;
        if (socket?.connected) return;


        const newSocket = io(CHAT_API_URL, {
            auth: { token, appId: APP_ID },
            reconnection: true,
        });

        newSocket.on('connect', () => {
            setSocket(newSocket);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Error while connect to Socket:', error.message);
        });

        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [token, status]);

    const { data: inbox, isLoading: loadingInbox } = useSWR(
        token ? [`/api/chat/inbox`, token] : null,
        ([url, token]) => fetcher(url, token)
    );

    const { data: messages, isLoading: loadingMessages } = useSWR(
        token && activeConversationId ? [`/api/chat/messages/${activeConversationId}`, token] : null,
        ([url, token]) => fetcher(url, token)
    );

    return { inbox, loadingInbox, messages, loadingMessages };
};