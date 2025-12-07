"use client";

import { Box, Text, Image } from "@chakra-ui/react";

export default function StudyTips() {
  return (
    <Box border="0.75px solid #e2e8f0" borderRadius="6px" p="12px 16px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="12px"
      >
        <Text fontSize="14px" fontWeight={600} color="#1e1e2f">
          Simbi&apos;s Study tips
        </Text>
        <Box cursor="pointer">
          <Image src="/icons/more.svg" alt="More options" />
        </Box>
      </Box>

      <Box
        bg="#ffffff"
        borderRadius="12px"
        boxShadow="0px 3px 22.5px rgba(0, 0, 0, 0.08)"
        p="12px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="8px"
        >
          <Text
            fontSize="10.5px"
            fontWeight={500}
            color="#7a5fff"
            letterSpacing="0.21px"
          >
            Study Session
          </Text>
          <Text
            fontSize="9px"
            fontWeight={500}
            color="#6b7280"
            letterSpacing="0.18px"
          >
            9min ago
          </Text>
        </Box>
        <Text
          fontSize="12px"
          fontWeight={400}
          color="#1e1e2f"
          letterSpacing="0.20px"
          lineHeight="15px"
        >
          I set a timer for your study session. Try not to wander off into
          TikTok land again.
        </Text>
      </Box>
    </Box>
  );
}
