"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Flame, MoreVertical } from "lucide-react";
import { StudyStreakData } from "@/types/dashboard";

interface StudyStreakProps {
  data: StudyStreakData;
}

export function StudyStreak({ data }: StudyStreakProps) {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="18px" fontWeight="600" color="#1E1E2F">
          Study Streak
        </Text>
      </Flex>

      <Flex gap="20px">
        {/* Consecutive Days */}
        <Box
          flex={1}
          border="0.5px solid #D8DBDF"
          borderRadius="8px"
          p={4}
        >
          <Text fontSize="14px" fontWeight="400" color="#5B616E" mb={3} lineHeight="13.45px">
            Consecutive Days
          </Text>
          <Flex align="center" gap="5px">
            <Text fontSize="16px" fontWeight="500" color="#000000" lineHeight="20.25px">
              {data.consecutiveDays}
            </Text>
            <Flame size={20} color="#FF6B00" fill="#FF6B00" />
          </Flex>
        </Box>

        {/* Simbi's Mood */}
        <Box flex={1} p={4}>
          <Text fontSize="14px" fontWeight="400" color="#5B616E" mb={3} lineHeight="13.50px">
            Simbi's Mood
          </Text>
          <Text fontSize="16px" fontWeight="500" color="#000000" lineHeight="20.25px">
            {data.mood}
          </Text>
        </Box>

        {/* Weekly Goal */}
        <Box
          flex={1}
          border="0.5px solid #D8DBDF"
          borderRadius="8px"
          p={4}
          position="relative"
        >
          <Text fontSize="14px" fontWeight="400" color="#5B616E" mb={3} lineHeight="13.50px">
            Weekly goal
          </Text>
          <Text fontSize="16px" fontWeight="500" color="#000000" lineHeight="20.25px">
            {data.weeklyProgress} milestones
          </Text>
          <Box position="absolute" top={4} right={4}>
            <MoreVertical size={18} color="#7A5FFF" />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}