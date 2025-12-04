"use client";

import { useState } from "react";
import { Box, Flex, Text, Image, ProgressCircle } from "@chakra-ui/react";
import { ProductivityData, TimeFilter } from "@/types/dashboard";

interface ProductivityScorecardProps {
  data: ProductivityData;
}

export function ProductivityScorecard({ data }: ProductivityScorecardProps) {
  const [filter, setFilter] = useState<TimeFilter>(data.timeFilter);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="18px" fontWeight="600" color="#1E1E2F">
          Productivity Scorecard
        </Text>

        <Flex gap="15px">
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "day" ? "#C2C2C2" : "#C2C2C2"}
            cursor="pointer"
            onClick={() => setFilter("day")}
          >
            Day
          </Text>
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "week" ? "#7A5FFF" : "#C2C2C2"}
            cursor="pointer"
            onClick={() => setFilter("week")}
          >
            Week
          </Text>
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "month" ? "#C2C2C2" : "#C2C2C2"}
            cursor="pointer"
            onClick={() => setFilter("month")}
          >
            Month
          </Text>
        </Flex>
      </Flex>

      <Flex gap="20px">
        {/* Study Hours */}
        <Box
          flex={1}
          borderRadius="8px"
          bg="#FFFFFF"
          border="1px solid #F0F0F0"
          p={6}
        >
          <Text fontSize="16px" fontWeight="600" color="#2E2E30" mb={4}>
            Study Hours
          </Text>

          <Flex direction="column" align="center" gap={2}>
            <Box position="relative" w="120px" h="120px">
              <ProgressCircle.Root
                value={(data.studyHours / 50) * 100}
                size="120px"
                colorPalette="purple"
              >
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
                <ProgressCircle.ValueText
                  fontSize="16.88px"
                  fontWeight="700"
                  color="#404040"
                >
                  {data.studyHours}
                </ProgressCircle.ValueText>
              </ProgressCircle.Root>
            </Box>

            <Text fontSize="14px" fontWeight="400" color="#000000">
              Great Job!
            </Text>
            <Text
              fontSize="12px"
              fontWeight="400"
              color="#404040"
              textAlign="center"
            >
              Optimize your study hours
            </Text>
            <Text
              fontSize="12px"
              fontWeight="600"
              color="#7A5FFF"
              cursor="pointer"
            >
              Tips
            </Text>
          </Flex>
        </Box>

        {/* Study Session */}
        <Box
          flex={1}
          borderRadius="8px"
          bg="#FFFFFF"
          border="1px solid #F0F0F0"
          p={6}
        >
          <Text fontSize="16px" fontWeight="600" color="#2E2E30" mb={4}>
            Study Session
          </Text>

          <Flex direction="column" align="center" gap={2}>
            <Flex align="center" gap={4}>
              <Image
                src="/icons/chevron-left.svg"
                alt="Previous"
                w="6px"
                h="10px"
                cursor="pointer"
              />
              <Text
                fontSize={{ base: "13.67px", lg: "16.88px" }}
                fontWeight="700"
                color="#404040"
              >
                {String(data.studySessions).padStart(2, "0")}
              </Text>
              <Image
                src="/icons/chevron-right.svg"
                alt="Next"
                w="6px"
                h="10px"
                cursor="pointer"
              />
            </Flex>

            <Box
              w="120px"
              h="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="100px"
                h="100px"
                borderRadius="full"
                border="8px solid #FFA500"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
            </Box>

            <Text fontSize="14px" fontWeight="400" color="#000000" mt={2}>
              Focus Time
            </Text>
          </Flex>
        </Box>

        {/* Rating */}
        <Box
          flex={1}
          borderRadius="8px"
          bg="#FFFFFF"
          border="1px solid #F0F0F0"
          p={6}
        >
          <Text fontSize="16px" fontWeight="600" color="#2E2E30" mb={4}>
            Rating
          </Text>

          <Flex direction="column" align="center" gap={2}>
            <Box w="120px" h="60px" position="relative">
              <Image
                src={{
                  base: "/images/rating-gauge-mobile.svg",
                  lg: "/images/rating-gauge.svg",
                }}
                alt="Rating Gauge"
                w={{ base: "83px", lg: "103px" }}
                h={{ base: "42px", lg: "52px" }}
                mx="auto"
              />
            </Box>

            <Text fontSize="14px" fontWeight="400" color="#000000" mt={4}>
              {data.brainpowerRating}% Brainpower
            </Text>
            <Text fontSize="12px" fontWeight="400" color="#404040">
              Keep it up!
            </Text>
            <Text
              fontSize="12px"
              fontWeight="600"
              color="#7A5FFF"
              cursor="pointer"
            >
              Details
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
