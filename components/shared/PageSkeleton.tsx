"use client";

import { Box, Stack, Skeleton } from "@chakra-ui/react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export function DashboardSkeleton() {
  return (
    <DashboardLayout>
      <Stack gap="33px">
        {/* Welcome Section Skeleton */}
        <Skeleton height="120px" borderRadius="12px" />

        {/* Study Streak Skeleton */}
        <Skeleton height="180px" borderRadius="12px" />

        {/* Productivity Scorecard Skeleton */}
        <Stack gap="16px">
          <Skeleton height="24px" width="200px" />
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="16px">
            <Skeleton height="120px" borderRadius="12px" />
            <Skeleton height="120px" borderRadius="12px" />
            <Skeleton height="120px" borderRadius="12px" />
          </Box>
        </Stack>

        {/* Active Study Plan & Today's Schedule */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="40px"
        >
          <Skeleton height="300px" borderRadius="12px" />
          <Skeleton height="300px" borderRadius="12px" />
        </Box>
      </Stack>
    </DashboardLayout>
  );
}

export function ScheduleSkeleton() {
  return (
    <DashboardLayout>
      <Stack gap="24px">
        {/* Header Skeleton */}
        <Box>
          <Skeleton height="40px" width="200px" mb="16px" />
          <Box display="flex" gap="16px">
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
          </Box>
        </Box>

        {/* Date Navigator Skeleton */}
        <Skeleton height="60px" borderRadius="8px" />

        {/* Schedule Content Skeleton */}
        <Stack gap="16px">
          <Skeleton height="80px" borderRadius="8px" />
          <Skeleton height="80px" borderRadius="8px" />
          <Skeleton height="80px" borderRadius="8px" />
          <Skeleton height="80px" borderRadius="8px" />
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

export function MilestoneSkeleton() {
  return (
    <DashboardLayout>
      <Stack gap="24px">
        {/* Header with Tabs Skeleton */}
        <Box>
          <Box display="flex" justifyContent="space-between" mb="24px">
            <Skeleton height="32px" width="150px" />
            <Skeleton height="40px" width="120px" />
          </Box>
          <Box display="flex" gap="32px">
            <Skeleton height="40px" width="150px" />
            <Skeleton height="40px" width="150px" />
          </Box>
        </Box>

        {/* Date Picker Skeleton */}
        <Skeleton height="60px" borderRadius="8px" />

        {/* Milestone Cards Skeleton */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap="20px"
        >
          <Skeleton height="200px" borderRadius="12px" />
          <Skeleton height="200px" borderRadius="12px" />
          <Skeleton height="200px" borderRadius="12px" />
          <Skeleton height="200px" borderRadius="12px" />
          <Skeleton height="200px" borderRadius="12px" />
          <Skeleton height="200px" borderRadius="12px" />
        </Box>
      </Stack>
    </DashboardLayout>
  );
}

export function GenericPageSkeleton() {
  return (
    <DashboardLayout>
      <Stack gap="24px">
        {/* Header Skeleton */}
        <Skeleton height="32px" width="200px" />

        {/* Content Skeletons */}
        <Stack gap="16px">
          <Skeleton height="120px" borderRadius="12px" />
          <Skeleton height="120px" borderRadius="12px" />
          <Skeleton height="120px" borderRadius="12px" />
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
