"use client";

import { Box, Grid, Text, Flex } from "@chakra-ui/react";
import MilestoneRewardCard from "./MilestoneRewardCard";
import SimbiPepTalk from "./SimbiPepTalk";
import ScoreCard from "./ScoreCard";

// Static configuration for system achievements/milestones
const SYSTEM_ACHIEVEMENTS = [
  // Getting Started
  {
    category: "Getting Started",
    items: [
      {
        icon: "/trophy.svg",
        title: "First Study Plan",
        description: "Create your first study plan",
        tokens: 7,
        progress: "5 mins",
        variant: "earned",
        tokenBgColor: "#BBF7D1",
        tokenTextColor: "#16A349",
      },
      {
        icon: "/trophy.svg",
        title: "Start First Study Session",
        description: "Start your first study session",
        tokens: 5,
        progress: "5 mins",
        variant: "earned",
        tokenBgColor: "#BBF7D1",
        tokenTextColor: "#16A349",
      },
    ],
  },
  // Study Streaks
  {
    category: "Study Streaks",
    items: [
      {
        icon: "/trophy.svg",
        title: "3-Day Study Streak",
        description: "Complete 3 consecutive days of study",
        tokens: 10,
        progress: "3 days",
        variant: "upcoming",
        tokenBgColor: "#FFE688",
        tokenTextColor: "#DD7502",
      },
      {
        icon: "/trophy.svg",
        title: "7-Day Study Streak",
        description: "Complete 7 consecutive days of study",
        tokens: 15,
        progress: "7 days",
        variant: "upcoming",
        tokenBgColor: "#FFE688",
        tokenTextColor: "#DD7502",
      },
    ],
  },
  // Session Completed
  {
    category: "Session Completed",
    items: [
      {
        icon: "/starred.svg",
        title: "One Session",
        description: "Complete your first study session",
        tokens: 10,
        progress: "1 session",
        variant: "upcoming",
        tokenBgColor: "#BBF7D1",
        tokenTextColor: "#16A349",
      },
      {
        icon: "/starred.svg",
        title: "10 Sessions",
        description: "Complete 10 study sessions",
        tokens: 25,
        progress: "10 sessions",
        variant: "upcoming",
        tokenBgColor: "#BBF7D1",
        tokenTextColor: "#16A349",
      },
    ],
  },
  // Study Hour Milestones
  {
    category: "Study Hour Milestones",
    items: [
      {
        icon: "/clock.svg",
        title: "3 Hours Study",
        description: "Study for a total of 3 hours",
        tokens: 20,
        progress: "3 hours",
        variant: "upcoming",
        tokenBgColor: "#FFE688",
        tokenTextColor: "#DD7502",
      },
      {
        icon: "/clock.svg",
        title: "10 Hours Study",
        description: "Study for a total of 10 hours",
        tokens: 15,
        progress: "10 hours",
        variant: "upcoming",
        tokenBgColor: "#FFE688",
        tokenTextColor: "#DD7502",
      },
    ],
  },
];

export default function MilestoneLibrary() {
  return (
    <Box>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={6}>
        {/* Left Column */}
        <Flex direction="column" gap={6}>
          {SYSTEM_ACHIEVEMENTS.map((categoryGroup, index) => (
            <Box key={index} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Text fontSize="20px" fontWeight={600} color="dark.950">
                  {categoryGroup.category}
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight={500}
                  color="brand.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  View All
                </Text>
              </Box>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {categoryGroup.items.map((item, itemIndex) => (
                  <MilestoneRewardCard
                    key={itemIndex}
                    {...item}
                    variant={item.variant as "earned" | "upcoming"}
                  />
                ))}
              </Grid>
            </Box>
          ))}

          {/* Mobile: Pep Talk and Score Card */}
          <Flex
            direction="column"
            gap={6}
            display={{ base: "flex", lg: "none" }}
          >
            <SimbiPepTalk />
            <ScoreCard />
          </Flex>
        </Flex>

        {/* Right Sidebar - Desktop only */}
        <Flex
          direction="column"
          gap={6}
          display={{ base: "none", lg: "flex" }}
        >
          <SimbiPepTalk />
          <ScoreCard />
        </Flex>
      </Grid>
    </Box>
  );
}

