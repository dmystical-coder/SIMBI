"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface MilestoneCardProps {
  subject: string;
  nextTopic: string;
  progress: number;
  encouragement: string;
  daysLeft: number;
  backgroundColor: string;
}

export default function MilestoneCard({
  subject,
  nextTopic,
  progress,
  encouragement,
  daysLeft,
  backgroundColor,
}: MilestoneCardProps) {
  // Get the appropriate progress icon based on percentage
  const getProgressIcon = (percentage: number) => {
    if (percentage === 100) return "/milestone-100.svg";
    if (percentage >= 90) return "/milestone-90.svg";
    if (percentage >= 80) return "/milestone-80.svg";
    if (percentage >= 70) return "/milestone-70.svg";
    if (percentage >= 60) return "/milestone-60.svg";
    if (percentage >= 50) return "/milestone-50.svg";
    if (percentage >= 40) return "/milestone-40.svg";
    if (percentage >= 30) return "/milestone-30.svg";
    if (percentage >= 20) return "/milestone-20.svg";
    return "/milestone-Default.svg";
  };

  // Get days left badge color based on urgency
  const getDaysLeftColor = (days: number) => {
    if (days <= 1) return "error.100";
    if (days <= 5) return "anonYellow.100";
    return "success.100";
  };

  const getDaysLeftTextColor = (days: number) => {
    if (days <= 1) return "error.600";
    if (days <= 5) return "anonYellow.700";
    return "success.600";
  };

  return (
    <Flex
      direction="column"
      bg={backgroundColor}
      borderRadius="16px"
      p={6}
      gap={4}
      position="relative"
      minH="200px"
    >
      {/* Header with three-dot menu */}
      <Flex justify="space-between" align="start">
        <Box>
          <Text fontSize="16px" fontWeight={600} color="dark.950">
            {subject}
          </Text>
          <Text fontSize="12px" color="state.600" mt={1}>
            Next: {nextTopic}
          </Text>
        </Box>

        <Image src="/icons/more.svg" alt="More" cursor="pointer" />
      </Flex>

      {/* Progress Section */}
      <Flex direction="column" gap={2}>
        <Image
          src={getProgressIcon(progress)}
          alt="Progress"
          w={{ base: "100%", md: "auto" }}
        />
        <Flex
          w="100%"
          direction={{ base: "row", md: "row" }}
          align={{ base: "center", md: "center" }}
          justify={{ base: "space-between" }}
          gap={{ base: 1, md: 3 }}
        >
          <Text fontSize="14px" color="state.600">
            Progress
          </Text>
          <Text fontSize="16px" fontWeight={600} color="dark.950">
            {progress}%
          </Text>
        </Flex>
      </Flex>

      {/* Bottom Section */}
      <Flex justify="space-between" align="center" mt="auto">
        <Text fontSize="14px" color="state.700">
          {encouragement}
        </Text>

        <Flex bg={getDaysLeftColor(daysLeft)} px={3} py={1} borderRadius="12px">
          <Text
            fontSize="12px"
            fontWeight={500}
            color={getDaysLeftTextColor(daysLeft)}
          >
            {daysLeft} {daysLeft === 1 ? "day" : "days"} left
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
