"use client";

import { Box, Flex, Text, Grid } from "@chakra-ui/react";

interface StudyBlock {
  id: string;
  subject: string;
  startTime: string; // "09:00", "14:30"
  duration: number; // in minutes
  color: string;
  textColor: string;
}

interface DailyScheduleViewProps {
  date: Date;
  studyBlocks?: StudyBlock[];
  viewMode?: "calendar" | "list";
}

export default function DailyScheduleView({
  date,
  viewMode = "calendar",
  studyBlocks = [
    {
      id: "1",
      subject: "Chemistry",
      startTime: "09:00",
      duration: 60,
      color: "#FFEAFA", // Pinkish
      textColor: "#C01048",
    },
    {
      id: "2",
      subject: "Biology",
      startTime: "11:00",
      duration: 60,
      color: "#FFF9E6", // Yellowish
      textColor: "#B54708",
    },
    {
      id: "3",
      subject: "Physics",
      startTime: "13:00",
      duration: 60,
      color: "#F4F3FF", // Light Purple/Blue
      textColor: "#5925DC",
    },
    {
      id: "4",
      subject: "Smart Money",
      startTime: "14:00",
      duration: 60,
      color: "#F9FAFB", // Gray/White
      textColor: "#344054",
    },
    {
      id: "5",
      subject: "Mathematics",
      startTime: "15:00",
      duration: 60,
      color: "#ECFDF3", // Greenish
      textColor: "#027A48",
    },
  ],
}: DailyScheduleViewProps) {
  // Generate time slots from 12 AM to 11 PM
  const startHour = 0;
  const endHour = 23;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  const HOUR_HEIGHT = 64;
  const TOP_OFFSET = 24; // Space at the top so the first label isn't cut off

  // Helper to calculate position based on time
  const getPositionStyle = (time: string, duration: number) => {
    const [h, m] = time.split(":").map(Number);
    const startMinutes = (h - startHour) * 60 + m;
    const top = `${(startMinutes / 60) * HOUR_HEIGHT + TOP_OFFSET}px`;
    const height = `${(duration / 60) * HOUR_HEIGHT}px`;
    return { top, height };
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return "12am";
    if (hour === 12) return "12pm";
    const period = hour >= 12 ? "pm" : "am";
    const h = hour % 12 || 12;
    return `${h}${period}`;
  };

  if (viewMode === "list") {
    // Sort blocks by time for list view
    const sortedBlocks = [...studyBlocks].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

    return (
      <Box
        mt={6}
        bg="white"
        borderRadius="12px"
        border="1px solid"
        borderColor="state.200"
        p={6}
      >
        <Flex direction="column" gap={4}>
          {sortedBlocks.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={8}>
              No study sessions scheduled for today.
            </Text>
          ) : (
            sortedBlocks.map((block) => {
              // Parse start time to calculate end time
              const [h, m] = block.startTime.split(":").map(Number);
              const startDate = new Date();
              startDate.setHours(h, m);
              const endDate = new Date(startDate.getTime() + block.duration * 60000);
              
              const formatTimeStr = (date: Date) => {
                return date.toLocaleTimeString("en-US", { 
                  hour: "numeric", 
                  minute: "2-digit", 
                  hour12: true 
                }).toLowerCase();
              };

              return (
                <Flex
                  key={block.id}
                  bg={block.color}
                  borderRadius="12px"
                  p={4}
                  align="center"
                  justify="space-between"
                  borderLeft="4px solid"
                  borderColor={block.textColor}
                >
                  <Box>
                    <Text fontWeight="600" fontSize="16px" color={block.textColor}>
                      {block.subject}
                    </Text>
                    <Text fontSize="14px" color={block.textColor} opacity={0.8} mt={1}>
                      {formatTimeStr(startDate)} - {formatTimeStr(endDate)}
                    </Text>
                  </Box>
                  <Text fontSize="14px" fontWeight="500" color={block.textColor}>
                    {block.duration} min
                  </Text>
                </Flex>
              );
            })
          )}
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      mt={6}
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="state.200"
      overflow="hidden"
      maxH="800px" // Fixed height with scroll for day view
      display="flex"
      flexDirection="column"
    >
      <Box
        overflowY="auto"
        flex={1}
        position="relative"
        sx={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.200",
            borderRadius: "24px",
          },
        }}
      >
        <Box
          position="relative"
          minH={`${hours.length * HOUR_HEIGHT + TOP_OFFSET + 24}px`} // Add bottom padding space
          py={0}
        >
          {/* Grid Lines and Time Labels */}
          {hours.map((hour) => (
            <Flex
              key={hour}
              position="absolute"
              top={`${(hour - startHour) * HOUR_HEIGHT + TOP_OFFSET}px`}
              left={0}
              right={0}
              height={`${HOUR_HEIGHT}px`}
              align="flex-start"
              borderBottom="1px solid" // This creates the line below the label? No, we want line AT the label usually
              borderColor="gray.50"
              sx={{
                // Optional: remove border for the last one if desired, but for time slots usually we want lines
                borderBottom: "none", // Reset flex border
              }}
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                borderTop="1px solid"
                borderColor="gray.50"
              />
              <Text
                width="60px"
                textAlign="right"
                pr={4}
                fontSize="xs"
                color="gray.400"
                fontWeight="medium"
                transform="translateY(-50%)"
                position="relative" // Ensure z-index works if needed
                bg="white" // background to cover line if needed, though usually label is to the left
              >
                {formatTime(hour)}
              </Text>
            </Flex>
          ))}

          {/* Events */}
          <Box position="absolute" top={0} left="60px" right={0} bottom={0}>
            {studyBlocks.map((block) => {
              const { top, height } = getPositionStyle(
                block.startTime,
                block.duration
              );
              return (
                <Box
                  key={block.id}
                  position="absolute"
                  top={top}
                  height={height}
                  left="2%"
                  right="2%"
                  bg={block.color}
                  color={block.textColor}
                  borderRadius="12px"
                  px={4}
                  py={3}
                  fontSize="sm"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  boxShadow="none" // Design appears flat/clean
                  zIndex={1}
                  _hover={{
                    zIndex: 10,
                    transform: "scale(1.01)",
                    transition: "all 0.2s",
                    boxShadow: "sm",
                  }}
                  cursor="pointer"
                >
                  <Box>
                    <Text fontWeight="600" fontSize="14px" lineHeight="1.2">
                      {block.subject}
                    </Text>
                  </Box>
                  <Text fontSize="12px" opacity={0.6} fontWeight="400">
                    {block.duration / 60}hr
                  </Text>
                </Box>
              );
            })}

            {/* Current Time Indicator (Visual aid) */}
            {/* We could add a line here for the current time if needed */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

