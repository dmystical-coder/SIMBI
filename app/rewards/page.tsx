"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text } from "@chakra-ui/react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { GenericPageSkeleton } from "@/components/shared/PageSkeleton";

export default function RewardsPage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <GenericPageSkeleton />;
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
