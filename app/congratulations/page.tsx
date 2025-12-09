"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

export default function Congratulations() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #E9E8FF 0%, #F3F2FF 50%, #FFF4E6 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "20px", lg: "40px" }}
    >
      <Flex
        direction="column"
        bg="white"
        borderRadius="20px"
        boxShadow="0px 19px 86.9px rgba(149, 127, 255, 0.53)"
        p={{ base: "40px 20px", lg: "60px" }}
        maxW="750px"
        w="100%"
        gap="60px"
        textAlign="center"
      >
        {/* Title */}
        <Text
          fontSize={{ base: "20px", lg: "24px" }}
          fontWeight="500"
          color="#000000"
        >
          Simbi Pre Assessment
        </Text>

        {/* Main Heading */}
        <Text
          fontSize={{ base: "32px", lg: "48px" }}
          fontWeight="500"
          color="#000000"
          lineHeight={{ base: "40px", lg: "72px" }}
        >
          Thanks for your submission
        </Text>

        {/* Body Text 1 */}
        <Text
          fontSize={{ base: "20px", lg: "24px" }}
          fontWeight="500"
          color="#000000"
          lineHeight={{ base: "32px", lg: "36px" }}
        >
          We are thankful that you put your time and efforts to complete this
          assessment.
        </Text>

        {/* Body Text 2 */}
        <Text
          fontSize={{ base: "20px", lg: "24px" }}
          fontWeight="500"
          color="#000000"
          lineHeight={{ base: "32px", lg: "36px" }}
          px={{ base: "0", lg: "40px" }}
        >
          We will now get right to see that how you did and will summarize your
          result on your on your dashboard
        </Text>

        {/* Redirect Section */}
        <Flex direction="column" gap="10px" align="center">
          <Text
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="500"
            color="#000000"
          >
            You will be redirected to our homepage shortly.
          </Text>
          <Link
            href="/"
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="500"
            color="#000000"
            opacity="0.5"
            textDecoration="underline"
            _hover={{ opacity: 0.7 }}
          >
            Click here if you are not redirected
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
