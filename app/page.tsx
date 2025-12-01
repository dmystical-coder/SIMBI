"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <Box minH="100vh" bg="brand.50" position="relative" overflow="hidden">
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        boxSize="600px"
        bg="brand.200"
        filter="blur(100px)"
        opacity="0.5"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        boxSize="500px"
        bg="secondary.200"
        filter="blur(100px)"
        opacity="0.5"
        borderRadius="full"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex as="header" py={8} justify="space-between" align="center">
          <Box position="relative" width="120px" height="40px">
            <Image
              src="/logo.svg"
              alt="SIMBI"
              fill
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </Box>
          <Button variant="ghost" colorPalette="brand" asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </Flex>

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          minH="calc(100vh - 140px)"
          gap={12}
          pb={20}
        >
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            gap={6}
            flex={1}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              size="6xl"
              fontWeight="bold"
              lineHeight="1.1"
              letterSpacing="tight"
              color="dark.950"
            >
              Meet
              <Text as="span" color="brand.500">
                {" "}
                SIMBI!
              </Text>{" "}
              <br /> Your AI Study Buddy
            </Heading>

            <Text fontSize="xl" color="state.500" maxW="lg">
              Get started with SIMBI today. Sign in to your account or create a
              new one to begin your journey.
            </Text>

            <Stack
              direction={{ base: "column", sm: "row" }}
              gap={4}
              w="full"
              maxW="400px"
            >
              <Button
                size="lg"
                borderRadius="full"
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                flex={1}
                asChild
              >
                <Link href="/auth/get-started">Get Started</Link>
              </Button>
              <Button
                size="lg"
                borderRadius="full"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                _hover={{ bg: "brand.50" }}
                flex={1}
                asChild
              >
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </Stack>
          </VStack>

          <Box
            flex={1}
            position="relative"
            display={{ base: "none", lg: "block" }}
          >
            <Box position="relative" width="600px" height="600px">
              <Image
                src="/simbi-waving.svg"
                alt="SIMBI Waving"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
