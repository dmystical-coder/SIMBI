"use client";

import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import { RewardsData } from "@/types/dashboard";

interface RewardsSectionProps {
  data: RewardsData;
}

export function RewardsSection({ data }: RewardsSectionProps) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" color="#1E1E2F" mb={5}>
        Rewards and Milestones
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gap="20px">
        {/* Current NFT Badge */}
        <Box
          bg="rgba(94, 48, 247, 0.10)"
          borderRadius="20px"
          p={6}
          position="relative"
        >
          <Box
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            w="4px"
            h="27px"
            bg="#CABFFF"
          />
          <Text fontSize="14px" fontWeight="500" color="#000000" mb={4} ml={4}>
            Current NFT
            <br />
            badge
          </Text>
          <Flex justify="center">
            <Image
              src={data.nftBadgeUrl}
              alt="NFT Badge"
              w="91px"
              h="136px"
              objectFit="contain"
            />
          </Flex>
        </Box>

        {/* Rewards Earned */}
        <Box
          bg="rgba(94, 48, 247, 0.10)"
          borderRadius="20px"
          p={6}
          position="relative"
        >
          <Box
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            w="4px"
            h="27px"
            bg="#CABFFF"
          />
          <Text fontSize="14px" fontWeight="500" color="#000000" mb={4} ml={4}>
            Rewards Earned
            <br />
            (token)
          </Text>
          <Flex align="center" justify="center" gap={3}>
            <Image
              src="/images/token-coin.png"
              alt="Token"
              w="57px"
              h="57px"
              objectFit="contain"
            />
            <Text fontSize="32px" fontWeight="600" color="#7A5FFF">
              {data.tokensEarned}
            </Text>
          </Flex>
        </Box>

        {/* Milestones Completed */}
        <Box
          bg="rgba(94, 48, 247, 0.10)"
          borderRadius="20px"
          p={6}
          position="relative"
        >
          <Box
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            w="4px"
            h="26px"
            bg="#CABFFF"
          />
          <Text fontSize="14px" fontWeight="500" color="#000000" mb={4} ml={4}>
            Milestones
            <br />
            completed
          </Text>
          <Flex justify="center">
            <Text fontSize="32px" fontWeight="600" color="#7A5FFF">
              {data.milestonesCompleted}
            </Text>
          </Flex>
        </Box>

        {/* Active Plans */}
        <Box
          bg="rgba(94, 48, 247, 0.10)"
          borderRadius="20px"
          p={6}
          position="relative"
        >
          <Box
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            w="4px"
            h="26px"
            bg="#CABFFF"
          />
          <Text fontSize="14px" fontWeight="500" color="#000000" mb={4} ml={4}>
            Active Plans
          </Text>
          <Flex justify="center">
            <Text fontSize="32px" fontWeight="600" color="#7A5FFF">
              {data.activePlans}
            </Text>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
}