"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { Trophy } from "lucide-react";
import { UserProfile } from "@/types/dashboard";

interface UserDropdownProps {
  user: UserProfile;
  notifications?: number;
  onUpgrade?: () => void;
  onCustomize?: () => void;
  onLogout?: () => void;
}

export function UserDropdown({ 
  user, 
  onUpgrade,
  onCustomize,
  onLogout 
}: UserDropdownProps) {
  return (
    <Flex align="center" gap={4}>
      {/* Notification Bell */}
      <Box position="relative" cursor="pointer" display={{ base: "none", lg: "block" }}>
        <Image src="/icons/notification-badge.svg" alt="Notifications" w="22px" h="23px" />
      </Box>

      {/* User Profile Menu */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Flex
            align="center"
            gap={3}
            bg="rgba(147, 133, 255, 0.10)"
            borderRadius="16px"
            px={4}
            py={2}
            cursor="pointer"
            _hover={{ bg: "rgba(147, 133, 255, 0.15)" }}
            transition="background 0.2s"
          >
            <Image
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              w={{ base: "28px", lg: "40px" }}
              h={{ base: "28px", lg: "40px" }}
              borderRadius={{ base: "7px", lg: "10px" }}
              objectFit="cover"
            />
            <Box display={{ base: "none", lg: "block" }}>
              <Text fontSize="12px" fontWeight="500" color="#000000">
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="12px" fontWeight="500" color="#7A5FFF">
                {user.plan}
              </Text>
            </Box>
            <Box display={{ base: "block", lg: "none" }}>
              <Text fontSize="10px" fontWeight="500" color="#000000">
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="10px" fontWeight="500" color="#7A5FFF">
                {user.plan}
              </Text>
            </Box>
            <Image src="/icons/chevron-down-small.svg" alt="Dropdown" w="10px" h="6px" />
          </Flex>
        </Menu.Trigger>

        <Menu.Content
          bg="#FFFFFF"
          borderRadius="16px"
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.20)"
          minW="220px"
          p={2}
          zIndex={1000}
          position="absolute"
          top="100%"
          mt={2}
        >
          <Menu.Item
            value="upgrade"
            onClick={onUpgrade}
            cursor="pointer"
            borderRadius="8px"
            px={3}
            py={2}
            _hover={{ bg: "#F3F2FF" }}
          >
            <Flex align="center" gap="10px">
              <Trophy size={18} color="#7A5FFF" />
              <Text fontSize="16px" fontWeight="400" color="#000000">
                Upgrade Plan
              </Text>
            </Flex>
          </Menu.Item>

          <Menu.Item
            value="customize"
            onClick={onCustomize}
            cursor="pointer"
            borderRadius="8px"
            px={3}
            py={2}
            _hover={{ bg: "#F3F2FF" }}
          >
            <Flex align="center" gap="10px">
              <Flex gap="2px" direction="column">
                <Box w="18px" h="2px" bg="#7A5FFF" />
                <Box w="18px" h="2px" bg="#7A5FFF" />
                <Box w="18px" h="2px" bg="#7A5FFF" />
              </Flex>
              <Text fontSize="16px" fontWeight="400" color="#000000">
                Customize SIMBI AI
              </Text>
            </Flex>
          </Menu.Item>

          <Menu.Item
            value="logout"
            onClick={onLogout}
            cursor="pointer"
            borderRadius="8px"
            px={3}
            py={2}
            _hover={{ bg: "#F3F2FF" }}
          >
            <Flex align="center" gap="10px">
              <Flex align="center" gap="4px">
                <Box w="6px" h="18px" bg="#7A5FFF" />
                <Box w="14px" h="10px" position="relative">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M8 1L13 5L8 9M13 5H1" stroke="#7A5FFF" strokeWidth="2" />
                  </svg>
                </Box>
              </Flex>
              <Text fontSize="16px" fontWeight="400" color="#000000">
                Log out
              </Text>
            </Flex>
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Flex>
  );
}