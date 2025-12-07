"use client";

import { Box, Text, Button, Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { hasCompletedPreAssessment, hasSkippedPreAssessment } from "@/lib/auth";
import Image from "next/image";

export default function WelcomeSection() {
  const router = useRouter();

  const hasSkipped = hasSkippedPreAssessment();
  const hasCompleted = hasCompletedPreAssessment();
  const showPreAssessmentPrompt = hasSkipped && !hasCompleted;

  const handleCTAClick = () => {
    if (showPreAssessmentPrompt) {
      router.push("/pre-assessment");
    } else {
      // TODO: Navigate to study plan generation
      console.log("Generate study plan");
    }
  };

  return (
    <Box
      bg="#f3f2ff"
      borderRadius="20px"
      p={{
        base: "24px 24px 24px 24px",
        md: "32px 32px 32px 32px",
        lg: "31px 31px 31px 18px",
      }}
      position="relative"
      overflow="visible"
      maxW={{ base: "100%", lg: "647px" }}
      minH={{ base: "auto", lg: "231px" }}
      mt={{ base: "80px", md: "0" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        justify="space-between"
        position="relative"
      >
        {/* Simbi Character - Mobile: Top (extending out), Desktop: Right */}
        <Box
          position="absolute"
          right={{ base: "50%", md: "20px", lg: "38px" }}
          top={{ base: "-70px", md: "-60px", lg: "-78px" }}
          transform={{ base: "translateX(50%)", md: "none" }}
          w={{ base: "140px", md: "170px", lg: "189px" }}
          h={{ base: "180px", md: "270px", lg: "300px" }}
          flexShrink={0}
          pointerEvents="none"
        >
          <Image
            src="/images/simbi-waving.svg"
            alt="Simbi character"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>

        {/* Left Content */}
        <Stack
          gap={{ base: "16px", md: "20px", lg: "28px" }}
          maxW={{ base: "100%", md: "55%", lg: "357px" }}
          zIndex={1}
          w="100%"
          pt={{ base: "120px", md: "0" }}
        >
          <Text
            fontSize={{ base: "28px", md: "36px", lg: "40px" }}
            fontWeight={600}
            color="#27104e"
            lineHeight="1.5"
            textAlign={{ base: "center", md: "left" }}
          >
            Welcome back
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px", lg: "18px" }}
            fontWeight={500}
            color="#27104e"
            lineHeight="1.5"
            textAlign={{ base: "center", md: "left" }}
          >
            {showPreAssessmentPrompt
              ? "Complete your pre-assessment to help us personalize your learning experience"
              : "I'm Simbi, ready to learn and have fun?"}
          </Text>

          <Button
            bg="#7a5fff"
            color="#fdfdff"
            fontSize={{ base: "14px", md: "15px", lg: "16px" }}
            fontWeight={500}
            h={{ base: "44px", md: "48px" }}
            px={{ base: "20px", md: "24px", lg: "13px" }}
            borderRadius="8px"
            _hover={{ bg: "#6b4fee" }}
            _active={{ bg: "#5c3fdd" }}
            onClick={handleCTAClick}
            w={{ base: "100%", sm: "auto" }}
            maxW="250px"
            mx={{ base: "auto", md: "0" }}
          >
            {showPreAssessmentPrompt
              ? "Complete Pre-Assessment"
              : "Generate a new Study Plan"}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
