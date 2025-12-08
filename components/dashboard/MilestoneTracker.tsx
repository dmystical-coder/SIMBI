"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

type TabType = "Active" | "Inactive" | "Completed";

interface MilestoneTrackerProps {
  onTabChange?: (tab: TabType) => void;
  onFilterClick?: () => void;
}

export default function MilestoneTracker({
  onTabChange,
  onFilterClick,
}: MilestoneTrackerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Active");

  const tabs: TabType[] = ["Active", "Inactive", "Completed"];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <Flex
      className="w-full"
      position="relative"
      borderBottom="1px solid"
      borderColor="state.200"
      pb={2}
      direction={{ base: "column", md: "row" }}
      justify={{ base: "flex-start", md: "space-between" }}
      align={{ base: "flex-start", md: "center" }}
      gap={{ base: 4, md: 0 }}
    >
      {/* Left section: Title and Tabs */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: 4, md: 12 }}
        w={{ base: "full", md: "auto" }}
        pr={{ base: "120px", md: 0 }}
      >
        {/* Title */}
        <Text
          fontSize={{ base: "22px", md: "24px" }}
          fontWeight={700}
          color="dark.950"
          lineHeight="1.2"
        >
          Milestone Tracker
        </Text>

        {/* Tabs */}
        <Flex gap={0} align="stretch">
          {tabs.map((tab) => (
            <Flex
              key={tab}
              position="relative"
              px={{ base: 0, md: 4 }}
              pr={{ base: 6, md: 4 }}
              py={{ base: 2, md: 4 }}
              cursor="pointer"
              onClick={() => handleTabClick(tab)}
              align="center"
              className="transition-all duration-200"
            >
              <Text
                fontSize={{ base: "16px", md: "14px" }}
                fontWeight={activeTab === tab ? 500 : 400}
                color={activeTab === tab ? "brand.600" : "state.500"}
                className="whitespace-nowrap hover:opacity-80"
                lineHeight="1"
              >
                {tab}
              </Text>
              {/* Active indicator - embedded in border */}
              {activeTab === tab && (
                <Box
                  position="absolute"
                  bottom="-10px"
                  left={0}
                  right={{ base: "24px", md: 0 }}
                  h="3px"
                  bg="brand.600"
                  zIndex={1}
                />
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Filter Button - Top Right on Mobile, Right Side on Desktop */}
      <Flex
        position={{ base: "absolute", md: "static" }}
        top={{ base: 0, md: "auto" }}
        right={{ base: 0, md: "auto" }}
        align="center"
        gap={2}
        px={4}
        py={2}
        border="1px solid"
        borderColor="brand.600"
        borderRadius="8px"
        cursor="pointer"
        onClick={onFilterClick}
        bg="white"
        className="hover:bg-brand-50 transition-colors duration-200"
      >
        <Image
          src="/icons/funnel.svg"
          alt="Filter"
          className="w-4 h-4"
        />
        <Text fontSize="14px" fontWeight={500} color="brand.600" lineHeight="1">
          Filter
        </Text>
      </Flex>
    </Flex>
  );
}
