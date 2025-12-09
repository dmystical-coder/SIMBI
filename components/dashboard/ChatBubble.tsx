"use client";

import { Box } from "@chakra-ui/react";

export default function ChatBubble() {
  return (
    <Box
      position="fixed"
      bottom="40px"
      right="40px"
      zIndex={100}
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.1)" }}
    >
      <img
        src="/chat-bubble.svg"
        alt="Chat"
        style={{ width: "120px", height: "120px" }}
      />
    </Box>
  );
}

