"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text, Stack, Grid } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StudyStreak from "@/components/dashboard/StudyStreak";
import ProductivityScorecard from "@/components/dashboard/ProductivityScorecard";
import ActiveStudyPlan from "@/components/dashboard/ActiveStudyPlan";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import RewardsAndMilestones from "@/components/dashboard/RewardsAndMilestones";
import StudyTips from "@/components/dashboard/StudyTips";
import StudyConsistencyChart from "@/components/dashboard/StudyConsistencyChart";

export default function DashboardPage() {
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

  return (
    <DashboardLayout>
      <Stack gap="33px">
        {/* Main Content Grid */}
        <Grid templateColumns={{ base: "1fr", xl: "1fr 400px" }} gap="40px">
          {/* Left Column */}
          <Stack gap="28px">
            {/* Welcome Section */}
            <WelcomeSection />

            {/* Study Streak */}
            <StudyStreak />

            {/* Productivity Scorecard */}
            <ProductivityScorecard />

            {/* Active Study Plan & Today's Schedule */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="40px">
              <ActiveStudyPlan />
              <TodaySchedule />
            </Grid>
          </Stack>

          {/* Right Column */}
          <Stack gap="24px">
            {/* Rewards and Milestones */}
            <RewardsAndMilestones />

            {/* Study Tips */}
            <StudyTips />

            {/* Study Consistency Chart */}
            <StudyConsistencyChart />
          </Stack>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
}
