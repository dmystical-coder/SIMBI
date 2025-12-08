"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function RewardsPage() {
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
      <Box>
        <Text fontSize="24px" fontWeight={600} color="#1e1e2f">
          Rewards
        </Text>
        {/* Rewards content will go here */}
      </Box>
    </DashboardLayout>
  );
}
