export interface ChatConversation {
    conversationId: string;
    chatWithUserId: string;
    lastMessage: string;
    lastMessageTime: string;
    isRead: boolean;
}