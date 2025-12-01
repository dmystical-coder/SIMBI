"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Box, Heading, Text, Stack } from "@chakra-ui/react";

export default function DashboardPage() {
  // This hook will redirect to /auth/sign-in if user is not authenticated
  const { isLoading } = useRequireAuth();
  const { user, logout } = useAuth();

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
