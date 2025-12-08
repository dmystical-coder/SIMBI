"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text, Grid, Flex } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";
import MilestoneDatePicker from "@/components/dashboard/MilestoneDatePicker";
import MilestoneCard from "@/components/dashboard/MilestoneCard";
import SimbiPepTalk from "@/components/dashboard/SimbiPepTalk";
import ScoreCard from "@/components/dashboard/ScoreCard";
import MilestoneRewardCard from "@/components/dashboard/MilestoneRewardCard";

export default function MilestonePage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Text>Loading...</Text>
      </Box>
    );
  }

  const handleTabChange = (tab: "Active" | "Inactive" | "Completed") => {
    console.log("Tab changed to:", tab);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleDateChange = (date: Date) => {
    console.log("Date changed to:", date);
  };

  const handleViewChange = (view: "calendar" | "list") => {
    console.log("View changed to:", view);
  };

  // Sample milestone data
  const activeMilestones = [
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

  return (
    <DashboardLayout>
      <Box>
        <MilestoneTracker
          onTabChange={handleTabChange}
          onFilterClick={handleFilterClick}
        />

        <MilestoneDatePicker
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={6} mt={6}>
          {/* Left Column - Milestone Cards and Lists */}
          <Flex direction="column" gap={6}>
            {/* Milestone Cards Grid */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              {activeMilestones.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
              ))}
            </Grid>

            {/* Mobile: Pep Talk and Score Card - Show before Earned Milestones */}
            <Flex
              direction="column"
              gap={6}
              display={{ base: "flex", lg: "none" }}
            >
              <SimbiPepTalk />
              <ScoreCard />
            </Flex>

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
          </Flex>

          {/* Right Sidebar - Pep Talk and Score Card (Desktop only) */}
          <Flex
            direction="column"
            gap={6}
            display={{ base: "none", lg: "flex" }}
          >
            <SimbiPepTalk />
            <ScoreCard />
          </Flex>

          {/* Chat Bubble */}
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
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
