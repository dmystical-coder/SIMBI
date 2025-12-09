"use client";

import { useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { ConsistencyData, TimeFilter } from "@/types/dashboard";

interface StudyConsistencyProps {
  data: ConsistencyData;
}

export function StudyConsistency({ data }: StudyConsistencyProps) {
  const [filter, setFilter] = useState<TimeFilter>("week");

  const chartData = data.dailyHours;
  const maxHours = 10;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="20px" fontWeight="600" color="#1E1E2F">
          Study Consistency
        </Text>
        
        <Flex gap="15px">
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "day" ? "#C9C0D4" : "#C9C0D4"}
            cursor="pointer"
            onClick={() => setFilter("day")}
          >
            Day
          </Text>
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "week" ? "#7A5FFF" : "#C9C0D4"}
            cursor="pointer"
            onClick={() => setFilter("week")}
          >
            Week
          </Text>
          <Text
            fontSize="14px"
            fontWeight="500"
            color={filter === "month" ? "#C9C0D4" : "#C9C0D4"}
            cursor="pointer"
            onClick={() => setFilter("month")}
          >
            Month
          </Text>
        </Flex>
      </Flex>

      <Box
        border="0.5px solid rgba(0, 0, 0, 0.10)"
        borderRadius="3px"
        p={{ base: 4, lg: 6 }}
        bg="#FFFFFF"
        position="relative"
        h={{ base: "auto", lg: "315px" }}
        display={{ base: "block", lg: "block" }}
      >
        {/* Mobile Chart Image */}
        <Image 
          src="/images/consistency-chart-mobile.svg"
          alt="Study Consistency Chart"
          w="100%"
          display={{ base: "block", lg: "none" }}
        />

        {/* Desktop Chart */}
        <Box display={{ base: "none", lg: "block" }}>
        {/* Y-axis label */}
        <Text
          position="absolute"
          left={2}
          top={4}
          fontSize="12px"
          fontWeight="400"
          color="#5B616E"
        >
          Hours
        </Text>

        {/* Chart area */}
        <Flex h="100%" position="relative" pt={8} pb={8}>
          {/* Y-axis */}
          <Flex direction="column" justify="space-between" w="40px" mr={4}>
            {[10, 8, 6, 4, 2, 0].map((val) => (
              <Text key={val} fontSize="10px" color="#5B616E" textAlign="right">
                {val}
              </Text>
            ))}
          </Flex>

          {/* Chart bars */}
          <Flex flex={1} align="flex-end" justify="space-around" position="relative">
            {/* Grid lines */}
            {[0, 2, 4, 6, 8, 10].map((val) => (
              <Box
                key={val}
                position="absolute"
                left={0}
                right={0}
                bottom={`${(val / maxHours) * 100}%`}
                h="1px"
                bg="rgba(0,0,0,0.05)"
              />
            ))}

            {/* Bars */}
            {chartData.map((item, index) => {
              const height = (item.hours / maxHours) * 100;
              const isHighlighted = item.day === "Thurs";
              
              return (
                <Flex key={index} direction="column" align="center" flex={1} position="relative">
                  <Box
                    w="80%"
                    h={`${height}%`}
                    bg="rgba(122, 95, 255, 0.3)"
                    borderTopLeftRadius="4px"
                    borderTopRightRadius="4px"
                    position="relative"
                    transition="all 0.3s"
                    _hover={{ bg: "rgba(122, 95, 255, 0.5)" }}
                  >
                    {isHighlighted && (
                      <Box
                        position="absolute"
                        top="-30px"
                        left="50%"
                        transform="translateX(-50%)"
                        bg="#7A5FFF"
                        color="#FFFFFF"
                        fontSize="10px"
                        px={2}
                        py={1}
                        borderRadius="4px"
                        whiteSpace="nowrap"
                      >
                        {item.hours}hr 30m
                      </Box>
                    )}
                    {isHighlighted && (
                      <Box
                        position="absolute"
                        top={0}
                        left="50%"
                        transform="translateX(-50%)"
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#7A5FFF"
                      />
                    )}
                  </Box>
                  <Text fontSize="10px" color="#5B616E" mt={2}>
                    {item.day}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>

          {/* X-axis label */}
          <Text
            position="absolute"
            right={4}
            bottom={2}
            fontSize="12px"
            fontWeight="400"
            color="#5B616E"
          >
            Days
          </Text>
        </Box>
      </Box>
    </Box>
  );
}