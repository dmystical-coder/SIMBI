"use client";

import { Box, Text, Button, Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { hasCompletedPreAssessment, hasSkippedPreAssessment } from "@/lib/auth";
import Image from "next/image";

interface WelcomeSectionProps {
  title?: string;
  message?: string;
  ctaText?: string;
  ctaAction?: () => void;
  showCTA?: boolean;
  backgroundColor?: string;
  textColor?: string;
  characterImage?: string;
  characterPosition?: {
    top?: { base?: string; md?: string; lg?: string };
    right?: { base?: string; md?: string; lg?: string };
  };
  characterSize?: {
    w?: { base?: string; md?: string; lg?: string };
    h?: { base?: string; md?: string; lg?: string };
  };
}

export default function WelcomeSection({
  title,
  message,
  ctaText,
  ctaAction,
  showCTA = true,
  backgroundColor = "#f3f2ff",
  textColor = "#27104e",
  characterImage = "/images/simbi-waving.svg",
  characterPosition = {
    top: { base: "-70px", md: "-60px", lg: "-78px" },
    right: { base: "50%", md: "20px", lg: "38px" },
  },
  characterSize = {
    w: { base: "140px", md: "170px", lg: "189px" },
    h: { base: "180px", md: "270px", lg: "300px" },
  },
}: WelcomeSectionProps) {
  const router = useRouter();

  const hasSkipped = hasSkippedPreAssessment();
  const hasCompleted = hasCompletedPreAssessment();
  const showPreAssessmentPrompt = hasSkipped && !hasCompleted;

  const defaultTitle = "Welcome back";
  const defaultMessage = showPreAssessmentPrompt
    ? "Complete your pre-assessment to help us personalize your learning experience"
    : "I'm Simbi, ready to learn and have fun?";
  const defaultCTAText = showPreAssessmentPrompt
    ? "Take Pre-Assessment"
    : "Generate a study plan";

  const handleCTAClick = () => {
    if (ctaAction) {
      ctaAction();
    } else if (showPreAssessmentPrompt) {
      router.push("/pre-assessment");
    } else {
      // TODO: Navigate to study plan generation
      console.log("Generate study plan");
    }
  };

  return (
    <Box
      bg={backgroundColor}
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
          right={characterPosition.right}
          top={characterPosition.top}
          transform={{
            base:
              characterPosition.top?.base === "50%"
                ? "translateY(-50%)"
                : "translateX(50%)",
            md:
              characterPosition.top?.md === "50%" ? "translateY(-50%)" : "none",
            lg:
              characterPosition.top?.lg === "50%" ? "translateY(-50%)" : "none",
          }}
          w={characterSize.w}
          h={characterSize.h}
          flexShrink={0}
          pointerEvents="none"
        >
          <Image
            src={characterImage}
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
            color={textColor}
            lineHeight="1.5"
            textAlign={{ base: "center", md: "left" }}
          >
            {title || defaultTitle}
          </Text>

          <Text
            fontSize={{ base: "14px", md: "16px", lg: "18px" }}
            fontWeight={500}
            color={textColor}
            lineHeight="1.5"
            textAlign={{ base: "center", md: "left" }}
          >
            {message || defaultMessage}
          </Text>

          {showCTA && (
            <Button
              bg="#7a5fff"
              color="#fdfdff"
              fontSize={{ base: "14px", md: "15px", lg: "16px" }}
              fontWeight={500}
              h={{ base: "44px", md: "48px" }}
              px={{ base: "24px", md: "32px" }}
              borderRadius="8px"
              _hover={{ bg: "#6B4FEF" }}
              onClick={handleCTAClick}
              maxW={{ base: "100%", md: "fit-content" }}
            >
              {ctaText || defaultCTAText}
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
