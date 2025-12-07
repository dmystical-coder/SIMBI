"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SimbiStreakOverlay from "./SimbiStreakOverlay";
import {
  getStudyPlans,
  getStudySessions,
  calculateStudyStreak,
  getAllMilestones,
  type StudySession,
  type StudyStreakData,
} from "@/lib/dashboard";

export default function StudyStreak() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [streakData, setStreakData] = useState<StudyStreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: "",
  });
  const [weeklyMilestones, setWeeklyMilestones] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStreakData();
  }, []);

  const fetchStreakData = async () => {
    setIsLoading(true);
    try {
      const studyPlans = await getStudyPlans();
      const allSessions: StudySession[] = [];

      // Fetch sessions from all study plans
      for (const plan of studyPlans) {
        const sessions = await getStudySessions(plan.id);
        allSessions.push(...sessions);
      }

      // Calculate streak
      const streak = calculateStudyStreak(allSessions);
      setStreakData(streak);

      // Get weekly milestones
      const milestones = await getAllMilestones();
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weeklyCompleted = milestones.filter((m) => {
        const dueDate = new Date(m.dueDate);
        return m.completed && dueDate >= weekAgo && dueDate <= now;
      }).length;
      setWeeklyMilestones(weeklyCompleted);
    } catch (error) {
      console.error("Failed to fetch streak data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine Simbi's mood based on streak
  const getSimbiMood = () => {
    if (streakData.currentStreak >= 7) return "Ecstatic";
    if (streakData.currentStreak >= 5) return "Happy";
    if (streakData.currentStreak >= 3) return "Good";
    if (streakData.currentStreak >= 1) return "Okay";
    return "Sad";
  };

  return (
    <Box>
      <Text fontSize="18px" fontWeight={600} color="#1e1e2f" mb="15px">
        Study Streak
      </Text>

      <Box display="flex" flexWrap="wrap" gap="20px">
        {/* Consecutive Days */}
        <Box
          flex="1"
          minW="150px"
          border="0.5px solid #d8dbdf"
          borderRadius="8px"
          p="16px"
          cursor="pointer"
          onClick={() => setIsOverlayOpen(true)}
          _hover={{
            borderColor: "#7a5fff",
            boxShadow: "0 0 0 1px #7a5fff",
          }}
          transition="all 0.2s"
        >
          <Text
            fontSize="14px"
            fontWeight={400}
            color="#5b616e"
            mb="13px"
            lineHeight="13.45px"
          >
            Consecutive Days
          </Text>
          <Box display="flex" alignItems="center" gap="5px">
            <Text
              fontSize="16px"
              fontWeight={500}
              color="#000000"
              lineHeight="20.25px"
            >
              {isLoading ? "..." : streakData.currentStreak}
            </Text>
            <Image src="/icons/fire.svg" alt="Fire" w="16px" h="20px" />
          </Box>
        </Box>

        {/* Simbi's Mood */}
        <Box
          flex="1"
          border="0.5px solid #d8dbdf"
          borderRadius="8px"
          minW="150px"
          p="16px"
        >
          <Text
            fontSize="14px"
            fontWeight={400}
            color="#5b616e"
            mb="13px"
            lineHeight="13.50px"
          >
            Simbi's Mood
          </Text>
          <Text
            fontSize="16px"
            fontWeight={500}
            color="#000000"
            lineHeight="20.25px"
          >
            {isLoading ? "..." : getSimbiMood()}
          </Text>
        </Box>

        {/* Weekly Goal */}
        <Box
          flex="1"
          minW="150px"
          border="0.5px solid #d8dbdf"
          borderRadius="8px"
          p="16px"
          position="relative"
        >
          <Text
            fontSize="14px"
            fontWeight={400}
            color="#5b616e"
            mb="13px"
            lineHeight="13.50px"
          >
            Weekly goal
          </Text>
          <Text
            fontSize="16px"
            fontWeight={500}
            color="#000000"
            lineHeight="20.25px"
          >
            {isLoading ? "..." : weeklyMilestones} milestones
          </Text>
          <Box position="absolute" right="16px" top="16px" cursor="pointer">
            <Image src="/icons/more.svg" alt="Dot" />
          </Box>
        </Box>
      </Box>

      {/* Simbi Streak Overlay */}
      <SimbiStreakOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        consecutiveDays={streakData.currentStreak}
      />
    </Box>
  );
}
