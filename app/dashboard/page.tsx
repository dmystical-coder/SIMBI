"use client";

import { useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Flex, Stack, Text, Image, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserDropdown } from "@/components/dashboard/UserDropdown";
import { StudyStreak } from "@/components/dashboard/StudyStreak";
import { ProductivityScorecard } from "@/components/dashboard/ProductivityScorecard";
import { ActiveStudyPlans } from "@/components/dashboard/ActiveStudyPlans";
import { RewardsSection } from "@/components/dashboard/RewardsSection";
import { StudyTips } from "@/components/dashboard/StudyTips";
import { StudyConsistency } from "@/components/dashboard/StudyConsistency";
import { StreakAlert } from "@/components/dashboard/StreakAlert";
import { mockDashboardData } from "@/lib/mockData";
import { NavItem } from "@/types/dashboard";

export default function DashboardPage() {
  const { isLoading } = useRequireAuth();
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [showStreakAlert, setShowStreakAlert] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const handleLogout = () => {
    logout();
  };

  const dashboardUser = {
    ...mockDashboardData.user,
    firstName: user?.firstName || mockDashboardData.user.firstName,
    lastName: user?.lastName || mockDashboardData.user.lastName,
    email: user?.email || mockDashboardData.user.email,
  };

  return (
    <Flex bg="#FAFAFA" minH="100vh">
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
      >
        {/* Mobile Header */}
        <Flex 
          display={{ base: "flex", lg: "none" }} 
          justify="space-between" 
          align="center" 
          mb={4}
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

        <Flex gap={8} direction={{ base: "column", lg: "row" }}>
          {/* Left Column */}
          <Box flex={1} maxW={{ base: "100%", lg: "915px" }}>
            <Stack gap="33px">
              {/* Header Section */}
              <Box>
                <Flex
                  align="center"
                  gap={3}
                  border="1px solid #A5A0BE"
                  borderRadius="6px"
                  px={4}
                  py={3}
                  bg="#FFFFFF"
                  mb={6}
                  display={{ base: "none", lg: "flex" }}
                >
                  <Input
                    placeholder="Search"
                    border="none"
                    fontSize="16px"
                    color="#C9C0D4"
                    _placeholder={{ color: "#C9C0D4" }}
                    _focus={{ outline: "none", boxShadow: "none" }}
                  />
                  <Image src="/icons/search.svg" alt="Search" w="10px" h="10px" />
                </Flex>

                {/* Welcome Section */}
                <Box
                  bg="#F3F2FF"
                  borderRadius={{ base: "10px", lg: "20px" }}
                  p={{ base: 4, lg: 8 }}
                  position="relative"
                  overflow="hidden"
                >
                  <Flex justify="space-between">
                    <Box maxW={{ base: "60%", lg: "400px" }}>
                      <Text 
                        fontSize={{ base: "20px", lg: "40px" }} 
                        fontWeight="600" 
                        color="#27104E" 
                        mb={2}
                      >
                        Welcome back
                      </Text>
                      <Text 
                        fontSize={{ base: "10px", lg: "18px" }} 
                        fontWeight="500" 
                        color="#27104E" 
                        mb={{ base: 4, lg: 6 }}
                      >
                        I'm Simbi, ready to learn and have fun?
                      </Text>
                      <Flex
                        bg="#7A5FFF"
                        borderRadius={{ base: "8px", lg: "12px" }}
                        px={{ base: 3, lg: 6 }}
                        py={{ base: 2, lg: 3 }}
                        w="fit-content"
                        cursor="pointer"
                        _hover={{ bg: "#6B4FE8" }}
                        transition="background 0.2s"
                      >
                        <Text 
                          fontSize={{ base: "8.88px", lg: "16px" }} 
                          fontWeight="500" 
                          color="#FDFDFF"
                        >
                          Generate a new Study Plan
                        </Text>
                      </Flex>
                    </Box>
                    <Image
                      src={{ base: "/images/simbi-waving-mobile.svg", lg: "/images/simbi-waving.svg" }}
                      alt="Simbi Waving"
                      w={{ base: "94px", lg: "189px" }}
                      h={{ base: "150px", lg: "300px" }}
                      display={{base:"block", lg:"none"}}
                      position="absolute"
                      right={{ base: 2, lg: 8 }}
                      bottom={0}
                    />
                  </Flex>
                </Box>
              </Box>

              {/* Study Streak */}
              <StudyStreak data={mockDashboardData.studyStreak} />

              {/* Productivity Scorecard */}
              <ProductivityScorecard data={mockDashboardData.productivityData} />

              {/* Active Study Plans */}
              <ActiveStudyPlans plans={mockDashboardData.studyPlans} />
            </Stack>
          </Box>

          {/* Right Sidebar */}
          <Box w={{ base: "100%", lg: "390px" }}>
            <Stack gap={{ base: "24px", lg: "56px" }}>
              {/* User Profile - Desktop only */}
              <Box display={{ base: "none", lg: "block" }}>
                <UserDropdown
                  user={dashboardUser}
                  notifications={1}
                  onUpgrade={() => console.log("Upgrade")}
                  onCustomize={() => console.log("Customize")}
                  onLogout={handleLogout}
                />
              </Box>

              {/* Rewards Section */}
              <RewardsSection data={mockDashboardData.rewards} />

              {/* Study Tips */}
              <StudyTips tips={mockDashboardData.studyTips} />

              {/* Study Consistency */}
              <StudyConsistency data={mockDashboardData.consistencyData} />
            </Stack>
          </Box>
        </Flex>
      </Box>

      {/* Streak Alert Modal */}
      <StreakAlert
        open={showStreakAlert}
        onClose={() => setShowStreakAlert(false)}
        streakCount={2}
      />
    </Flex>
  );
}