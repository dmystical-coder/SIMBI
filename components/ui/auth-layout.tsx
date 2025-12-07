"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  illustration: string;
  illustrationAlt: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle = "SIMBI",
  illustration,
  illustrationAlt,
}: AuthLayoutProps) => {
  return (
    <Flex
      minH="100vh"
      h={{ base: "auto", lg: "100vh" }}
      bg={{
        base: "linear-gradient(22.19deg, #E1BC80 16.99%, #957FFF 89.32%)",
        lg: "linear-gradient(22.19deg, #E1BC80 16.99%, #957FFF 89.32%)",
      }}
      align="center"
      justify="center"
      p={{ base: 0, lg: 8 }}
      overflow={{ base: "auto", lg: "hidden" }}
    >
      {/* Logo - Mobile Only */}
      <Box
        position="absolute"
        top={{ base: 5, lg: 0 }}
        left="50%"
        transform="translateX(-50%)"
        display={{ base: "block", lg: "none" }}
        zIndex={10}
      >
        <Image
          src="/logo.svg"
          alt="SIMBI Logo"
          width={130}
          height={33}
          priority
        />
      </Box>

      <Flex
        w="full"
        maxW={{ base: "full", lg: "1075px" }}
        h={{ base: "auto", lg: "calc(100vh - 64px)" }}
        maxH={{ base: "none", lg: "746px" }}
        bg="white"
        borderRadius={{ base: "12px", lg: "32px" }}
        overflow="hidden"
        boxShadow={{
          base: "0px 4px 11px rgba(149, 127, 255, 0.30)",
          lg: "0px 19px 86.9px rgba(149, 127, 255, 0.53)",
        }}
        flexDirection={{ base: "column", lg: "row" }}
        mt={{ base: 20, lg: 0 }}
        mb={{ base: 8, lg: 0 }}
        mx={{ base: 5, lg: 0 }}
      >
        {/* Left Side - Branding (Desktop) / Top Section (Mobile) */}
        <Flex
          flex={{ base: "none", lg: 1 }}
          bg={{ base: "transparent", lg: "#E4DFFF" }}
          p={{ base: 8, lg: 12 }}
          align="center"
          justify="center"
          position="relative"
          flexDirection="column"
          gap={{ base: 4, lg: 8 }}
          borderRadius={{ base: "12px 12px 0 0", lg: "32px 0 0 32px" }}
        >
          {/* Logo - Desktop Only */}
          <Box
            position="absolute"
            top={{ base: 0, lg: 8 }}
            left={{ base: 0, lg: 8 }}
            display={{ base: "none", lg: "block" }}
          >
            <Image
              src="/logo.svg"
              alt="SIMBI Logo"
              width={159}
              height={54}
              priority
            />
          </Box>

          <Flex
            direction="column"
            align="center"
            textAlign="center"
            gap={{ base: 4, lg: 8 }}
            mt={{ base: 0, lg: 16 }}
          >
            <Heading
              fontSize={{ base: "32px", lg: "48px" }}
              fontWeight="500"
              letterSpacing={{ base: "-0.96px", lg: "-1.44px" }}
              lineHeight={{ base: "38.4px", lg: "60px" }}
              color="black"
              fontFamily="var(--font-poppins)"
            >
              {title}
              <br />
              <Text as="span" color="brand.500" fontWeight="700">
                {subtitle}
              </Text>
            </Heading>

            <Box
              position="relative"
              w={{ base: "108px", lg: "180px" }}
              h={{ base: "146px", lg: "245px" }}
            >
              <Image
                src={illustration}
                alt={illustrationAlt}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Flex>
        </Flex>

        {/* Right Side - Form */}
        <Flex
          flex={{ base: "none", lg: 1 }}
          p={{ base: "32px 32px 40px", lg: 12 }}
          align="center"
          justify="center"
          bg="white"
          borderRadius={{ base: "0 0 12px 12px", lg: "0 32px 32px 0" }}
          overflow="auto"
        >
          <Box w="full" maxW="463px">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
