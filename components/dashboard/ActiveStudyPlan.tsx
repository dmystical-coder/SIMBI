"use client";

import { Box, Text, Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getActiveStudyPlans } from "@/lib/dashboard";

interface StudyPlanDisplay {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  iconBg: string;
  iconSrc: string;
}

export default function ActiveStudyPlan() {
  const [studyPlans, setStudyPlans] = useState<StudyPlanDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveStudyPlans();
  }, []);

  const fetchActiveStudyPlans = async () => {
    setIsLoading(true);
    try {
      const plans = await getActiveStudyPlans();

      // Transform study plans to display format
      const displayPlans: StudyPlanDisplay[] = plans
        .slice(0, 3)
        .map((plan, index) => {
          const colors = [
            { bg: "#fff3fe", iconBg: "#ff33ff33", icon: "/icons/book.svg" },
            { bg: "#fffbeb", iconBg: "#f99d0733", icon: "/icons/pencil.svg" },
            { bg: "#f3f2ff", iconBg: "#7a5fff33", icon: "/icons/book.svg" },
          ];
          const colorSet = colors[index % colors.length];

          // Format date range
          const startDate = new Date(plan.startDate);
          const endDate = new Date(plan.endDate);
          const dateRange = `${startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`;

          return {
            id: plan.id,
            title: plan.name,
            subtitle:
              plan.subjects.length > 0 ? plan.subjects.join(", ") : dateRange,
            bgColor: colorSet.bg,
            iconBg: colorSet.iconBg,
            iconSrc: colorSet.icon,
          };
        });

      setStudyPlans(displayPlans);
    } catch (error) {
      console.error("Failed to fetch active study plans:", error);
      // Set empty array on error
      setStudyPlans([]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
      >
        <Text fontSize="20px" fontWeight={600} color="#1e1e2f">
          Active Study Plan
        </Text>
        <Text
          fontSize="14px"
          fontWeight={400}
          color="#7a5fff"
          cursor="pointer"
          _hover={{ opacity: 0.8, textDecoration: "underline" }}
        >
          View All
        </Text>
      </Box>

      <Stack gap="20px">
        {isLoading ? (
          <Text fontSize="14px" color="#a5a0be" textAlign="center" py="20px">
            Loading study plans...
          </Text>
        ) : studyPlans.length === 0 ? (
          <Box bg="#f3f2ff" borderRadius="16px" p="24px" textAlign="center">
            <Text fontSize="14px" color="#5b616e" mb="8px">
              No active study plans yet
            </Text>
            <Text fontSize="12px" color="#a5a0be">
              Complete your pre-assessment to generate a personalized study plan
            </Text>
          </Box>
        ) : (
          studyPlans.map((plan) => (
            <Box
              key={plan.id}
              bg={plan.bgColor}
              borderRadius="16px"
              p="16px"
              display="flex"
              alignItems="center"
              gap="14px"
              position="relative"
              cursor="pointer"
              _hover={{ opacity: 0.9 }}
              transition="opacity 0.2s"
            >
              {/* Icon */}
              <Box
                w="48px"
                h="48px"
                bg={plan.iconBg}
                borderRadius="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Image
                  src={plan.iconSrc}
                  alt={plan.title}
                  w="auto"
                  h="auto"
                  maxW="24px"
                  maxH="24px"
                />
              </Box>

              {/* Content */}
              <Box flex={1}>
                <Text fontSize="12px" fontWeight={500} color="#1e1e2f" mb="4px">
                  {plan.title}
                </Text>
                <Text fontSize="12px" fontWeight={400} color="#d2d0de">
                  {plan.subtitle}
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
