"use client";

import { Box, Grid, Text, Flex } from "@chakra-ui/react";

interface StudySession {
  subject: string;
  color: string;
  textColor: string;
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
                  {day.sessions.map((session, sIdx) => (
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
                      <Text
                        fontWeight="600"
                        fontSize="14px"
                        color={session.textColor}
                      >
                        {session.subject}
                      </Text>
                    </Flex>
                  ))}
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
      p={6}
    >
      {/* Week Grid */}
      <Grid
        templateColumns={{
          base: "repeat(7, 1fr)",
          md: "repeat(7, 1fr)",
        }}
        gap={4}
      >
        {weekData.map((day) => (
          <Box key={day.date}>
            {/* Day Header */}
            <Flex
              direction="column"
              align="center"
              mb={3}
              pb={2}
              borderBottom="1px solid #F2F4F7"
            >
              <Text fontSize="12px" fontWeight={500} color="#667085" mb={1}>
                {day.day}
              </Text>
              <Text fontSize="16px" fontWeight={600} color="#101828">
                {day.date}
              </Text>
            </Flex>

            {/* Study Sessions */}
            <Flex direction="column" gap={2}>
              {day.sessions.map((session, idx) => (
                <Box
                  key={idx}
                  bg={session.color}
                  borderRadius="6px"
                  p={2}
                  minH="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={{ base: "10px", md: "12px" }}
                    fontWeight={500}
                    color={session.textColor}
                    textAlign="center"
                    lineClamp={2}
                  >
                    {session.subject}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </Grid>
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
  };
  const economics = {
    subject: "Economics",
    color: "#FFF9E6",
    textColor: "#B54708",
  };
  const physics = {
    subject: "Physics",
    color: "#F4F3FF",
    textColor: "#5925DC",
  };
  const smartMoney = {
    subject: "Smart Money",
    color: "#ECFDF3",
    textColor: "#027A48",
  };
  const mathematics = {
    subject: "Mathematics",
    color: "#ECFDF3",
    textColor: "#027A48",
  };
  const biology = {
    subject: "Biology",
    color: "#FFF9E6",
    textColor: "#B54708",
  };

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    
    const dayName = currentDay.toLocaleDateString("en-US", { weekday: "short" });
    const dayDate = currentDay.getDate();
    const daySessions: StudySession[] = [];

    // Simulate recurring weekly patterns
    // Assuming week starts Sunday (index 0)
    if (i === 2) { // Tuesday
       daySessions.push(chemistry, economics, physics, smartMoney);
    }
    if (i === 3) { // Wednesday
       daySessions.push(chemistry, biology, physics, smartMoney);
    }
    if (i === 4) { // Thursday
       daySessions.push(chemistry, biology);
    }
    if (i === 5) { // Friday
       daySessions.push(chemistry, biology, physics, smartMoney);
    }
    if (i === 6) { // Saturday
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
