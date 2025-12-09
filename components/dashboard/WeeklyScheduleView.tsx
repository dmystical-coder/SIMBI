"use client";

import { Box, Grid, Text, Flex } from "@chakra-ui/react";

interface StudySession {
  subject: string;
  color: string;
  textColor: string;
  startTime: string;
  duration: number;
}

interface DaySchedule {
  day: string;
  date: number;
  sessions: StudySession[];
}

interface WeeklyScheduleViewProps {
  currentDate?: Date;
  viewMode?: "calendar" | "list";
}

export default function WeeklyScheduleView({
  currentDate = new Date(),
  viewMode = "calendar",
}: WeeklyScheduleViewProps) {
  const weekData = generateWeeklyData(currentDate);

  // Constants for Time Grid
  const startHour = 0;
  const endHour = 23;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );
  const HOUR_HEIGHT = 64;
  const TOP_OFFSET = 24;

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
    // Flatten week data into a list of days with sessions
    const daysWithSessions = weekData.filter((day) => day.sessions.length > 0);

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
          {daysWithSessions.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={8}>
              No study sessions scheduled for this week.
            </Text>
          ) : (
            daysWithSessions.map((day, index) => (
              <Box
                key={index}
                borderBottom="1px solid"
                borderColor="gray.100"
                pb={4}
                mb={2}
              >
                <Text
                  fontSize="16px"
                  fontWeight={600}
                  color="dark.950"
                  mb={3}
                >
                  {`${day.day}, ${day.date}`}
                </Text>
                <Flex direction="column" gap={3}>
                  {day.sessions.map((session, sIdx) => {
                    // Calculate end time for display
                    const [h, m] = session.startTime.split(":").map(Number);
                    const start = new Date();
                    start.setHours(h, m);
                    const end = new Date(start.getTime() + session.duration * 60000);
                    const timeStr = `${start.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}`;

                    return (
                      <Flex
                        key={sIdx}
                        bg={session.color}
                        p={3}
                        borderRadius="8px"
                        align="center"
                        justify="space-between"
                        borderLeft="4px solid"
                        borderColor={session.textColor}
                      >
                        <Box>
                          <Text
                            fontWeight="600"
                            fontSize="14px"
                            color={session.textColor}
                          >
                            {session.subject}
                          </Text>
                          <Text fontSize="12px" color={session.textColor} opacity={0.8}>
                            {timeStr}
                          </Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>
              </Box>
            ))
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
      border="1px solid #E4E7EC"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Outer wrapper for horizontal scroll on mobile */}
      <Box
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#D0D5DD",
            borderRadius: "3px",
          },
        }}
      >
        <Box minW={{ base: "800px", md: "100%" }}>
          {/* Header Row (Days) */}
          <Flex borderBottom="1px solid" borderColor="gray.200" bg="white">
            <Box w="60px" flexShrink={0} bg="white" position="sticky" left={0} zIndex={20} borderRight="1px solid" borderColor="gray.100" />
            <Grid
              templateColumns="repeat(7, 1fr)"
              gap={0}
              flex={1}
            >
              {weekData.map((day) => (
                <Box
                  key={day.date}
                  p={3}
                  textAlign="center"
                  borderLeft="1px solid"
                  borderColor="gray.100"
                >
                  <Text fontSize="12px" color="gray.500" fontWeight="500">
                    {day.day}
                  </Text>
                  <Text fontSize="16px" fontWeight="600" color="dark.950">
                    {day.date}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Flex>

          {/* Scrollable Body */}
          <Box
            height="800px" // Fixed height for vertical scroll
            overflowY="auto"
            position="relative"
            css={{
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
            <Flex position="relative" minH={`${hours.length * HOUR_HEIGHT + TOP_OFFSET}px`}>
              {/* Time Labels (Sticky Left) */}
              <Box
                w="60px"
                flexShrink={0}
                position="sticky"
                left={0}
                bg="white"
                zIndex={10}
                borderRight="1px solid"
                borderColor="gray.100"
              >
                {hours.map((hour) => (
                  <Box
                    key={hour}
                    position="absolute"
                    top={`${(hour - startHour) * HOUR_HEIGHT + TOP_OFFSET}px`}
                    w="100%"
                    textAlign="right"
                    pr={2}
                  >
                    <Text
                      fontSize="12px"
                      color="gray.400"
                      transform="translateY(-50%)"
                    >
                      {formatTime(hour)}
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* Main Grid */}
              <Box flex={1} position="relative">
                <Grid
                  templateColumns="repeat(7, 1fr)"
                  gap={0}
                  height="100%"
                  position="relative"
                >
                  {/* Background Lines */}
                  <Box position="absolute" inset={0} zIndex={0}>
                    {hours.map((hour) => (
                      <Box
                        key={hour}
                        position="absolute"
                        top={`${(hour - startHour) * HOUR_HEIGHT + TOP_OFFSET}px`}
                        left={0}
                        right={0}
                        borderBottom="1px solid"
                        borderColor="gray.50"
                      />
                    ))}
                  </Box>

                  {/* Day Columns */}
                  {weekData.map((day) => (
                    <Box
                      key={day.date}
                      position="relative"
                      borderLeft="1px solid"
                      borderColor="gray.100"
                      height="100%"
                      zIndex={1}
                    >
                      {day.sessions.map((session, idx) => {
                        const { top, height } = getPositionStyle(
                          session.startTime,
                          session.duration
                        );
                        return (
                          <Box
                            key={idx}
                            position="absolute"
                            top={top}
                            height={height}
                            left="2px"
                            right="2px"
                            bg={session.color}
                            borderRadius="6px"
                            p={1}
                            fontSize="10px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            overflow="hidden"
                          >
                            <Text
                              fontWeight="600"
                              color={session.textColor}
                              lineClamp={1}
                            >
                              {session.subject}
                            </Text>
                          </Box>
                        );
                      })}
                    </Box>
                  ))}
                </Grid>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Helper to generate dynamic week data
function generateWeeklyData(date: Date): DaySchedule[] {
  const weekData: DaySchedule[] = [];
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day; // Adjust so week starts on Sunday
  startOfWeek.setDate(diff);

  const chemistry = {
    subject: "Chemistry",
    color: "#FFEAFA",
    textColor: "#C01048",
    startTime: "09:00",
    duration: 60,
  };
  const economics = {
    subject: "Economics",
    color: "#FFF9E6",
    textColor: "#B54708",
    startTime: "10:30",
    duration: 90,
  };
  const physics = {
    subject: "Physics",
    color: "#F4F3FF",
    textColor: "#5925DC",
    startTime: "13:00",
    duration: 60,
  };
  const smartMoney = {
    subject: "Smart Money",
    color: "#ECFDF3",
    textColor: "#027A48",
    startTime: "14:30",
    duration: 45,
  };
  const mathematics = {
    subject: "Mathematics",
    color: "#ECFDF3",
    textColor: "#027A48",
    startTime: "16:00",
    duration: 60,
  };
  const biology = {
    subject: "Biology",
    color: "#FFF9E6",
    textColor: "#B54708",
    startTime: "11:00",
    duration: 60,
  };

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);

    const dayName = currentDay.toLocaleDateString("en-US", { weekday: "short" });
    const dayDate = currentDay.getDate();
    const daySessions: StudySession[] = [];

    // Simulate recurring weekly patterns
    // Assuming week starts Sunday (index 0)
    if (i === 2) {
      // Tuesday
      daySessions.push(chemistry, economics, physics, smartMoney);
    }
    if (i === 3) {
      // Wednesday
      daySessions.push(chemistry, biology, physics, smartMoney);
    }
    if (i === 4) {
      // Thursday
      daySessions.push(chemistry, biology);
    }
    if (i === 5) {
      // Friday
      daySessions.push(chemistry, biology, physics, smartMoney);
    }
    if (i === 6) {
      // Saturday
      daySessions.push(chemistry, mathematics);
    }

    weekData.push({
      day: dayName,
      date: dayDate,
      sessions: daySessions,
    });
  }

  return weekData;
}
