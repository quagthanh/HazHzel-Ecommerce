"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Spin, Avatar, Typography } from "antd";
import { MessageCircle, X, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useChatService } from "@/utils/hooks/useChatService";
import { useChatStore } from "@/library/stores/useChatStore";

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID || "admin";

export default function ClientChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { inbox, loadingMessages, messages } = useChatService();
  const { socket, activeConversationId, setActiveChat } = useChatStore();

  useEffect(() => {
    if (inbox && inbox.length > 0) {
      const adminConv = inbox.find(
        (conv: any) => conv.chatWithUserId === ADMIN_ID,
      );
      if (adminConv) {
        setActiveChat(adminConv.conversationId, ADMIN_ID);
      }
    } else {
      setActiveChat("", ADMIN_ID);
    }
  }, [inbox, setActiveChat]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !socket) return;

    socket.emit(
      "send message",
      {
        receivedId: ADMIN_ID,
        content: inputValue,
      },
      (response: any) => {
        if (response.success) {
          setInputValue("");

          if (!activeConversationId && response.message?.conversationId) {
            setActiveChat(response.message.conversationId, ADMIN_ID);
          }
        }
      },
    );
  };

  if (!session) return null;

  return (
    <div
      style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}
    >
      {isOpen && (
        <div
          style={{
            width: "350px",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "16px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              backgroundColor: "#1677ff",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Avatar
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ADMIN_ID}`}
              />
              <div>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Hỗ trợ khách hàng
                </div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={<X color="#fff" size={20} />}
              onClick={() => setIsOpen(false)}
              style={{ padding: 0 }}
            />
          </div>

          {/* Vùng Tin Nhắn */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              backgroundColor: "#f9fafb",
            }}
          >
            <Spin spinning={loadingMessages}>
              {!messages || messages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    color: "#9ca3af",
                  }}
                >
                  Hãy gửi lời chào đến nhân viên tư vấn!
                </div>
              ) : (
                messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.isMine ? "flex-end" : "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        borderBottomRightRadius: msg.isMine ? "4px" : "12px",
                        borderBottomLeftRadius: !msg.isMine ? "4px" : "12px",
                        backgroundColor: msg.isMine ? "#1677ff" : "#ffffff",
                        color: msg.isMine ? "#fff" : "#1f2937",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        border: msg.isMine ? "none" : "1px solid #e5e7eb",
                        fontSize: "14px",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </Spin>
          </div>

          {/* Ô Nhập Liệu */}
          <div
            style={{
              padding: "12px",
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "#fff",
            }}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder="Nhập tin nhắn..."
              suffix={
                <Button
                  type="text"
                  icon={
                    <Send
                      size={18}
                      color={inputValue.trim() ? "#1677ff" : "#9ca3af"}
                    />
                  }
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{ padding: 0 }}
                />
              }
              style={{ borderRadius: "20px", padding: "8px 16px" }}
            />
          </div>
        </div>
      )}

      {/* BONG BÓNG CHAT (Floating Button) */}
      {!isOpen && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageCircle size={28} />}
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            boxShadow: "0 4px 12px rgba(22, 119, 255, 0.4)",
          }}
        />
      )}
    </div>
  );
}
