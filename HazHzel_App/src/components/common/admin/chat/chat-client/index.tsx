"use client";

import React, { useEffect, useRef, useState } from "react";
import { Layout, List, Avatar, Input, Button, Spin, Typography } from "antd";
import { Send } from "lucide-react";

import PageHeader from "../../page-header";
import { useChatService } from "@/utils/hooks/useChatService";
import { useChatStore } from "@/library/stores/useChatStore";

const { Sider, Content } = Layout;
const { Text } = Typography;

const ChatClient = () => {
  const { inbox, loadingInbox, messages, loadingMessages } = useChatService();
  const { socket, activeConversationId, activeChatUserId, setActiveChat } =
    useChatStore();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    console.log("👉 Click gửi tin nhắn. Nội dung:", inputValue);
    console.log("Trạng thái Socket hiện tại:", socket ? "Sẵn sàng" : "Null");
    if (!inputValue.trim() || !socket || !activeChatUserId) return;

    const payload = {
      receivedId: activeChatUserId,
      content: inputValue,
    };

    socket.emit("send_message", payload, (response: any) => {
      if (response.success) {
        setInputValue("");
      }
    });
  };

  return (
    <div style={{ padding: "24px", background: "#fff", height: "100%" }}>
      <PageHeader
        title="Live Chat Support"
        subtitle="Quản lý và hỗ trợ khách hàng trực tuyến"
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
            <Text strong>Hộp thư đến</Text>
          </div>

          <Spin spinning={loadingInbox} size="large" style={{ marginTop: 20 }}>
            <List
              itemLayout="horizontal"
              dataSource={inbox || []}
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
                    title={<Text strong>{item.chatWithUserId}</Text>}
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

        {/* CỘT PHẢI: KHUNG CHAT CHI TIẾT */}
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
                icon={<Send />}
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#bfbfbf",
                  marginBottom: 16,
                }}
              />
              <br />
              <Text type="secondary">
                Chọn một khách hàng để bắt đầu trò chuyện
              </Text>
            </div>
          ) : (
            <>
              {/* Header Box Chat */}
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
                <Text strong style={{ fontSize: 16 }}>
                  {activeChatUserId}
                </Text>
              </div>

              {/* Vùng hiển thị tin nhắn */}
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

              {/* Ô nhập liệu */}
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
                  placeholder="Soạn tin nhắn hỗ trợ..."
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
