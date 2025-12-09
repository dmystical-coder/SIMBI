"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

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
      <Image
        src="/chat-bubble.svg"
        alt="Chat"
        width={120}
        height={120}
      />
    </Box>
  );
}

