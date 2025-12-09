"use client"

import {
  Box,
  Button,
  Flex,
  Grid,
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
} from "react-icons/fa";

import { FiFilter } from "react-icons/fi";

import StudyModal from "../study-modal/StudyModal";

import { usePathname } from "next/navigation";
import NextLink from "next/link";

import { useRouter } from "next/navigation";

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



export default function StudyPlans(){

  const router = useRouter();
  
  const pathname = usePathname();

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

        <Flex flex={1} direction="column" align="center" justify="center" mt={20}>

          <Image
            boxSize={{base:"200px", lg:"320px"}}
            src={"/simbi-sad.png"}
            objectFit="contain"
          />

          <Text fontSize="32px" fontWeight="700" mt={6}>
            No Study Plan created Yet
          </Text>

          <Text color="gray.500" fontSize="20px" m={2} mb={8}>
            Generate a study plan to get started
          </Text>
            <StudyModal/>
        </Flex>
      </Flex>
    </Flex>
  )
}