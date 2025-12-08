"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";

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
    // Add your tab change logic here
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
    // Add your filter logic here
  };

  return (
    <DashboardLayout>
      <Box>
        <MilestoneTracker
          onTabChange={handleTabChange}
          onFilterClick={handleFilterClick}
        />
        {/* Milestone content will go here */}
      </Box>
    </DashboardLayout>
  );
}
