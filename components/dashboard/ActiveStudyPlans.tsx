"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { StudyPlan } from "@/types/dashboard";
import { formatTimeRange, formatDate } from "@/lib/mockData";

interface ActiveStudyPlansProps {
  plans: StudyPlan[];
  showAll?: boolean;
}

export function ActiveStudyPlans({ plans, showAll = false }: ActiveStudyPlansProps) {
  const displayPlans = showAll ? plans : plans.slice(0, 2);
  const todayPlans = showAll ? plans.slice(2) : [];

  const getIcon = (subject: string, type: string) => {
    if (type === "Test") return "/icons/pencil-yellow.svg";
    if (subject === "Chemistry") return "/icons/book-pink.svg";
    if (subject === "Biology") return "/icons/pencil-yellow.svg";
    return "/icons/book-pink.svg";
  };

  return (
    <Flex gap="20px">
      {/* Left Column */}
      <Box flex={1}>
        <Flex justify="space-between" align="center" mb={5}>
          <Text fontSize="20px" fontWeight="600" color="#1E1E2F">
            Active Study Plan
          </Text>
          <Text fontSize="14px" fontWeight="400" color="#7A5FFF" cursor="pointer">
            View All
          </Text>
        </Flex>

        <Flex direction="column" gap="20px">
          {displayPlans.map((plan) => {
            const iconSrc = getIcon(plan.subject, plan.type);
            return (
              <Box
                key={plan.id}
                bg={plan.backgroundColor}
                borderRadius="16px"
                p={4}
                position="relative"
              >
                <Flex align="center" gap={4}>
                  <Box
                    w="48px"
                    h="48px"
                    borderRadius="12px"
                    bg="rgba(255,255,255,0.6)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={iconSrc} alt={plan.subject} w="24px" h="24px" />
                  </Box>
                  
                  <Box flex={1}>
                    <Text fontSize="12px" fontWeight="500" color="#1E1E2F">
                      {plan.type} - {plan.subject}
                    </Text>
                    <Text fontSize="12px" fontWeight="400" color="#D2D0DE">
                      {formatTimeRange(plan.startTime, plan.endTime)}
                    </Text>
                  </Box>

                  <Image src="/icons/more-vertical.svg" alt="More" w="4px" h="18px" cursor="pointer" />
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>

      {/* Right Column - Today's Plans */}
      {todayPlans.length > 0 && (
        <Box flex={1}>
          <Flex align="center" gap={2} mb={5}>
            <Image src="/icons/calendar-purple.svg" alt="Calendar" w="24px" h="24px" />
            <Text fontSize={{ base: "16px", lg: "18px" }} fontWeight="400" color="#7A5FFF">
              {formatDate(new Date())}
            </Text>
          </Flex>

          <Flex direction="column" gap="20px">
            {todayPlans.map((plan) => {
              const iconSrc = getIcon(plan.subject, plan.type);
              return (
                <Box
                  key={plan.id}
                  bg={plan.backgroundColor}
                  borderRadius="16px"
                  p={4}
                  position="relative"
                >
                  <Flex align="center" gap={4}>
                    <Box
                      w="48px"
                      h="48px"
                      borderRadius="12px"
                      bg="rgba(255,255,255,0.6)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image src={iconSrc} alt={plan.subject} w="24px" h="24px" />
                    </Box>
                    
                    <Box flex={1}>
                      <Text fontSize="12px" fontWeight="500" color="#1E1E2F">
                        {plan.type} - {plan.subject}
                      </Text>
                      <Text fontSize="12px" fontWeight="400" color="#D2D0DE">
                        {formatTimeRange(plan.startTime, plan.endTime)}
                      </Text>
                    </Box>

                    <Image src="/icons/more-vertical.svg" alt="More" w="4px" h="18px" cursor="pointer" />
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}