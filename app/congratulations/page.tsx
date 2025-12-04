"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

export default function Congratulations() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
    //   router.push("../");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box w="100%">
        <Flex flexDirection="column" align="center" justify="center">
            <Flex as="section" w={{base:"80%", lg:"60%"}} flexDirection="column"
            align="center" justify="center" 
            mx="auto" my={16} px={16} py={8} 
            fontSize={24} fontWeight={500} textAlign="center"
            className="rounded-2xl shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)]"
            >
                <Text>Simbi Pre Assessment</Text>
                <Text as="h2" fontSize={{base:24, lg:48}} my={4}>Thanks for your submission</Text>
                <Text my={8}>We are thankful that you put your time and efforts to complete this assessment.</Text>
                <Text>Your result will be summarized on your dashboard </Text>

                <Link href="./dashboard" variant="underline" color="gray.400" fontSize={18}>Click here if you are not redirected</Link>
            </Flex>
        </Flex>


    </Box>
  );
}