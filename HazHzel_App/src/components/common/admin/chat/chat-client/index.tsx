"use client";
import { mutate } from "swr";
import React, { useEffect, useRef, useState } from "react";
import { Layout, List, Avatar, Input, Button, Spin, Typography } from "antd";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";

import PageHeader from "../../page-header";
import { useChatService } from "@/utils/hooks/useChatService";
import { useChatStore } from "@/library/stores/useChatStore";
import { IUser } from "@/types/backend";
import { ChatConversation } from "@/types/chat";

const { Sider, Content } = Layout;
const { Text } = Typography;

interface ChatClientProps {
  users: IUser[];
}

const ChatClient = ({ users }: ChatClientProps) => {
  const { data: session } = useSession();

  let { inbox, loadingInbox, messages, loadingMessages } = useChatService();
  const { socket, activeConversationId, activeChatUserId, setActiveChat } =
    useChatStore();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    console.log("Check Data trước khi gửi:", {
      inputValue,
      socket: !!socket,
      activeChatUserId,
    });
    if (!inputValue.trim() || !socket || !activeChatUserId) {
      console.error(
        "Blocked! Missing data. Please check if the active Chat UserId is null",
      );
      return;
    }

    const payload = {
      receivedId: activeChatUserId,
      content: inputValue,
    };

    socket.emit("send message", payload, (response: any) => {
      if (response.success) {
        setInputValue("");
        const token = session?.access_token || session?.user?.access_token;

        if (activeConversationId) {
          mutate([`/api/chat/messages/${activeConversationId}`, token]);
          mutate([`/api/chat/inbox`, token]);
        }
      } else {
        console.error("Server error:", response.error);
      }
    });
  };

  // SỬA LỖI 1: Bảo vệ inbox bằng fallback mảng rỗng (inbox || [])
  const formatedInbox = (inbox || []).map((conservation: ChatConversation) => {
    const matchedUser = (users || []).find(
      (user: IUser) => user._id === conservation.chatWithUserId,
    );
    return {
      ...conservation,
      userInfo: matchedUser,
    };
  });

  // SỬA LỖI 2: Tìm thông tin user đang được chat hiện tại thay vì gọi sai từ mảng
  const activeChatUser = (users || []).find((u) => u._id === activeChatUserId);

  return (
    <div style={{ padding: "24px", background: "#fff", height: "100%" }}>
      <PageHeader
        title="Live Chat Support"
        subtitle="Online customer management and support"
        breadcrumb={["Admin", "Chat"]}
      />

      <Layout
        style={{
          height: "calc(100vh - 200px)",
          marginTop: "16px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Sider
          width={320}
          theme="light"
          style={{ borderRight: "1px solid #f0f0f0" }}
        >
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #f0f0f0",
              background: "#fafafa",
            }}
          >
            <Text strong>Inbox</Text>
          </div>

          <Spin spinning={loadingInbox} size="large" style={{ marginTop: 20 }}>
            <List
              itemLayout="horizontal"
              dataSource={formatedInbox}
              style={{ overflowY: "auto", height: "calc(100% - 55px)" }}
              renderItem={(item: any) => (
                <List.Item
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "all 0.3s",
                    backgroundColor:
                      activeConversationId === item.conversationId
                        ? "#e6f4ff"
                        : "transparent",
                  }}
                  onClick={() =>
                    setActiveChat(item.conversationId, item.chatWithUserId)
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.chatWithUserId}`}
                      />
                    }
                    // SỬA LỖI 3: Thêm Optional Chaining (?.) đề phòng userInfo undefined
                    title={
                      <Text strong>
                        {item.userInfo?.name || "Người dùng ẩn danh"}
                      </Text>
                    }
                    description={
                      <Text type="secondary" ellipsis style={{ maxWidth: 200 }}>
                        {item.lastMessage}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Spin>
        </Sider>

        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#fff",
          }}
        >
          {!activeConversationId ? (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <Avatar
                size={64}
                icon={<Send size={32} />}
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#bfbfbf",
                  marginBottom: 16,
                }}
              />
              <br />
              <Text type="secondary">
                Select a customer to start a conversation.
              </Text>
            </div>
          ) : (
            <>
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Avatar
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChatUserId}`}
                />
                {/* SỬA LỖI 2 (Tiếp): Sử dụng biến activeChatUser đã tìm ở trên */}
                <Text strong style={{ fontSize: 16 }}>
                  {activeChatUser?.name || "Người dùng ẩn danh"}
                </Text>
              </div>

              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "24px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <Spin spinning={loadingMessages}>
                  {messages?.map((msg: any) => (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        justifyContent: msg.isMine ? "flex-end" : "flex-start",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "65%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          borderBottomRightRadius: msg.isMine ? "4px" : "12px",
                          borderBottomLeftRadius: !msg.isMine ? "4px" : "12px",
                          backgroundColor: msg.isMine ? "#1677ff" : "#ffffff",
                          color: msg.isMine ? "#fff" : "#1f2937",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          border: msg.isMine ? "none" : "1px solid #e5e7eb",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </Spin>
              </div>

              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid #f0f0f0",
                  backgroundColor: "#fff",
                }}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Drafting support message..."
                  size="large"
                  suffix={
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<Send size={16} />}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    />
                  }
                  style={{ borderRadius: "24px", paddingLeft: "16px" }}
                />
              </div>
            </>
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default ChatClient;
