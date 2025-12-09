"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  Image,
  Input,
  InputGroup,
  Menu,
} from "@chakra-ui/react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserDropdown } from "@/components/dashboard/UserDropdown";
import { mockDashboardData } from "@/lib/mockData";
import { NavItem } from "@/types/dashboard";
import StudyModal from "../study-modal/StudyModal";
import {
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaTh,
  FaRegCalendar,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { useRouter } from "next/navigation";

const today = new Date().toLocaleDateString();

export default function DashboardPage() {
  const router = useRouter();

  // Backend re-enabled
  const { isLoading } = useRequireAuth();
  const { user, logout } = useAuth();

  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [showStreakAlert, setShowStreakAlert] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dashboardUser = {
    ...mockDashboardData.user,
    firstName: user?.firstName || mockDashboardData.user.firstName,
    lastName: user?.lastName || mockDashboardData.user.lastName,
    email: user?.email || mockDashboardData.user.email,
  };

  if (isLoading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const handleLogout = () => logout();

  return (
    <Flex bg="#FAFAFA" minH="100vh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: "222px" }}
        flex={1}
        p={{ base: 4, md: 6, lg: 8 }}
        overflowX="hidden"
        minW={0}
      >
        {/* Mobile Header */}
        <Flex
          display={{ base: "flex", lg: "none" }}
          justify="space-between"
          align="center"
          mb={4}
          minW={0}
        >
          <Image
            src="/icons/menu.svg"
            alt="Menu"
            w="22px"
            h="24px"
            cursor="pointer"
            onClick={() => setSidebarOpen(true)}
          />

          <UserDropdown
            user={dashboardUser}
            notifications={1}
            onUpgrade={() => console.log("Upgrade")}
            onCustomize={() => console.log("Customize")}
            onLogout={handleLogout}
          />
        </Flex>

        {/* MAIN WRAPPER */}
        <Flex flexDirection="column" py={4} px={{ base: 4, lg: 8 }} minW={0}>
          {/* TOP BAR */}
          <Flex
            justify="space-between"
            align="center"
            flexDirection={{ base: "column", lg: "row" }}
            flexWrap="wrap"
            gap={4}
            minW={0}
          >
            {/* Desktop Search */}
            <Flex
              align="center"
              gap={3}
              border="1px solid #A5A0BE"
              borderRadius="6px"
              px={4}
              py={3}
              bg="#FFFFFF"
              display={{ base: "none", lg: "flex" }}
              flexShrink={1}
              minW={0}
            >
              <Input
                placeholder="Search"
                border="none"
                fontSize="16px"
                color="#C9C0D4"
                _placeholder={{ color: "#C9C0D4" }}
                _focus={{ outline: "none", boxShadow: "none" }}
                minW={0}
              />
              <Image src="/icons/search.svg" alt="Search" w="10px" h="10px" />
            </Flex>

            {/* Notifications + Profile */}
            <Flex
              align="center"
              gap={6}
              minW={0}
              flexShrink={1}
              display={{ base: "none", lg: "block" }}
            >
              <UserDropdown
                user={dashboardUser}
                notifications={1}
                onUpgrade={() => console.log("Upgrade")}
                onCustomize={() => console.log("Customize")}
                onLogout={handleLogout}
              />
            </Flex>
          </Flex>

          {/* SECOND BAR */}
          <Flex mt={10} w="100%" align="center" justify="space-between" minW={0}>
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
                      <Menu.Item value="study tracker">
                        Study Tracker
                      </Menu.Item>
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

          {/* EMPTY STATE */}
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

            <StudyModal />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
