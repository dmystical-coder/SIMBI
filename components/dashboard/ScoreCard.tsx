"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface ScoreCardItemProps {
  icon: string;
  title: string;
  value: string;
  bgColor: string;
}

function ScoreCardItem({ icon, title, value, bgColor }: ScoreCardItemProps) {
  return (
    <Flex
      bg={bgColor}
      borderRadius="12px"
      p={4}
      gap={3}
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap={3} flex={1}>
        <Box className="flex justify-center items-center w-12 h-12 border rounded-xl bg-[#AF9FFF20]">
          <Image className="w-6 h-6" src={icon} alt={title} />
        </Box>
        <Box>
          <Text fontSize="14px" color="brand.600" fontWeight={500}>
            {title}
          </Text>
          <Text fontSize="12px" color="state.600" mt={0.5}>
            {value}
          </Text>
        </Box>
      </Flex>

      <Image src="/icons/more.svg" alt="More" cursor="pointer" />
    </Flex>
  );
}

export default function ScoreCard() {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius="16px"
      p={6}
      gap={3}
      border="1px solid"
      borderColor="state.200"
    >
      <Text fontSize="18px" fontWeight={600} color="dark.950" mb={2}>
        Your Score Card
      </Text>

      <ScoreCardItem
        icon="/star.svg"
        title="Total token"
        value="15 tokens"
        bgColor="brand.50"
      />

      <ScoreCardItem
        icon="/hourglass.svg"
        title="Total Study hours"
        value="10 hours"
        bgColor="success.50"
      />
    </Flex>
  );
}
