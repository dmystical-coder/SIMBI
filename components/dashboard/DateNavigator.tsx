"use client";

import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

export type ViewType = "calendar" | "list" | "grid";

interface DateNavigatorProps {
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
  showViewToggle?: boolean;
  viewOptions?: { value: ViewType; label: string; icon: React.ReactNode }[];
  dateFormat?: "full" | "short" | "range";
  showDatePicker?: boolean;
  customTitle?: string;
  showTodayButton?: boolean;
  step?: "day" | "week" | "month";
}

export default function DateNavigator({
  onDateChange,
  onViewChange,
  showViewToggle = true,
  viewOptions = [
    {
      value: "calendar" as ViewType,
      label: "Calendar",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6.66667 1.66666V4.16666M13.3333 1.66666V4.16666M2.5 6.66666H17.5M4.16667 3.33332H15.8333C16.7538 3.33332 17.5 4.07952 17.5 4.99999V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V4.99999C2.5 4.07952 3.24619 3.33332 4.16667 3.33332Z"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: "list" as ViewType,
      label: "List",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6.66667 5H17.5M6.66667 10H17.5M6.66667 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ],
  dateFormat = "full",
  showDatePicker = true,
  customTitle,
  showTodayButton = true,
  step = "day",
}: DateNavigatorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>(viewOptions[0].value);

  const formatDate = (date: Date) => {
    if (dateFormat === "short") {
      if (step === "month") {
        return date.toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        });
      }
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (step === "day") newDate.setDate(newDate.getDate() - 1);
    if (step === "week") newDate.setDate(newDate.getDate() - 7);
    if (step === "month") newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (step === "day") newDate.setDate(newDate.getDate() + 1);
    if (step === "week") newDate.setDate(newDate.getDate() + 7);
    if (step === "month") newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateChange?.(today);
  };

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 6 }}
      align={{ base: "stretch", md: "center" }}
      w="full"
      py={4}
    >
      {/* Date Display */}
      {showDatePicker && (
        <Flex
          align="center"
          gap={3}
          px={{ base: 4, md: 6 }}
          py={{ base: 3, md: 4 }}
          cursor="pointer"
          bg="white"
          flex={{ base: "1", md: "0 0 auto" }}
          _hover={{ bg: "brand.50" }}
          transition="background-color 0.2s"
        >
          {/* Calendar Icon */}
          <Box
            w={{ base: "24px", md: "32px" }}
            h={{ base: "24px", md: "32px" }}
            flexShrink={0}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2V5M16 2V5M3 9H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                stroke="#7A5FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>

          {/* Date Text */}
          <Text
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight={600}
            color="brand.600"
            lineHeight="1"
          >
            {customTitle || `Today, ${formatDate(currentDate)}`}
          </Text>

          {/* Dropdown Arrow */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#7A5FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Flex>
      )}

      {/* Navigation Controls and View Toggle */}
      <Flex
        gap={{ base: 2, md: 6 }}
        align="center"
        justify="space-between"
        flex={{ base: "1", md: "1" }}
      >
        {/* Navigation Controls */}
        <Flex align="center" gap={3} flex={{ base: "0", md: "1" }}>
          {/* Previous Button */}
          <Button
            onClick={handlePrevious}
            variant="ghost"
            p={2}
            minW="auto"
            bg="#F9FAFB"
            borderRadius="6px"
            h="auto"
            _hover={{ bg: "#F3F4F6" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#7A5FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          {/* Today Button */}
          {showTodayButton && (
            <Button
              onClick={handleToday}
              bg="brand.600"
              color="white"
              px={6}
              py={{ base: 2, md: 3 }}
              borderRadius="4px"
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={500}
              _hover={{ bg: "brand.700" }}
              _active={{ bg: "brand.800" }}
              h="auto"
            >
              Today
            </Button>
          )}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            variant="ghost"
            p={2}
            minW="auto"
            h="auto"
            borderRadius="6px"
            bg="#F9FAFB"
            _hover={{ bg: "#F3F4F6" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#7A5FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Flex>

        {/* View Toggle */}
        {showViewToggle && (
          <Flex
            align="center"
            gap={0}
            border="1px solid"
            borderColor="#D0D5DD"
            borderRadius="8px"
            bg="#FFFFFF"
          >
            {viewOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleViewChange(option.value)}
                variant="ghost"
                p="8px"
                minW="auto"
                h="auto"
                border={view === option.value ? "1px solid #7A5FFF" : "none"}
                bg={view === option.value ? "#F3F2FF" : "transparent"}
                borderRadius="6px"
                _hover={{ bg: "#F9FAFB" }}
              >
                <Box
                  as="span"
                  css={{
                    "& svg": {
                      stroke: view === option.value ? "#7A5FFF" : "#667085",
                    },
                  }}
                >
                  {option.icon}
                </Box>
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
