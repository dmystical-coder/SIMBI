"use client";

import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useState } from "react";

type ViewType = "calendar" | "list";

interface MilestoneDatePickerProps {
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
}

export default function MilestoneDatePicker({
  onDateChange,
  onViewChange,
}: MilestoneDatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("calendar");

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
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
      {/* Date Selector - Left Side */}
      <Flex
        align="center"
        gap={3}
        px={{ base: 4, md: 6 }}
        py={{ base: 3, md: 4 }}
        cursor="pointer"
        bg="white"
        flex={{ base: "1", md: "0 0 auto" }}
        className="hover:bg-brand-50 transition-colors duration-200"
      >
        {/* Calendar Icon */}
        <Box
          w={{ base: "24px", md: "32px" }}
          h={{ base: "24px", md: "32px" }}
          flexShrink={0}
        >
          <Image src="/icons/calendar-alt.svg" alt="Calendar" />
        </Box>

        {/* Date Text */}
        <Text
          fontSize={{ base: "18px", md: "20px" }}
          fontWeight={600}
          color="brand.600"
          lineHeight="1"
        >
          Today, {formatDate(currentDate)}
        </Text>

        {/* Dropdown Arrow */}
        <Image src="/icons/dropdown.svg" alt="Dropdown" />
      </Flex>

      {/* Navigation Controls and View Toggle Row */}
      <Flex
        gap={{ base: 2, md: 6 }}
        align="center"
        justify="space-between"
        flex={{ base: "1", md: "1" }}
      >
        {/* Navigation Controls - Center */}
        <Flex align="center" gap={3} flex={{ base: "0", md: "1" }}>
          {/* Previous Button */}
          <Button
            onClick={handlePrevious}
            variant="ghost"
            p={2}
            minW="auto"
            bg="#F2F2F2"
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

          {/* Next Button */}
          <Button
            onClick={handleNext}
            variant="ghost"
            p={2}
            minW="auto"
            h="auto"
            borderRadius="6px"
            bg="#F2F2F2"
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

        {/* View Toggle - Right Side */}
        <Flex
          align="center"
          gap={0}
          border="1px solid"
          borderColor="#D0D5DD"
          borderRadius="8px"
          bg="#FFFFFF"
        >
          {/* Calendar View Button */}
          <Button
            onClick={() => handleViewChange("calendar")}
            variant="ghost"
            p="8px"
            minW="auto"
            h="auto"
            bg={view === "calendar" ? "#F9FAFB" : "transparent"}
            border={view === "calendar" ? "1px solid #7A5FFF" : "none"}
            borderRadius="6px"
            _hover={{ bg: view === "calendar" ? "#F9FAFB" : "#F9FAFB" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 1.66666V4.16666M13.3333 1.66666V4.16666M2.5 6.66666H17.5M4.16667 3.33332H15.8333C16.7538 3.33332 17.5 4.07952 17.5 4.99999V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V4.99999C2.5 4.07952 3.24619 3.33332 4.16667 3.33332Z"
                stroke={view === "calendar" ? "#7A5FFF" : "#667085"}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          {/* List View Button */}
          <Button
            onClick={() => handleViewChange("list")}
            variant="ghost"
            p="8px"
            minW="auto"
            h="auto"
            bg={view === "list" ? "#F9FAFB" : "transparent"}
            border={view === "list" ? "1px solid #7A5FFF" : "none"}
            borderRadius="6px"
            _hover={{ bg: view === "list" ? "#F9FAFB" : "#F9FAFB" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 5H17.5M6.66667 10H17.5M6.66667 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833"
                stroke={view === "list" ? "#7A5FFF" : "#667085"}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
