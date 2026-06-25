import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useChatStore } from '@/library/stores/useChatStore';
import { useSession } from 'next-auth/react';
const CHAT_API_URL = 'http://localhost:3005';
const APP_ID = process.env.NEXT_PUBLIC_CHAT_APP_ID || '2c2b40ba-acdc-4461-b42d-cea2b282526e';

const fetcher = async (url: string, token: string) => {
    const res = await axios.get(`${CHAT_API_URL}${url}`, {
        headers: { Authorization: `Bearer ${token}`, 'x-app-id': APP_ID }
    });
    return res.data.data;
};

export const useChatService = () => {
    const { data: session, status } = useSession();
    const token = session?.access_token as string;

    const { socket, setSocket, activeConversationId } = useChatStore();

    useEffect(() => {
        // Chỉ chạy khi đã load xong Auth và chưa có socket nào đang kết nối
        if (status === "loading" || !token || !APP_ID) return;
        if (socket?.connected) return; // Nếu đã có socket đang sống thì không tạo mới

        console.log("⏳ Đang khởi tạo kết nối Socket mới...");

        const newSocket = io(CHAT_API_URL, {
            auth: { token, appId: APP_ID },
            reconnection: true, // Tự động kết nối lại nếu rớt mạng
        });

        newSocket.on('connect', () => {
            console.log('✅ Socket đã kết nối thành công! ID:', newSocket.id);
            setSocket(newSocket); // Lưu vào global store
        });

        newSocket.on('connect_error', (error) => {
            console.error('❌ Lỗi kết nối Socket:', error.message);
        });

        // Cleanup khi component bị hủy hẳn
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