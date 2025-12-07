"use client";

import { Box, Text, Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getTodaySchedule } from "@/lib/dashboard";

interface ScheduleDisplay {
  id: string;
  title: string;
  time: string;
  bgColor: string;
  iconBg: string;
  iconSrc: string;
  completed: boolean;
}

export default function TodaySchedule() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodaySchedule();
  }, []);

  const fetchTodaySchedule = async () => {
    setIsLoading(true);
    try {
      const schedule = await getTodaySchedule();

      // Transform schedule items to display format
      const displayItems: ScheduleDisplay[] = schedule.map((item) => {
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);
        const timeString = `${startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        // Use different colors based on completion status
        const colors = item.completed
          ? {
              bg: "#f0fdf5",
              iconBg: "#86efac33",
              icon: "/icons/pencil-green.svg",
            }
          : {
              bg: "#f3f4fa",
              iconBg: "#c9c0d433",
              icon: "/icons/pencil-gray.svg",
            };

        return {
          id: item.id,
          title: item.subject,
          time: timeString,
          bgColor: colors.bg,
          iconBg: colors.iconBg,
          iconSrc: colors.icon,
          completed: item.completed,
        };
      });

      setScheduleItems(displayItems);
    } catch (error) {
      console.error("Failed to fetch today's schedule:", error);
      setScheduleItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box>
      {/* Date Header */}
      <Box display="flex" alignItems="center" gap="16px" mb="20px">
        <Image src="/icons/calendar-alt.svg" alt="Calendar" w="24px" h="24px" />
        <Text fontSize="18px" fontWeight={400} color="#7a5fff">
          Today, {formattedDate}
        </Text>
      </Box>

      <Stack gap="20px">
        {isLoading ? (
          <Text fontSize="14px" color="#a5a0be" textAlign="center" py="20px">
            Loading schedule...
          </Text>
        ) : scheduleItems.length === 0 ? (
          <Box bg="#f3f4fa" borderRadius="16px" p="24px" textAlign="center">
            <Text fontSize="14px" color="#5b616e" mb="8px">
              No sessions scheduled for today
            </Text>
            <Text fontSize="12px" color="#a5a0be">
              Enjoy your free time or create a new study session
            </Text>
          </Box>
        ) : (
          scheduleItems.map((item) => (
            <Box
              key={item.id}
              bg={item.bgColor}
              borderRadius="16px"
              p="16px"
              display="flex"
              alignItems="center"
              gap="14px"
              position="relative"
              opacity={item.completed ? 0.7 : 1}
              cursor="pointer"
              _hover={{ opacity: item.completed ? 0.6 : 0.9 }}
              transition="opacity 0.2s"
            >
              {/* Icon */}
              <Box
                w="48px"
                h="48px"
                bg={item.iconBg}
                borderRadius="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={item.iconSrc}
                  alt="Edit"
                  w="auto"
                  h="auto"
                  maxW="24px"
                  maxH="24px"
                />
              </Box>

              {/* Content */}
              <Box flex={1}>
                <Text
                  fontSize="12px"
                  fontWeight={400}
                  color="#1e1e2f"
                  mb="4px"
                  textDecoration={item.completed ? "line-through" : "none"}
                >
                  {item.title}
                </Text>
                <Text fontSize="12px" fontWeight={400} color="#d2d0de">
                  {item.time}
                </Text>
              </Box>

              {/* More options */}
              <Box cursor="pointer">
                <Image src="/icons/more.svg" alt="Dot" />
              </Box>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}
