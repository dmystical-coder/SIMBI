"use client";

import { Box, Text, Stack, Input, Image, HStack, Flex, IconButton, Button } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "simbi";
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate Simbi response
    setTimeout(() => {
      const simbiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hey Girl! How can I help you today?",
        sender: "simbi",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, simbiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      <Stack h="calc(100vh - 140px)" gap="20px">
        {/* Header */}
        <Box>
          <Text
            fontSize="24px"
            fontWeight="600"
            color="#5e54a0"
            mb="20px"
          >
            Talk to SIMBI
          </Text>
        </Box>

        
      </Stack>
    </DashboardLayout>
  );
}

