"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStudyPlans,
  getStudySessions,
  getAllMilestones,
  type StudySession,
} from "@/lib/dashboard";

interface StatCard {
  title: string;
  value: string | number;
  image?: string;
}

export default function RewardsAndMilestones() {
  const [stats, setStats] = useState<StatCard[]>([
    { title: "Active Plans", value: 0 },
    {
      title: "Rewards Earned\n(token)",
      value: 0,
      image: "/images/token-coin.png",
    },
    { title: "Milestones completed", value: 0 },
    { title: "Total Study points", value: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const fetchRewardsData = async () => {
    setIsLoading(true);
    try {
      const studyPlans = await getStudyPlans();
      const activePlans = studyPlans.filter((plan) => plan.status === "active");

      // Get all milestones
      const allMilestones = await getAllMilestones();
      const completedMilestones = allMilestones.filter((m) => m.completed);

      // Get all sessions and calculate study points
      const allSessions: StudySession[] = [];
      for (const plan of studyPlans) {
        const sessions = await getStudySessions(plan.id);
        allSessions.push(...sessions);
      }

      const completedSessions = allSessions.filter((s) => s.completed);
      const totalStudyPoints = completedSessions.reduce(
        (sum, session) => sum + Math.floor(session.duration / 10), // 1 point per 10 minutes
        0
      );

      // Calculate rewards (tokens earned from milestones and sessions)
      const rewardsEarned =
        completedMilestones.length * 5 + Math.floor(totalStudyPoints / 10);

      setStats([
        { title: "Active Plans", value: activePlans.length },
        {
          title: "Rewards Earned\n(token)",
          value: rewardsEarned,
          image: "/images/token-coin.png",
        },
        { title: "Milestones completed", value: completedMilestones.length },
        { title: "Total Study points", value: totalStudyPoints },
      ]);
    } catch (error) {
      console.error("Failed to fetch rewards data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="10px"
      >
        <Text
          className="sm:text[16px]"
          fontSize="20px"
          fontWeight={600}
          color="rgba(30, 30, 47, 1)"
        >
          Rewards and Milestones
        </Text>
        <Link href="/milestone">
          <Text
            fontSize="14px"
            fontWeight={500}
            color="#7a5fff"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            View All
          </Text>
        </Link>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="22.5px">
        {/* NFT Badge Card */}
        <Box
          flex="1"
          minW={{ base: "100%", sm: "135px" }}
          bg="rgba(94, 48, 247, 0.10)"
          borderRadius="15px"
          p="16px"
          position="relative"
          minH="135px"
        >
          <Box
            w="4px"
            h="27px"
            bg="#cabfff"
            position="absolute"
            left="16px"
            bottom="16px"
          />
          <Text
            fontSize="14px"
            fontWeight={500}
            color="#000000"
            whiteSpace="pre-line"
            mb="8px"
          >
            Current NFT{"\n"}badge
          </Text>
          <Box position="absolute" right="8px" bottom="8px" w="96px" h="96px">
            <Image
              src="/images/nft-badge.png"
              alt="NFT Badge"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        </Box>

        {stats.map((stat, index) => (
          <Box
            key={index}
            flex="1"
            minW={{ base: "calc(50% - 11.25px)", sm: "135px" }}
            bg="rgba(94, 48, 247, 0.10)"
            borderRadius="15px"
            p="16px"
            position="relative"
            minH="135px"
          >
            <Text
              fontSize="14px"
              fontWeight={500}
              color="#000000"
              whiteSpace="pre-line"
              mb="8px"
            >
              {stat.title}
            </Text>
            <Box
              w="4px"
              h={index === 0 ? "22px" : "26px"}
              bg="#cabfff"
              position="absolute"
              left="16px"
              bottom="12px"
            />
            {stat.image && (
              <Box
                position="absolute"
                left="32px"
                bottom="8px"
                w="40px"
                h="40px"
              >
                <Image
                  src={stat.image}
                  alt="Token"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            )}
            <Text
              fontSize="30px"
              fontWeight={600}
              color="#7a5fff"
              position="absolute"
              right="16px"
              bottom="0"
            >
              {isLoading ? "..." : stat.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
