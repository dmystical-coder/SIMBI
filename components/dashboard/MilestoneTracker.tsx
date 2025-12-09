"use client";

import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import MilestoneCard from "./MilestoneCard";
import SimbiPepTalk from "./SimbiPepTalk";
import ScoreCard from "./ScoreCard";
import MilestoneRewardCard from "./MilestoneRewardCard";

// Sample active milestones (This should eventually come from props or API)
const ACTIVE_MILESTONES = [
  {
    subject: "Reading - Chemistry",
    nextTopic: "Study atomic Structure",
    progress: 40,
    encouragement: "Keep up the good work!",
    daysLeft: 10,
    backgroundColor: "brand.50",
  },
  {
    subject: "Reading - Mathematics",
    nextTopic: "Study Calculus",
    progress: 10,
    encouragement: "Ghosting Math? Rude",
    daysLeft: 10,
    backgroundColor: "success.50",
  },
  {
    subject: "Reading - Biology",
    nextTopic: "Study Human Digestive System",
    progress: 60,
    encouragement: "Study now, flex later",
    daysLeft: 10,
    backgroundColor: "anonYellow.50",
  },
  {
    subject: "Reading - Physics",
    nextTopic: "Study Thermodynamics",
    progress: 90,
    encouragement: "Okay now I'm impressed",
    daysLeft: 1,
    backgroundColor: "secondary.50",
  },
];

export default function MilestoneTracker() {
  return (
    <Box>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={6}>
        {/* Left Column */}
        <Flex direction="column" gap={6}>
          {/* Active Milestones Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
          >
            {ACTIVE_MILESTONES.map((milestone, index) => (
              <MilestoneCard key={index} {...milestone} />
            ))}
          </Grid>

          {/* Mobile: Pep Talk and Score Card */}
          <Flex
            direction="column"
            gap={6}
            display={{ base: "flex", lg: "none" }}
          >
            <SimbiPepTalk />
            <ScoreCard />
          </Flex>

          {/* Upcoming Milestones Section */}
          <Box>
            <Text fontSize="24px" fontWeight={600} color="dark.950" mb={4}>
              Upcoming Milestones
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              <MilestoneRewardCard
                icon="/trophy.svg"
                title="7 days Study Streak"
                description="Complete 7 consecutive days of study"
                tokens={20}
                progress="5/7 days"
                variant="upcoming"
                tokenPrefix=""
              />
              <MilestoneRewardCard
                icon="/starred.svg"
                title="Pomodoro Session"
                description="Complete 5 sessions in one day"
                tokens={10}
                progress="3/5 done"
                variant="upcoming"
                tokenPrefix=""
              />
            </Grid>
          </Box>

          {/* Earned Milestones Section */}
          <Box>
            <Text fontSize="24px" fontWeight={600} color="dark.950" mb={4}>
              Earned Milestones
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              <MilestoneRewardCard
                icon="/trophy.svg"
                title="3 days Study Streak"
                description="3 consecutive days of study completed"
                tokens={10}
                progress="3/3 days"
                variant="earned"
              />
              <MilestoneRewardCard
                icon="/clock.svg"
                title="Time Master lvl 1"
                description="Shockingly... you did it!"
                tokens={15}
                progress="10 hours"
                variant="earned"
              />
            </Grid>
          </Box>
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

