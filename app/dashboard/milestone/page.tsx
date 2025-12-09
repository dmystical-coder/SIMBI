"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";
import MilestoneLibrary from "@/components/dashboard/MilestoneLibrary";
import MilestoneDatePicker, { ViewType } from "@/components/dashboard/MilestoneDatePicker";
import ChatBubble from "@/components/dashboard/ChatBubble";

export default function MilestonePage() {
  const { isLoading } = useRequireAuth();
  const [activeTab, setActiveTab] = useState<"Library" | "Tracker">("Tracker");

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

  const handleDateChange = (date: Date) => {
    console.log("Date changed to:", date);
  };

  const handleViewChange = (view: ViewType) => {
    console.log("View changed to:", view);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  return (
    <DashboardLayout>
      <Box>
        {/* Header Section with Title, Tabs, and Filter */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "flex-end" }}
          mb={6}
          gap={4}
          borderBottom="1px solid"
          borderColor="state.200"
          pb={0}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "center" }}
            gap={{ base: 4, md: 12 }}
            flex={1}
          >
            {/* Title Row (Mobile: Title + Filter) */}
            <Flex
              justify="space-between"
              align="center"
              width={{ base: "100%", md: "auto" }}
            >
              <Text fontSize="24px" fontWeight={700} color="dark.950">
                Milestone
              </Text>

              {/* Mobile Filter Button */}
              <Flex
                display={{ base: "flex", md: "none" }}
                align="center"
                gap={2}
                px={4}
                py={2}
                border="1px solid"
                borderColor="brand.600"
                borderRadius="8px"
                cursor="pointer"
                onClick={handleFilterClick}
              >
                <Image src="/icons/funnel.svg" alt="Filter" w="16px" h="16px" />
                <Text fontSize="14px" fontWeight={500} color="brand.600">
                  Filter
                </Text>
              </Flex>
            </Flex>

            <Flex gap={8}>
              <Box
                cursor="pointer"
                onClick={() => setActiveTab("Library")}
                pb={4}
                borderBottom="3px solid"
                borderColor={
                  activeTab === "Library" ? "brand.600" : "transparent"
                }
              >
                <Text
                  color={activeTab === "Library" ? "brand.600" : "state.500"}
                  fontWeight={activeTab === "Library" ? 500 : 400}
                >
                  Milestone Library
                </Text>
              </Box>
              <Box
                cursor="pointer"
                onClick={() => setActiveTab("Tracker")}
                pb={4}
                borderBottom="3px solid"
                borderColor={
                  activeTab === "Tracker" ? "brand.600" : "transparent"
                }
              >
                <Text
                  color={activeTab === "Tracker" ? "brand.600" : "state.500"}
                  fontWeight={activeTab === "Tracker" ? 500 : 400}
                >
                  Milestone Tracker
                </Text>
              </Box>
            </Flex>
          </Flex>

          {/* Desktop Filter Button */}
          <Flex
            display={{ base: "none", md: "flex" }}
            align="center"
            gap={2}
            px={4}
            py={2}
            border="1px solid"
            borderColor="brand.600"
            borderRadius="8px"
            cursor="pointer"
            onClick={handleFilterClick}
            mb={{ base: 2, md: 4 }}
            alignSelf={{ base: "flex-end", md: "auto" }}
          >
            <Image src="/icons/funnel.svg" alt="Filter" w="16px" h="16px" />
            <Text fontSize="14px" fontWeight={500} color="brand.600">
              Filter
            </Text>
          </Flex>
        </Flex>

        <MilestoneDatePicker
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />

        <Box mt={6}>
          {activeTab === "Library" ? <MilestoneLibrary /> : <MilestoneTracker />}
        </Box>

        <ChatBubble />
      </Box>
    </DashboardLayout>
  );
}
