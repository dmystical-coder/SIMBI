"use client";

import { Box, Spinner, Text, Stack } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "lg",
  message = "Loading...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const content = (
    <Stack gap="16px" align="center">
      <Spinner
        size={size}
        color="#7a5fff"
        borderWidth="4px"
      />
      {message && (
        <Text fontSize="16px" fontWeight={500} color="#667085">
          {message}
        </Text>
      )}
    </Stack>
  );

  if (fullScreen) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bg="rgba(255, 255, 255, 0.9)"
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="40px"
    >
      {content}
    </Box>
  );
}
