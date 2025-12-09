"use client";

import { Box, Grid, Text, Flex } from "@chakra-ui/react";

interface StudySession {
  subject: string;
  color: string;
  textColor: string;
}

interface MonthDay {
  date: number;
  isCurrentMonth: boolean;
  sessions: StudySession[];
}

interface MonthlyScheduleViewProps {
  currentDate?: Date;
  viewMode?: "calendar" | "list";
}

export default function MonthlyScheduleView({
  currentDate = new Date(),
  viewMode = "calendar",
}: MonthlyScheduleViewProps) {
  const monthData = generateDynamicMonthData(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (viewMode === "list") {
    // Filter days with sessions for list view
    const daysWithSessions = monthData.filter((day) => day.sessions.length > 0);

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
              No study sessions scheduled for this month.
            </Text>
          ) : (
            daysWithSessions.map((day, index) => (
              <Box key={index} borderBottom="1px solid" borderColor="gray.100" pb={4} mb={2}>
                <Text fontSize="16px" fontWeight={600} color="dark.950" mb={3}>
                  {new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
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
                      <Text fontWeight="600" fontSize="14px" color={session.textColor}>
                        {session.subject}
                      </Text>
                      {/* You could add time here if available in the session object */}
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
      borderRadius="12px"
      border="1px solid"
      borderColor="#E4E7EC"
      overflow="hidden"
    >
      <Grid templateColumns="repeat(7, 1fr)" gap="1px" bg="#E4E7EC">
        {weekDays.map((day) => (
          <Box key={day} bg="white" p={4} textAlign="center">
            <Text fontSize="14px" fontWeight={600} color="#101828">
              {day}
            </Text>
          </Box>
        ))}

        {monthData.map((day, index) => (
          <Box
            key={index}
            minH={{ base: "100px", md: "140px" }}
            p={2}
            bg="white"
            position="relative"
          >
            <Text
              fontSize="12px"
              fontWeight={400}
              color={day.isCurrentMonth ? "#667085" : "#D0D5DD"}
              mb={2}
            >
              {day.date}
            </Text>

            <Flex direction="column" gap={1}>
              {day.sessions.slice(0, 3).map((session, idx) => (
                <Box
                  key={idx}
                  bg={session.color}
                  borderRadius="4px"
                  px={2}
                  py={1}
                >
                  <Text
                    fontSize="11px"
                    fontWeight={600}
                    color={session.textColor}
                    lineClamp={1}
                  >
                    {session.subject}
                  </Text>
                </Box>
              ))}
              {day.sessions.length > 3 && (
                <Text fontSize="11px" color="#667085" px={1}>
                  +{day.sessions.length - 3} more
                </Text>
              )}
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

// Generate dynamic month data based on the selected date
function generateDynamicMonthData(date: Date): MonthDay[] {
  const monthData: MonthDay[] = [];
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
  const endDate = lastDayOfMonth.getDate();

  // Previous month padding
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    monthData.push({
      date: prevMonthLastDate - i,
      isCurrentMonth: false,
      sessions: [],
    });
  }

  // Current month days
  // Sample Data (mapped by day of month)
  const chemistry = { subject: "Chemistry", color: "#FFEAFA", textColor: "#C01048" };
  const economics = { subject: "Economics", color: "#FFF9E6", textColor: "#B54708" };
  const physics = { subject: "Physics", color: "#F4F3FF", textColor: "#5925DC" };
  const smartMoney = { subject: "Smart Money", color: "#ECFDF3", textColor: "#027A48" };
  const mathematics = { subject: "Mathematics", color: "#ECFDF3", textColor: "#027A48" };
  const biology = { subject: "Biology", color: "#FFF9E6", textColor: "#B54708" };

  for (let i = 1; i <= endDate; i++) {
    const daySessions: StudySession[] = [];

    // Simulate the pattern from the design, but relative to any month
    // E.g. recurring weekly patterns
    const currentDayOfWeek = new Date(year, month, i).getDay();

    if (currentDayOfWeek === 1) { // Mondays
       if (i % 2 === 0) daySessions.push(chemistry, mathematics);
    }
    if (currentDayOfWeek === 3) { // Wednesdays
       daySessions.push(chemistry, mathematics);
    }
    if (currentDayOfWeek === 5) { // Fridays
       daySessions.push(chemistry, biology, physics, smartMoney);
    }
    
    // Add specific dense days if it matches our "demo" month (April 2025)
    // or just generic randomization for other months so it's not empty
    if (year === 2025 && month === 3) { // April is month 3
        if (i === 21) daySessions.push(chemistry, economics, physics, smartMoney);
        if (i === 22) daySessions.push(chemistry, mathematics);
        if (i === 24) daySessions.push(chemistry, biology, physics, smartMoney);
        if (i === 26) daySessions.push(chemistry, mathematics);
        if (i === 27) daySessions.push(chemistry, biology, physics, smartMoney);
    } 

    monthData.push({
      date: i,
      isCurrentMonth: true,
      sessions: daySessions,
    });
  }

  // Next month padding to fill 6 rows (42 cells) or 5 rows (35 cells)
  const totalSlots = monthData.length > 35 ? 42 : 35;
  const remaining = totalSlots - monthData.length;
  
  for (let i = 1; i <= remaining; i++) {
    monthData.push({
      date: i,
      isCurrentMonth: false,
      sessions: [],
    });
  }

  return monthData;
}
