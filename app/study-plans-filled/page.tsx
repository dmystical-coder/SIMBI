"use client"

import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Menu,
  Avatar,
  CloseButton,
  Dialog,
  Portal,
  Text,
  Field,
  Grid,
  GridItem
} from "@chakra-ui/react";
import {
  FaBell,
  FaRegBell,
  FaSearch,
  FaFilter,
  FaRegCalendar,
  FaTh,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPen,
} from "react-icons/fa";

import { FiEdit, FiFilter, FiMoreVertical } from "react-icons/fi";

import StudyModal from "../study-modal/StudyModal";

import { usePathname } from "next/navigation";
import NextLink from "next/link";

import { useRouter } from "next/navigation";
import { FaBook } from "react-icons/fa6";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Study plans", href: "/study-plans" },
  { label: "Schedule", href: "/schedule" },
  { label: "Milestone", href: "/milestone" },
  { label: "Rewards", href: "/rewards" },
  { label: "Let's Chat", href: "/chat" },
  { label: "Log out", href: "/logout" },
];

const today = new Date().toLocaleDateString();



export default function StudyFilled(){

  const router = useRouter();
  
  const pathname = usePathname();

  const scheduleItems = [
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

  return (
    
    <Flex w="100%"  bg="#F8F7FF">
      {/* SIDEBAR */}
      <Flex
        w={{base:"72%", lg:"18%"}}
        bg="#1F125C"
        color="white"
        direction="column"
        justify="space-between"
        py={6}
        fontSize="14px"
      >
        <Box width={{base:"100px", lg:"280px"}} height="48px" px={4}>
          <Image
          src="/logo-white.svg"
          alt="SIMBI"
          objectFit="contain"
          />
          </Box>

        <Flex direction="column" mt={10} gap={1}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
            <Link
              as={NextLink}
              key={item.label}
              justifyContent="flex-start"
              color={isActive ? "#FFD44D" : "white"}
              fontWeight="500"
              px={6}
              mt={4}
              borderRadius="0"
              href={item.href}
              _hover={{
                color:"#FFD44D"
              }}
            >
              {item.label}
            </Link>
          )
          })}
        </Flex>

        <Image
        mt={{base:20, lg:36}}
        mb={4}
        mx="auto"
        boxSize="170px"
        src={"/simbi-dashboard.svg"}
        objectFit="contain"
        />

        {/* Upgrade panel */}
        {/* <Flex direction="column" px={6} mt={8} mb={4} gap={3}> */}
          <Box
            bg="blue.900"
            m={4}
            p={2}
            gap={2}
            borderRadius="18px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            // gap={3}
          >
            <Text color="#FFD44D">Upgrade your plan</Text>
            
            <Text fontSize="12px">Connect telegram bots, wallets, join study groups.</Text>

            <Button bg="#2AABEE" color="white" borderRadius="xl">
            Sync Telegram
          </Button>
          </Box>

          
        {/* </Flex> */}
      </Flex>

      {/* MAIN */}

      <Flex flex={1} flexDirection="column" py={4} px={{base:4, lg:8}}>

        {/* TOP BAR */}

        
        <Flex justify="space-between" align="center" flexDirection={{base:"column", lg:"row"}}>
            {/* Search */}
            <Box  order={{base:2, lg:1}} w={{base:"320px", lg:"370px"}}>
              <InputGroup endElement={<FaSearch/>}  h="48px">
                <Input placeholder="Search" bg="white" borderRadius="10px"/>
              </InputGroup>
            </Box>

            {/* Notifications + Profile */}
            <Flex align="center" gap={8} order={{base:1, lg:2}}>
            <IconButton
              aria-label="Notifications"
              variant="ghost"
            >
                <FaRegBell />
            </IconButton>

            {/* Profile menu using Menu.Root, Menu.Trigger, Menu.Content */}
            <Menu.Root>
              <Menu.Trigger>
                <Flex align="center" gap={3} cursor="pointer" bg="#E4DFFF" h={{base:"40px", lg:"60px"}} w={{base:"170px", lg:"240px"}} borderRadius="xl">
                    <Avatar.Root size="sm">
                        <Avatar.Fallback name="Grace Fernandes" />
                        <Avatar.Image src="/avatar.png" />
                    </Avatar.Root>
                  <Flex direction="column" align="flex-start">
                    <Text fontSize="14px" fontWeight="600">Grace Fernandes</Text>
                    <Text fontSize="12px" color="#9385FF">
                      Basic Plan
                    </Text>
                  </Flex>
                  <FaChevronDown/>
                </Flex>
              </Menu.Trigger>

              <Menu.Content bg="white" shadow="md" minW="150px">
                <Menu.Item value="profile">Profile</Menu.Item>
                <Menu.Item value="logout">Logout</Menu.Item>
              </Menu.Content>
            </Menu.Root>
            </Flex>
        </Flex>

        {/* SECOND BAR */}

        <Flex mt={10} w="100%" align="center" justify="space-between" fontSize="14px">
          <Flex direction="column" gap={5} w="100%">
            {/* Tabs */}
            <Flex align="center" justify="space-between" borderBottom="1px solid #C9C0D4">
              {/* Left section */}
              <Flex align="center" gap={8}>
                <Menu.Root>
                  <Menu.Trigger>
                    <Button
                      variant="ghost"
                      fontWeight="600"
                      fontSize="24px"
                    >
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
                  fontWeight="400"
                >
                  Study Plans
                </Button>

                <Button 
                  variant="ghost"
                  pb={2}
                  fontWeight="400">
                  Study Plan Tracker
                </Button>
              </Flex>

              {/* Right controls */}
              <Flex align="center" gap={3} mb={1}>
                <Button
                  border="1px solid #7A5FFF"
                  bg="transparent"
                  color="#7A5FFF"
                >
                  
                  <FiFilter />  
                  Filter
                </Button>

                <Button bg="#9566FF" color="white" onClick={() =>
                  router.push("/study-session")
                }>
                  Start a Study Session
                </Button>
              </Flex>
            </Flex>

            {/* Date control */}
            <Flex justify="space-between">
              
            <Flex align="center" gap={4}>
              <Flex
                align="center"
                gap={3}
                p={2}
                px={4}
                border="none"
              >
                <FaRegCalendar color="#9566FF" />
                <Text fontSize="18px" fontWeight="500" color="#9566FF">{today}</Text>
                <FaChevronDown />
              </Flex>

              <Flex gap={2}>
                <IconButton
              aria-label="Next"
              size="xs"
              bgColor="pink.100">
                <FaChevronLeft color="#9566FF" />
              </IconButton>

              <Text bg="#9566FF" color="white" p={2} borderRadius="lg">
                Today
              </Text>

              <IconButton
              aria-label="Next"
              size="xs"
              bgColor="pink.100">
                <FaChevronRight  color="#9566FF"/>
              </IconButton>
              </Flex>

            </Flex>

            <Flex >
              <IconButton aria-label="Calendar" size="xs" variant="outline" borderRightRadius="none">
                    <FaRegCalendar  color="#9566FF"/>
                </IconButton>
                    
                <IconButton aria-label="Grid" size="xs" variant="outline" borderLeftRadius="none">
                  <FaTh />
                </IconButton>
            </Flex> 
            </Flex>

            
          </Flex>
        </Flex>


        <Grid mt={8}
    //   h={{ base: "auto", lg: "200px" }}
      templateRows={{ base: "repeat(3, 1fr)", lg: "repeat(2, 1fr)" }}
      templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
      gap={8}
    >
      {/* Red box: left on desktop, second on mobile */}
      <GridItem order={{ base: 2, lg: 1 }}>
      <Grid templateColumns={{base:"repeat(1, 1fr)", lg:"repeat(2, 1fr)"}} fontSize="14px" gap={4} >
            {scheduleItems.map((item) => (
            <Flex key={item.id} align="center" justify="space-between" bgColor={`${item.color}.100`} p={{base:2, lg:2}}  gap={{base:4, lg:4}} borderRadius="xl" w="300px">
                <IconButton bgColor={`${item.color}.200`} borderRadius="xl" p={2}> 
                    <FiEdit color={`${item.color}.400`}/>
                </IconButton>

                <Box display="flex" flexDirection="column">
                    <Text color="#1E1E2F">{item.title}</Text>
                    <Text color="#D2D0DE" fontSize="12px">{item.time}</Text>
                </Box>

                <Menu.Root>
                  <Menu.Trigger>
                    <IconButton
                      variant="ghost"
                    >
                      <FiMoreVertical size="xs" />
                    </IconButton>
                  </Menu.Trigger>
                  <Menu.Content>
                    <Menu.Item value="study  session">Start Study Session</Menu.Item>
                    <Menu.Item value="study plan" color="#7949FF">Edit Study Plan</Menu.Item>
                    <Menu.Item value="delete plan" color="#FF5A5F">Delete Study Plan</Menu.Item>
                  </Menu.Content>
                </Menu.Root>

            </Flex>
            ))}
        </Grid>
      </GridItem>

      {/* Yellow box: top-right on desktop, first on mobile */}
      <GridItem colSpan={1} order={{ base: 1, lg: 2 }}>
        <Flex bg="#E4DFFF" borderRadius="xl" h={{base:"115px", lg:"190px"}} p={2}>
          <Box display="flex" flexDirection="column" textAlign="start">
            <Text fontSize={{base:"20px", lg:"32px"}} fontWeight="600" w="165px">Simbi's Pep talk</Text>
            <Text fontSize="16px" fontWeight="400">Study Plan - let's pretend you'll stick to it 😉</Text>
          </Box>
          <Image src="/pep-talk simbi.svg"
          p={1}/>
        </Flex>
      </GridItem>

      {/* Blue box: bottom-right on desktop, third on mobile */}
      <GridItem colSpan={1} order={{ base: 3, lg: 2 }}>
        <Flex flexDirection="column" gap={4}>
          <Box bg="white" py={2} px={4} borderRadius="xl" w="335px" maxH="144px">
            <Text color="#FF5A5F" fontSize="16px" fontWeight="500" mb={2}>Urgent Deadlines</Text>
            <Flex align="center" justify="space-between" bgColor="orange.100" p={{base:2, lg:2}}  gap={{base:4, lg:4}} borderRadius="xl" w="300px">
                <IconButton bgColor="orange.200" borderRadius="xl" p={2}> 
                    <FiEdit color="orange.400"/>
                </IconButton>

                <Box display="flex" flexDirection="column" fontSize="14px" color="#6B7280">
                    <Text>Reading - Economics</Text>
                    <Text>Today</Text>
                </Box>
                
                <IconButton variant="ghost">
                  <FiMoreVertical size="xs" />
                </IconButton>
            </Flex>
            
          </Box>


          <Box bg="white" py={2} px={4} borderRadius="xl" w="335px" maxH="144px">
            <Text color="#C80E13" fontSize="16px" fontWeight="500" mb={2}>Missed Deadlines</Text>
            <Flex align="center" justify="space-between" bgColor="red.100" p={{base:2, lg:2}}  gap={{base:4, lg:4}} borderRadius="xl" w="300px">
                <IconButton bgColor="red.200" borderRadius="xl" p={2}> 
                    <FiEdit color="red.400"/>
                </IconButton>

                <Box display="flex" flexDirection="column" fontSize="14px" color="#6B7280">
                    <Text>Physics</Text>
                    <Text>Today</Text>
                </Box>
                
                <IconButton variant="ghost">
                  <FiMoreVertical size="xs" />
                </IconButton>
            </Flex>
            
          </Box>

        </Flex>
      </GridItem>
    </Grid>

        



      </Flex>
    </Flex>
  )
}