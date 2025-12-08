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
  titleFontSize?: object | string;
  messageFontSize?: object | string;
  mt?: object | string | number;
  minH?: object | string | number;
  maxW?: object | string | number;
  p?: object | string | number;
  imageLayout?: "overlay" | "inline";
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
  titleFontSize = { base: "28px", md: "36px", lg: "40px" },
  messageFontSize = { base: "14px", md: "16px", lg: "18px" },
  mt = { base: "80px", md: "0" },
  minH = { base: "auto", lg: "231px" },
  maxW = { base: "100%", lg: "647px" },
  p = {
    base: "24px 24px 24px 24px",
    md: "32px 32px 32px 32px",
    lg: "31px 31px 31px 18px",
  },
  imageLayout = "overlay",
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
      p={p}
      position="relative"
      overflow="visible"
      maxW={maxW}
      minH={minH}
      mt={mt}
    >
      <Flex
        direction={{ base: "row", md: "row" }}
        align={{ base: "center", md: "center" }}
        justify="space-between"
        position="relative"
        gap={imageLayout === "inline" ? { base: 4, md: 4 } : 0}
      >
        {/* Left Content */}
        <Stack
          gap={{ base: "12px", md: "20px", lg: "28px" }}
          maxW={
            imageLayout === "inline"
              ? "100%"
              : { base: "100%", md: "55%", lg: "357px" }
          }
          zIndex={1}
          w="100%"
          pt={
            imageLayout === "overlay"
              ? { base: "120px", md: "0" }
              : { base: "0", md: "0" }
          }
          flex={imageLayout === "inline" ? 1 : undefined}
        >
          <Text
            fontSize={titleFontSize}
            fontWeight={600}
            color={textColor}
            lineHeight="1.5"
            textAlign={{
              base: imageLayout === "inline" ? "left" : "center",
              md: imageLayout === "inline" ? "left" : "left",
            }}
          >
            {title || defaultTitle}
          </Text>

          <Text
            fontSize={messageFontSize}
            fontWeight={500}
            color={textColor}
            lineHeight="1.5"
            textAlign={{
              base: imageLayout === "inline" ? "left" : "center",
              md: imageLayout === "inline" ? "left" : "left",
            }}
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

        {/* Simbi Character */}
        <Box
          position={imageLayout === "overlay" ? "absolute" : "relative"}
          right={imageLayout === "overlay" ? characterPosition.right : undefined}
          top={imageLayout === "overlay" ? characterPosition.top : undefined}
          transform={
            imageLayout === "overlay"
              ? {
                  base:
                    characterPosition.top?.base === "50%"
                      ? "translateY(-50%)"
                      : "translateX(50%)",
                  md:
                    characterPosition.top?.md === "50%"
                      ? "translateY(-50%)"
                      : "none",
                  lg:
                    characterPosition.top?.lg === "50%"
                      ? "translateY(-50%)"
                      : "none",
                }
              : undefined
          }
          w={characterSize.w}
          h={characterSize.h}
          flexShrink={0}
          pointerEvents={imageLayout === "overlay" ? "none" : "auto"}
          display={
            imageLayout === "inline"
              ? { base: "block", md: "block" } // Always show in inline mode
              : { base: "block", md: "block" }
          }
          order={imageLayout === "inline" ? { base: 1, md: 1 } : undefined}
          alignSelf={imageLayout === "inline" ? "center" : undefined}
        >
          <Image
            src={characterImage}
            alt="Simbi character"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>
      </Flex>
    </Box>
  );
}
