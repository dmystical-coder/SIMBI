"use client";

import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import {
  getStudyPlans,
  getStudySessions,
  calculateProductivityStats,
  type StudySession,
  type ProductivityStats,
} from "@/lib/dashboard";

type TimeFrame = "week" | "month" | "year";

export default function ProductivityScorecard() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("week");
  const [stats, setStats] = useState<ProductivityStats>({
    totalStudyHours: 0,
    totalStudySessions: 0,
    averageRating: 0,
    timeFrame: "week",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductivityData = useCallback(async () => {
    setIsLoading(true);
    try {
      const studyPlans = await getStudyPlans();
      const allSessions: StudySession[] = [];

      // Fetch sessions from all study plans
      for (const plan of studyPlans) {
        const sessions = await getStudySessions(plan.id);
        allSessions.push(...sessions);
      }

      // Calculate stats based on selected timeframe
      const calculatedStats = calculateProductivityStats(
        allSessions,
        selectedTimeFrame
      );
      setStats(calculatedStats);
    } catch (error) {
      console.error("Failed to fetch productivity data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTimeFrame]);

  useEffect(() => {
    fetchProductivityData();
  }, [fetchProductivityData]);

  // Calculate percentages for circular progress
  const studyHoursPercentage = Math.min(
    (stats.totalStudyHours /
      (selectedTimeFrame === "week"
        ? 40
        : selectedTimeFrame === "month"
        ? 160
        : 2000)) *
      100,
    100
  );
  const sessionsPercentage = Math.min(
    (stats.totalStudySessions /
      (selectedTimeFrame === "week"
        ? 20
        : selectedTimeFrame === "month"
        ? 80
        : 1000)) *
      100,
    100
  );
  const ratingPercentage = (stats.averageRating / 5) * 100;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        flexWrap="wrap"
        gap="10px"
      >
        <Text fontSize="18px" fontWeight={600} color="#1E1E2F">
          Productivity Scorecard
        </Text>
        <Box display="flex" gap="15px">
          {(["week", "month", "year"] as TimeFrame[]).map((timeFrame) => (
            <Text
              key={timeFrame}
              fontSize="14px"
              fontWeight={500}
              color={selectedTimeFrame === timeFrame ? "#7a5fff" : "#c9c0d4"}
              cursor="pointer"
              onClick={() => setSelectedTimeFrame(timeFrame)}
              _hover={{ opacity: 0.8 }}
            >
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </Text>
          ))}
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="20px">
        {/* Study Hours */}
        <Box
          bg="white"
          borderRadius="16px"
          boxShadow="0px 0px 2px rgba(0, 0, 0, 0.06)"
          flex="1"
          minW={{ base: "100%", sm: "200px", md: "150px" }}
          border="1px solid #e5e7eb"
          p="32px 20px 28px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="18px" fontWeight={600} color="#111827" mb="12px">
            Study Hours
          </Text>

          <Box
            position="relative"
            w="160px"
            h="100px"
            mx="auto"
            mb="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg
              width="160"
              height="100"
              viewBox="0 0 160 100"
              style={{ overflow: "visible" }}
            >
              {/* Background arc */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Progress arc */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#5d5fef"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${Math.PI * 65}`}
                strokeDashoffset={`${
                  Math.PI * 65 * (1 - studyHoursPercentage / 100)
                }`}
              />
              <text
                x="80"
                y="72"
                textAnchor="middle"
                fontSize="48"
                fontWeight="600"
                fill="#111827"
              >
                {isLoading ? "..." : Math.round(stats.totalStudyHours)}
              </text>
            </svg>
          </Box>

          <Text fontSize="16px" fontWeight={500} color="#111827" mb="6px">
            {stats.totalStudyHours >= 10 ? "Great Job!" : "Keep Going!"}
          </Text>
          <Text fontSize="13px" fontWeight={400} color="#9ca3af" mb="20px">
            Optimize your study hours
          </Text>
          <Button
            fontSize="13px"
            fontWeight={600}
            color="#7a5fff"
            bg="#f3f2ff"
            h="32px"
            px="24px"
            borderRadius="6px"
            _hover={{ bg: "#e9e7ff" }}
          >
            Tips
          </Button>
        </Box>

        {/* Study Session */}
        <Box
          position="relative"
          bg="white"
          borderRadius="16px"
          boxShadow="0px 0px 2px rgba(0, 0, 0, 0.06)"
          flex="1"
          minW={{ base: "100%", sm: "200px", md: "150px" }}
          border="1px solid #e5e7eb"
          p="32px 20px 28px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="18px" fontWeight={600} color="#111827" mb="12px">
            Study Session
          </Text>

          <Box
            w="160px"
            h="160px"
            mx="auto"
            mb="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Left Arrow */}
            <Box
              position="absolute"
              left="2"
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              _hover={{ opacity: 0.5 }}
              transition="opacity 0.2s"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12 16L6 10L12 4"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>

            {/* Circular Progress */}
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#fef3c7"
                strokeWidth="16"
              />
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${
                  2 * Math.PI * 60 * (1 - sessionsPercentage / 100)
                }`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
              />
              <text
                x="70"
                y="85"
                textAnchor="middle"
                fontSize="52"
                fontWeight="600"
                fill="#111827"
              >
                {isLoading
                  ? ".."
                  : String(stats.totalStudySessions).padStart(2, "0")}
              </text>
            </svg>

            {/* Right Arrow */}
            <Box
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              _hover={{ opacity: 0.5 }}
              transition="opacity 0.2s"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 16L14 10L8 4"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Box>

          <Text fontSize="16px" fontWeight={500} color="#111827">
            Focus Time
          </Text>
        </Box>

        {/* Rating */}
        <Box
          bg="white"
          borderRadius="16px"
          boxShadow="0px 0px 2px rgba(0, 0, 0, 0.06)"
          flex="1"
          minW={{ base: "100%", sm: "200px", md: "150px" }}
          border="1px solid #e5e7eb"
          p="32px 20px 28px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="18px" fontWeight={600} color="#111827" mb="12px">
            Rating
          </Text>
          <Box
            position="relative"
            w="160px"
            h="100px"
            mx="auto"
            mb="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg
              width="160"
              height="100"
              viewBox="0 0 160 100"
              style={{ overflow: "visible" }}
            >
              {/* Background arc */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Progress arc */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#5d5fef"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${Math.PI * 65}`}
                strokeDashoffset={`${
                  Math.PI * 65 * (1 - ratingPercentage / 100)
                }`}
              />
            </svg>
            <Image
              className="absolute w-12 h-12 bottom-0"
              src="/smiley.svg"
              alt="Rating indicator"
            />
          </Box>{" "}
          <Text fontSize="16px" fontWeight={500} color="#111827" mb="6px">
            {Math.round(ratingPercentage)}% Brainpower
          </Text>
          <Text fontSize="13px" fontWeight={400} color="#9ca3af" mb="20px">
            {ratingPercentage >= 70 ? "Keep it up!" : "You can do better!"}
          </Text>
          <Button
            fontSize="13px"
            fontWeight={600}
            color="#7a5fff"
            bg="#f3f2ff"
            h="32px"
            px="24px"
            borderRadius="6px"
            _hover={{ bg: "#e9e7ff" }}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
