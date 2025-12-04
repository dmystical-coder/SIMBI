"use client";

import { Box, Flex, Stack, Text, Image } from "@chakra-ui/react";
import { NavItem } from "@/types/dashboard";

interface SidebarProps {
  activeItem?: NavItem;
  onNavigate?: (item: NavItem) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeItem = "dashboard", onNavigate, isOpen = true, onClose }: SidebarProps) {
  const navItems = [
    { id: "dashboard" as NavItem, label: "Dashboard", icon: "/icons/home.svg", active: true },
    { id: "study-plans" as NavItem, label: "Study plans", icon: "/icons/study-plans.svg" },
    { id: "schedule" as NavItem, label: "Schedule", icon: "/icons/schedule.svg" },
    { id: "milestone" as NavItem, label: "Milestone", icon: "/icons/milestone-nav.svg" },
    { id: "rewards" as NavItem, label: "Rewards", icon: "/icons/rewards-nav.svg" },
    { id: "chat" as NavItem, label: "Let's Chat", icon: "/icons/chat-nav.svg" },
    { id: "logout" as NavItem, label: "Log out", icon: "/icons/logout-nav.svg" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={998}
          onClick={onClose}
        />
      )}
      
      <Flex
        direction="column"
        bg="#1F125C"
        w={{ base: "274px", lg: "222px" }}
        h="100vh"
        position="fixed"
        left={{ base: isOpen ? 0 : "-274px", lg: 0 }}
        top={0}
        gap={{ base: "30px", lg: "197px" }}
        py={8}
        zIndex={999}
        transition="left 0.3s ease"
      >
        {/* Close button for mobile */}
        <Flex justify="space-between" align="center" px={6} display={{ base: "flex", lg: "none" }}>
          <Image src="/images/simbi-logo-text.svg" alt="SIMBI" w="149px" h="54px" />
          <Image 
            src="/icons/close.svg" 
            alt="Close" 
            w="12px" 
            h="12px" 
            cursor="pointer"
            onClick={onClose}
          />
        </Flex>

        {/* Logo Section - Desktop */}
        <Box px={6} display={{ base: "none", lg: "block" }}>
          <Image src="/images/simbi-logo-text.svg" alt="SIMBI" w="149px" h="54px" />
        </Box>

        {/* Navigation Items */}
        <Stack gap="20px" px={6} flex={1}>
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            
            return (
              <Flex
                key={item.id}
                align="center"
                gap="20px"
                cursor="pointer"
                onClick={() => {
                  onNavigate?.(item.id);
                  onClose?.();
                }}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Box position="relative" w="20px" h="20px">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    w="20px"
                    h="20px"
                    filter={isActive ? "none" : "brightness(0) invert(1)"}
                  />
                </Box>
                <Text
                  fontSize="14px"
                  fontWeight={isActive ? "600" : "500"}
                  color={isActive ? "#FFD44D" : "#FDFDFF"}
                >
                  {item.label}
                </Text>
                {isActive && item.active && (
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg="#FFD44D"
                    ml="auto"
                  />
                )}
              </Flex>
            );
          })}
        </Stack>

        {/* Upgrade Section */}
        <Flex direction="column" px={6} pb={8} gap={{ base: "35px", lg: "50px" }}>
          {/* Simbi Character with bubble - Mobile only */}
          <Box position="relative" display={{ base: "block", lg: "none" }}>
            <Image 
              src="/images/simbi-chat-bubble.svg" 
              alt="Simbi" 
              w="168px" 
              h="169px"
              mx="auto"
            />
          </Box>

          <Box
            bg="rgba(0, 0, 0, 0.10)"
            borderRadius="18px"
            p={4}
          >
            <Text fontSize="14px" fontWeight="600" color="#FFD44D" mb={2}>
              Upgrade your plan
            </Text>
            <Text fontSize="12px" fontWeight="400" color="#D2D0DE" mb={4}>
              Connect Telegram bot, wallet, join study groups
            </Text>
            <Flex
              bg="#7A5FFF"
              borderRadius="8px"
              py={2}
              px={4}
              justify="center"
              cursor="pointer"
              _hover={{ bg: "#6B4FE8" }}
              transition="background 0.2s"
            >
              <Text fontSize="14px" fontWeight="600" color="#FFFFFF">
                Sync Telegram
              </Text>
            </Flex>
          </Box>
          
          {/* Simbi Character text - Desktop only */}
          <Box mt={-4} textAlign="center" display={{ base: "none", lg: "block" }}>
            <Text fontSize="8px" fontWeight="400" color="#FFFFFF" lineHeight="10px">
              Keep studying, or I'm telling your brain you gave up.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}