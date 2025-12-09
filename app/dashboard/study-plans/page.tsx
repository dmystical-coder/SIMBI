"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  Image,
  Menu,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StudyModal from "@/app/study-modal/StudyModal";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaTh,
  FaRegCalendar,
} from "react-icons/fa";
import { FiFilter, FiEdit, FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/navigation";

const today = new Date().toLocaleDateString();

// Mock data from the filled page
const MOCK_SCHEDULE_ITEMS = [
  {
    id: 1,
    title: "Reading - Chemistry",
    time: "08:00AM - 09:00AM",
    color: "pink",
  },
  {
    id: 2,
    title: "Test - Mathematics",
    time: "11:00AM - 12:00PM",
    color: "green",
  },
  {
    id: 3,
    title: "Reading - Economics",
    time: "01:00PM - 02:00PM",
    color: "orange",
  },
  {
    id: 4,
    title: "Reading - Physics",
    time: "02:00PM - 03:00PM",
    color: "gray",
  },
  {
    id: 5,
    title: "Reading - Physics",
    time: "03:00PM - 04:00PM",
    color: "gray",
  },
  {
    id: 6,
    title: "Reading - English",
    time: "05:00PM - 06:00PM",
    color: "red",
  },
  {
    id: 7,
    title: "Reading - Smart Money",
    time: "07:00PM - 08:00PM",
    color: "yellow",
  },
  {
    id: 8,
    title: "Test - Mathematics",
    time: "09:00PM - 10:00PM",
    color: "green",
  },
];

export default function StudyPlansPage() {
  const router = useRouter();
  const { isLoading } = useRequireAuth();
  // State to toggle between empty and filled view
  // In a real app, this would be determined by whether the user has any plans
  const [hasPlans, setHasPlans] = useState(false);

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Text>Loading...</Text>
      </Box>
    );
  }

  const handlePlanCreated = () => {
    setHasPlans(true);
  };

  return (
    <DashboardLayout>
      <Flex direction="column" w="100%" minW={0}>
        {/* TOP CONTROLS */}
        <Flex w="100%" align="center" justify="space-between" minW={0} mb={8}>
          <Flex direction="column" gap={5} w="100%" minW={0}>
            {/* Tabs */}
            <Flex
              align="center"
              justify="space-between"
              borderBottom="1px solid #C9C0D4"
              flexWrap="wrap"
              minW={0}
            >
              <Flex align="center" gap={6} flexWrap="wrap" minW={0}>
                <Menu.Root>
                  <Menu.Trigger>
                    <Button variant="ghost" fontWeight="600" fontSize="24px">
                      Study Plans
                      <FaChevronDown />
                    </Button>
                  </Menu.Trigger>
                  <Menu.Content>
                    <Menu.Item value="study plans">Study Plans</Menu.Item>
                    <Menu.Item value="study tracker">Study Tracker</Menu.Item>
                  </Menu.Content>
                </Menu.Root>

                <Button
                  variant="ghost"
                  borderBottom="3px solid #7A5FFF"
                  borderRadius="0"
                  pb={2}
                  color="#7A5FFF"
                >
                  Study Plans
                </Button>

                <Button variant="ghost" pb={2}>
                  Study Plan Tracker
                </Button>
              </Flex>

              {/* Right Controls */}
              <Flex align="center" gap={3} mb={1} flexWrap="wrap" minW={0}>
                <Button
                  border="1px solid #7A5FFF"
                  bg="transparent"
                  color="#7A5FFF"
                >
                  <FiFilter />
                  Filter
                </Button>

                <Button
                  bg="#9566FF"
                  color="white"
                  onClick={() => router.push("/study-session")}
                >
                  Start a Study Session
                </Button>
              </Flex>
            </Flex>

            {/* Date Control */}
            <Flex justify="space-between" flexWrap="wrap" gap={4} minW={0}>
              <Flex align="center" gap={4} flexWrap="wrap" minW={0}>
                <Flex align="center" gap={3} p={2} px={4}>
                  <FaRegCalendar color="#9566FF" />
                  <Text fontSize="18px" fontWeight="500" color="#9566FF">
                    {today}
                  </Text>
                  <FaChevronDown />
                </Flex>

                <Flex gap={2} align="center">
                  <IconButton aria-label="Prev" size="xs" bgColor="pink.100">
                    <FaChevronLeft color="#9566FF" />
                  </IconButton>

                  <Text bg="#9566FF" color="white" p={2} borderRadius="lg">
                    Today
                  </Text>

                  <IconButton aria-label="Next" size="xs" bgColor="pink.100">
                    <FaChevronRight color="#9566FF" />
                  </IconButton>
                </Flex>
              </Flex>

              <Flex flexShrink={0}>
                <IconButton
                  aria-label="Calendar"
                  size="xs"
                  variant="outline"
                  borderRightRadius="none"
                >
                  <FaRegCalendar color="#9566FF" />
                </IconButton>

                <IconButton
                  aria-label="Grid"
                  size="xs"
                  variant="outline"
                  borderLeftRadius="none"
                >
                  <FaTh />
                </IconButton>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* CONTENT */}
        {!hasPlans ? (
          /* EMPTY STATE */
          <Flex
            flex={1}
            direction="column"
            align="center"
            justify="center"
            mt={20}
            minW={0}
          >
            <Image
              boxSize={{ base: "200px", lg: "320px" }}
              src={"/simbi-sad.png"}
              objectFit="contain"
            />

            <Text fontSize="32px" fontWeight="700" mt={6}>
              No Study Plan created Yet
            </Text>

            <Text color="gray.500" fontSize="20px" m={2} mb={8}>
              Generate a study plan to get started
            </Text>

            <StudyModal onPlanCreated={handlePlanCreated} />
          </Flex>
        ) : (
          /* FILLED STATE */
          <Grid
            templateRows={{ base: "repeat(3, 1fr)", lg: "repeat(2, 1fr)" }}
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            gap={8}
          >
            {/* Schedule List */}
            <GridItem order={{ base: 2, lg: 1 }}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                fontSize="14px"
                gap={4}
              >
                {MOCK_SCHEDULE_ITEMS.map((item) => (
                  <Flex
                    key={item.id}
                    align="center"
                    justify="space-between"
                    bgColor={`${item.color}.100`}
                    p={2}
                    gap={4}
                    borderRadius="xl"
                    w="100%"
                    maxW="300px"
                  >
                    <IconButton
                      bgColor={`${item.color}.200`}
                      borderRadius="xl"
                      p={2}
                      aria-label="Edit"
                    >
                      <FiEdit color={`${item.color}.400`} />
                    </IconButton>

                    <Box display="flex" flexDirection="column">
                      <Text color="#1E1E2F" fontWeight="500">
                        {item.title}
                      </Text>
                      <Text color="#6B7280" fontSize="12px">
                        {item.time}
                      </Text>
                    </Box>

                    <Menu.Root>
                      <Menu.Trigger>
                        <IconButton
                          variant="ghost"
                          size="xs"
                          aria-label="Options"
                        >
                          <FiMoreVertical />
                        </IconButton>
                      </Menu.Trigger>
                      <Menu.Content>
                        <Menu.Item value="study session">
                          Start Study Session
                        </Menu.Item>
                        <Menu.Item value="study plan" color="#7949FF">
                          Edit Study Plan
                        </Menu.Item>
                        <Menu.Item value="delete plan" color="#FF5A5F">
                          Delete Study Plan
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Root>
                  </Flex>
                ))}
              </Grid>
            </GridItem>

            {/* Simbi Pep Talk */}
            <GridItem colSpan={1} order={{ base: 1, lg: 2 }}>
              <Flex
                bg="#E4DFFF"
                borderRadius="xl"
                h={{ base: "115px", lg: "190px" }}
                p={4}
                align="center"
                justify="space-between"
              >
                <Box display="flex" flexDirection="column" textAlign="start">
                  <Text
                    fontSize={{ base: "20px", lg: "32px" }}
                    fontWeight="600"
                    lineHeight="1.2"
                    mb={2}
                  >
                    Simbi&apos;s Pep talk
                  </Text>
                  <Text fontSize="16px" fontWeight="400">
                    Study Plan - let&apos;s pretend you&apos;ll stick to it 😉
                  </Text>
                </Box>
                <Image
                  src="/pep-talk simbi.svg"
                  h="90%"
                  objectFit="contain"
                  alt="Simbi"
                />
              </Flex>
            </GridItem>

            {/* Deadlines */}
            <GridItem colSpan={1} order={{ base: 3, lg: 2 }}>
              <Flex flexDirection="column" gap={4}>
                {/* Urgent */}
                <Box
                  bg="white"
                  py={4}
                  px={4}
                  borderRadius="xl"
                  w="100%"
                  maxW="335px"
                  border="1px solid #E2E8F0"
                >
                  <Text
                    color="#FF5A5F"
                    fontSize="16px"
                    fontWeight="500"
                    mb={3}
                  >
                    Urgent Deadlines
                  </Text>
                  <Flex
                    align="center"
                    justify="space-between"
                    bgColor="orange.100"
                    p={2}
                    gap={4}
                    borderRadius="xl"
                  >
                    <IconButton
                      bgColor="orange.200"
                      borderRadius="xl"
                      p={2}
                      aria-label="Edit"
                    >
                      <FiEdit color="orange.400" />
                    </IconButton>

                    <Box
                      display="flex"
                      flexDirection="column"
                      fontSize="14px"
                      color="#6B7280"
                      flex={1}
                    >
                      <Text fontWeight="500">Reading - Economics</Text>
                      <Text fontSize="12px">Today</Text>
                    </Box>

                    <IconButton variant="ghost" size="xs" aria-label="Options">
                      <FiMoreVertical />
                    </IconButton>
                  </Flex>
                </Box>

                {/* Missed */}
                <Box
                  bg="white"
                  py={4}
                  px={4}
                  borderRadius="xl"
                  w="100%"
                  maxW="335px"
                  border="1px solid #E2E8F0"
                >
                  <Text
                    color="#C80E13"
                    fontSize="16px"
                    fontWeight="500"
                    mb={3}
                  >
                    Missed Deadlines
                  </Text>
                  <Flex
                    align="center"
                    justify="space-between"
                    bgColor="red.100"
                    p={2}
                    gap={4}
                    borderRadius="xl"
                  >
                    <IconButton
                      bgColor="red.200"
                      borderRadius="xl"
                      p={2}
                      aria-label="Edit"
                    >
                      <FiEdit color="red.400" />
                    </IconButton>

                    <Box
                      display="flex"
                      flexDirection="column"
                      fontSize="14px"
                      color="#6B7280"
                      flex={1}
                    >
                      <Text fontWeight="500">Physics</Text>
                      <Text fontSize="12px">Today</Text>
                    </Box>

                    <IconButton variant="ghost" size="xs" aria-label="Options">
                      <FiMoreVertical />
                    </IconButton>
                  </Flex>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </Flex>
    </DashboardLayout>
  );
}
