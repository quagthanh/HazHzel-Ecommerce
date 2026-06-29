"use client";
import { mutate } from "swr";
import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Spin, Avatar, Typography, FloatButton } from "antd";
import { MessageCircle, X, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useChatService } from "@/utils/hooks/useChatService";
import { useChatStore } from "@/library/stores/useChatStore";
import styles from "@/components/common/admin/chat/chat-widget/style.module.scss";
import {
  CloseOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { roleAccount } from "@/types/enum";

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID || "admin";
interface SessionProps {
  session: any;
}

export default function ClientChatWidget({ session }: SessionProps) {
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
    if (!inputValue.trim() || !socket) {
      console.log(
        "Blocked! Missing data. Please check if the active Chat UserId is null",
      );
      return;
    }

    const payload = {
      receivedId: ADMIN_ID,
      content: inputValue,
    };

    socket.emit("send message", payload, (response: any) => {
      if (response.success) {
        setInputValue("");

        if (!activeConversationId && response.message?.conversationId) {
          setActiveChat(response.message.conversationId, ADMIN_ID);
        }

        if (activeConversationId || response.message?.conversationId) {
          const convId =
            activeConversationId || response.message.conversationId;
          const token = session?.access_token;

          mutate([`/api/chat/messages/${convId}`, token]);
          mutate([`/api/chat/inbox`, token]);
        }
      } else {
        console.error("Server error:", response.error);
      }
    });
  };

  return (
    <div className={styles.widgetContainer}>
      {isOpen && (
        <div className={styles.chatPanel}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <Avatar
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ADMIN_ID}`}
              />
              <div>
                <div className={styles.title}>Customer Support</div>
                <div className={styles.subtitle}>We are here to help you</div>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined style={{ color: "#fff" }} />}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className={styles.messageArea}>
            <Spin spinning={loadingMessages}>
              {!messages || messages.length === 0 ? (
                <div className={styles.emptyState}>
                  Say hello to our support agent!
                </div>
              ) : (
                messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`${styles.messageRow} ${msg.isMine ? styles.isMine : ""}`}
                  >
                    <div
                      className={`${styles.messageBubble} ${
                        msg.isMine ? styles.mine : styles.theirs
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </Spin>
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder="Type a message..."
              style={{ borderRadius: "20px" }}
              suffix={
                <Button
                  type="text"
                  icon={
                    <SendOutlined
                      style={{
                        color: inputValue.trim()
                          ? "var(--ant-color-primary)"
                          : "#9ca3af",
                      }}
                    />
                  }
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{ padding: 0 }}
                />
              }
            />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <FloatButton
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setIsOpen(true)}
          style={{
            position: "relative",
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
          }}
        />
      )}
    </div>
  );
}
