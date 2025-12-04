"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { StudyTip } from "@/types/dashboard";
import { getRelativeTime } from "@/lib/mockData";

interface StudyTipsProps {
  tips: StudyTip[];
}

export function StudyTips({ tips }: StudyTipsProps) {
  const latestTip = tips[0];

  return (
    <Box
      border="0.75px solid #E2E8F0"
      borderRadius="6px"
      p={6}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="14px" fontWeight="600" color="#1E1E2F">
          Simbi's Study tips
        </Text>
        <MoreVertical size={14} color="#7A5FFF" cursor="pointer" />
      </Flex>

      {latestTip && (
        <Box
          bg="#FFFFFF"
          borderRadius="12px"
          boxShadow="0px 3px 22.5px rgba(0, 0, 0, 0.08)"
          p={4}
        >
          <Flex justify="space-between" align="start" mb={2}>
            <Box flex={1}>
              <Text fontSize="10.50px" fontWeight="500" color="#1E1E2F" letterSpacing="0.21px" mb={1}>
                {latestTip.title}
              </Text>
              <Text fontSize="12px" fontWeight="400" color="#1E1E2F" letterSpacing="0.24px" lineHeight="15px">
                {latestTip.message}
              </Text>
            </Box>
            <Text fontSize="9px" fontWeight="500" color="#6B7280" letterSpacing="0.18px" ml={4}>
              {getRelativeTime(latestTip.timestamp)}
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
}