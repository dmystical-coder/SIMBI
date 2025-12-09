"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import { Box, Text, Flex, Button, Tabs, Image } from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DateNavigator from "@/components/dashboard/DateNavigator";
import DailyScheduleView from "@/components/dashboard/DailyScheduleView";
import WeeklyScheduleView from "@/components/dashboard/WeeklyScheduleView";
import MonthlyScheduleView from "@/components/dashboard/MonthlyScheduleView";
import ChatBubble from "@/components/dashboard/ChatBubble";

type ScheduleView = "daily" | "weekly" | "monthly";
type CalendarView = "calendar" | "grid" | "list";

export default function SchedulePage() {
  const { isLoading } = useRequireAuth();
  const [scheduleView, setScheduleView] = useState<ScheduleView>("daily");
  const [calendarView, setCalendarView] = useState<CalendarView>("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());

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
    setCurrentDate(date);
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view as CalendarView);
  };

  return (
    <DashboardLayout>
      <Box>
        {/* Header Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          gap={4}
          borderBottom="1px solid #E4E7EC"
          pb={0} // Removed padding bottom so tabs sit on the line
          mb={6}
        >
          {/* Title and Tabs */}
          <Flex
            direction="column"
            gap={{ base: 4, md: 8 }}
            align={{ base: "start", md: "start" }} // Changed from center to start for alignment
            width={{ base: "100%", md: "auto" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }} // Stack title and buttons vertically on mobile
              justify="space-between"
              align={{ base: "start", md: "center" }} // Align start on mobile
              width={{ base: "100%", md: "auto" }}
              gap={{ base: 4, md: 0 }} // Add gap between title and buttons on mobile
            >
              <Text fontSize="24px" fontWeight={600} color="#1E1E2F">
                Study Schedule
              </Text>

              {/* Mobile Action Buttons (Stacked below title) */}
              <Flex display={{ base: "flex", md: "none" }} gap={3} align="center" width="100%">
                <Button
                  variant="outline"
                  borderColor="#7A5FFF"
                  color="#7A5FFF"
                  fontSize="14px"
                  fontWeight={500}
                  px={4}
                  py={2}
                  h="40px"
                  borderRadius="8px"
                  flex={1} // Make buttons full width on mobile if desired, or remove flex={1}
                  _hover={{ bg: "#F9FAFB" }}
                >
                  <Image src="/export.svg" alt="Export" />
                  <Text ml={2}>Export</Text>
                </Button>

                <Button
                  bg="#7A5FFF"
                  color="white"
                  fontSize="14px"
                  fontWeight={500}
                  px={4}
                  py={2}
                  h="40px"
                  borderRadius="8px"
                  _hover={{ bg: "#6B4FEF" }}
                >
                  <Text>Add a Study Block</Text>
                </Button>
              </Flex>
            </Flex>

            <Tabs.Root
              value={scheduleView}
              onValueChange={(e) => setScheduleView(e.value as ScheduleView)}
              variant="plain"
            >
              <Tabs.List bg="transparent" gap={4} borderBottom="none">
                <Tabs.Trigger
                  value="daily"
                  px={2}
                  py={2}
                  borderRadius="0"
                  fontSize="16px"
                  fontWeight={500}
                  color={scheduleView === "daily" ? "#7A5FFF" : "#667085"}
                  borderBottom={
                    scheduleView === "daily" ? "2px solid #7A5FFF" : "none"
                  }
                  _hover={{ color: "#7A5FFF" }}
                  _selected={{ color: "#7A5FFF" }}
                  cursor="pointer"
                  mb="-1px" // Push border down to overlap with container border
                >
                  Daily
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="weekly"
                  px={2}
                  py={2}
                  borderRadius="0"
                  fontSize="16px"
                  fontWeight={500}
                  color={scheduleView === "weekly" ? "#7A5FFF" : "#667085"}
                  borderBottom={
                    scheduleView === "weekly" ? "2px solid #7A5FFF" : "none"
                  }
                  _hover={{ color: "#7A5FFF" }}
                  _selected={{ color: "#7A5FFF" }}
                  cursor="pointer"
                  mb="-1px"
                >
                  Weekly
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="monthly"
                  px={2}
                  py={2}
                  borderRadius="0"
                  fontSize="16px"
                  fontWeight={500}
                  color={scheduleView === "monthly" ? "#7A5FFF" : "#667085"}
                  borderBottom={
                    scheduleView === "monthly" ? "2px solid #7A5FFF" : "none"
                  }
                  _hover={{ color: "#7A5FFF" }}
                  _selected={{ color: "#7A5FFF" }}
                  cursor="pointer"
                  mb="-1px"
                >
                  Monthly
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </Flex>

          {/* Desktop Action Buttons */}
          <Flex display={{ base: "none", md: "flex" }} gap={3} align="center" pb={4}>
            <Button
              variant="outline"
              borderColor="#7A5FFF"
              color="#7A5FFF"
              fontSize="14px"
              fontWeight={500}
              px={4}
              py={2}
              h="40px"
              borderRadius="8px"
              _hover={{ bg: "#F9FAFB" }}
            >
              <Image src="/export.svg" alt="Export" />
              <Text ml={2}>Export</Text>
            </Button>

            <Button
              bg="#7A5FFF"
              color="white"
              fontSize="14px"
              fontWeight={500}
              px={4}
              py={2}
              h="40px"
              borderRadius="8px"
              _hover={{ bg: "#6B4FEF" }}
            >
              <Text>Add a Study Block</Text>
            </Button>
          </Flex>
        </Flex>

        {/* Date Navigator */}
        <DateNavigator
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
          showViewToggle={true}
          dateFormat="short"
          showDatePicker={true}
          showTodayButton={true}
          step={
            scheduleView === "monthly"
              ? "month"
              : scheduleView === "weekly"
              ? "week"
              : "day"
          }
        />

        {/* Tab Content */}
        <Tabs.Root value={scheduleView}>
          <Tabs.Content value="daily">
            <DailyScheduleView
              date={currentDate}
              viewMode={calendarView === "list" ? "list" : "calendar"}
            />
          </Tabs.Content>

          <Tabs.Content value="weekly">
            <WeeklyScheduleView
              currentDate={currentDate}
              viewMode={calendarView === "list" ? "list" : "calendar"}
            />
          </Tabs.Content>

          <Tabs.Content value="monthly">
            <MonthlyScheduleView
              currentDate={currentDate}
              viewMode={calendarView === "list" ? "list" : "calendar"}
            />
          </Tabs.Content>
        </Tabs.Root>

        <ChatBubble />
      </Box>
    </DashboardLayout>
  );
}
