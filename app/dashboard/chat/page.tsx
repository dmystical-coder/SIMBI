"use client";

import { Box, Text, Stack } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ChatPage() {
  return (
    <DashboardLayout>
      <Stack h="calc(100vh - 140px)" gap="20px">
        {/* Header */}
        <Box>
          <Text
            fontSize="24px"
            fontWeight="600"
            color="#5e54a0"
            mb="20px"
          >
            Talk to SIMBI
          </Text>
        </Box>

        
      </Stack>
    </DashboardLayout>
  );
}

