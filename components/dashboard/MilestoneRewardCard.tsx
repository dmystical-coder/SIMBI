"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface MilestoneRewardCardProps {
  icon: string;
  title: string;
  description: string;
  tokens: number;
  progress: string;
  tokenBgColor?: string;
  tokenTextColor?: string;
  tokenPrefix?: "+" | "";
  variant?: "earned" | "upcoming";
}

export default function MilestoneRewardCard({
  icon,
  title,
  description,
  tokens,
  progress,
  tokenBgColor,
  tokenTextColor,
  tokenPrefix = "+",
  variant = "earned",
}: MilestoneRewardCardProps) {
  // Set default colors based on variant
  const bgColor =
    tokenBgColor || (variant === "earned" ? "#BBF7D1" : "#FFE688");
  const textColor =
    tokenTextColor || (variant === "earned" ? "#16A349" : "#DD7502");

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="16px"
      p={{ base: "16px", md: "20px" }}
      border="1px solid"
      borderColor="#E4E7EC"
      boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
    >
      {/* Header with Icon and Title */}
      <Flex gap={3} align="center" mb={3}>
        <Box
          flexShrink={0}
          w="40px"
          h="40px"
          className="flex justify-center items-center"
        >
          <Image src={icon} alt={title} />
        </Box>
        <Box flex={1}>
          <Text
            fontSize="18px"
            fontWeight={600}
            color="#101828"
            lineHeight="1.4"
          >
            {title}
          </Text>
        </Box>
      </Flex>

      {/* Description */}
      <Text fontSize="14px" color="#475467" lineHeight="1.5" mb={4}>
        {description}
      </Text>

      {/* Footer with tokens and progress */}
      <Flex justify="space-between" align="center">
        <Box bg={bgColor} px="16px" py="4px" borderRadius="16px">
          <Text fontSize="12px" fontWeight={500} color={textColor}>
            {tokenPrefix}
            {tokens} tokens
          </Text>
        </Box>

        <Text fontSize="14px" fontWeight={500} color="#344054">
          {progress}
        </Text>
      </Flex>
    </Box>
  );
}
