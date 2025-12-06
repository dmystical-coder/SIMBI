"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import { hasCompletedPreAssessment, hasSkippedPreAssessment } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  // This hook will redirect to /auth/sign-in if user is not authenticated
  const { isLoading } = useRequireAuth();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showPreAssessmentPrompt, setShowPreAssessmentPrompt] = useState(false);

  useEffect(() => {
    // Check if user skipped pre-assessment
    if (!isLoading && user) {
      const completedPreAssessment = hasCompletedPreAssessment();
      const skippedPreAssessment = hasSkippedPreAssessment();

      // Show prompt if they skipped but haven't completed
      setShowPreAssessmentPrompt(
        skippedPreAssessment && !completedPreAssessment
      );
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Stack gap={4}>
        {showPreAssessmentPrompt && (
          <Alert.Root borderStartWidth="4px" borderStartColor="orange.500">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Complete Your Pre-Assessment</Alert.Title>
              <Alert.Description>
                Help us personalize your SIMBI experience by completing a quick
                pre-assessment.
                <Button
                  onClick={() => router.push("/pre-assessment")}
                  variant="outline"
                  size="sm"
                  ml={4}
                  colorPalette="orange"
                >
                  Take Assessment
                </Button>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <Heading size="lg">Welcome to SIMBI Dashboard</Heading>

        <Box>
          <Text fontSize="lg">
            Hello, {user?.firstName} {user?.lastName}!
          </Text>
          <Text color="gray.600">{user?.email}</Text>
        </Box>

        <Box>
          <Text mb={2}>User ID: {user?.id}</Text>
          <Text mb={2}>
            Account created:{" "}
            {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </Box>

        <Button
          onClick={logout}
          colorPalette="red"
          variant="outline"
          w="fit-content"
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
