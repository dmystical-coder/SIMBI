"use client";

import { Box, Input, Image, Text, Stack, Portal } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import NotificationDrawer from "./NotificationDrawer";

interface TopNavProps {
  onMenuClick?: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username
    : "Guest";

  const handleLogout = async () => {
    await logout();
    router.push("/auth/sign-in");
  };

  const handleUpgradePlan = () => {
    // TODO: Navigate to upgrade plan page
    console.log("Navigate to upgrade plan");
  };

  const handleCustomizeSimbi = () => {
    // TODO: Navigate to customize SIMBI page
    console.log("Navigate to customize SIMBI");
  };

  return (
    <Box
      bg="#ffffff"
      borderBottom="1px solid #f0f0f0"
      position="relative"
      zIndex={100}
    >
      {/* Top Row */}
      <Box
        h="80px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: "20px", md: "40px" }}
        gap="16px"
      >
        {/* Mobile Menu Button */}
        <Box
          display={{ base: "block", lg: "none" }}
          cursor="pointer"
          onClick={onMenuClick}
        >
          <Image src="/icons/menu.svg" alt="Menu" w="22px" h="24px" />
        </Box>

        {/* Search Bar - Desktop Only */}
        <Box
          flex={1}
          maxW="600px"
          position="relative"
          display={{ base: "none", md: "block" }}
        >
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            h="48px"
            borderRadius="6px"
            border="1px solid #a5a0be"
            fontSize="16px"
            color="#c9c0d4"
            pl="16px"
            pr="40px"
            _placeholder={{ color: "#c9c0d4" }}
            _focus={{
              borderColor: "#7a5fff",
              outline: "none",
            }}
          />
          <Box
            position="absolute"
            right="16px"
            top="50%"
            transform="translateY(-50%)"
          >
            <Image
              src="/icons/search.svg"
              alt="Search"
              w="20px"
              h="20px"
              filter="brightness(0) saturate(100%) invert(77%) sepia(10%) saturate(658%) hue-rotate(221deg) brightness(93%) contrast(88%)"
            />
          </Box>
        </Box>

        {/* Right Section: Notification and User Profile */}
        <Box display="flex" alignItems="center" gap="16px">
          {/* Notification Icon */}
          <NotificationDrawer>
            <Image
              src="/icons/bell.svg"
              alt="Notifications"
              w="24px"
              h="24px"
            />
          </NotificationDrawer>

          {/* User Profile with Dropdown Menu */}
          <Menu.Root positioning={{ placement: "bottom-end", gutter: 8 }}>
            <Menu.Trigger asChild>
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                cursor="pointer"
                bg="rgba(147, 133, 255, 0.10)"
                borderRadius="16px"
                p="10px 16px"
                _hover={{ bg: "rgba(147, 133, 255, 0.15)" }}
              >
                <Image
                  src="/images/user-avatar.png"
                  alt="User"
                  w="40px"
                  h="40px"
                  borderRadius="10px"
                  objectFit="cover"
                />
                <Stack gap="4px" display={{ base: "flex", md: "flex" }}>
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    color="#000000"
                    lineHeight="1.5"
                  >
                    {displayName}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight={500}
                    color="#7a5fff"
                    lineHeight="1.5"
                  >
                    Basic Plan
                  </Text>
                </Stack>
                <Image
                  src="/icons/chevron-down.svg"
                  alt="Dropdown"
                  w="14px"
                  h="8px"
                />
              </Box>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  w="220px"
                  borderRadius="12px"
                  boxShadow="0px 4px 24px rgba(0, 0, 0, 0.15)"
                  p="8px"
                  bg="white"
                >
                  <Menu.Item
                    value="upgrade"
                    onClick={handleUpgradePlan}
                    cursor="pointer"
                    p="12px"
                    borderRadius="8px"
                    _hover={{ bg: "rgba(122, 95, 255, 0.08)" }}
                    display="flex"
                    alignItems="center"
                    gap="12px"
                  >
                    <Image
                      src="/icons/trophy.svg"
                      alt="Trophy"
                      w="18px"
                      h="18px"
                      style={{
                        filter:
                          "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                      }}
                    />
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      color="#1e1e2f"
                      fontFamily="Inter, sans-serif"
                    >
                      Upgrade Plan
                    </Text>
                  </Menu.Item>

                  <Menu.Item
                    value="customize"
                    onClick={handleCustomizeSimbi}
                    cursor="pointer"
                    p="12px"
                    borderRadius="8px"
                    _hover={{ bg: "rgba(122, 95, 255, 0.08)" }}
                    display="flex"
                    alignItems="center"
                    gap="12px"
                  >
                    <Box position="relative" w="18px" h="18px">
                      <Image
                        src="/icons/slider-1.svg"
                        alt=""
                        w="18px"
                        h="6px"
                        position="absolute"
                        top="0"
                        style={{
                          filter:
                            "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                        }}
                      />
                      <Image
                        src="/icons/slider-2.svg"
                        alt=""
                        w="18px"
                        h="6px"
                        position="absolute"
                        top="7px"
                        style={{
                          filter:
                            "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                        }}
                      />
                      <Image
                        src="/icons/slider-1.svg"
                        alt=""
                        w="18px"
                        h="6px"
                        position="absolute"
                        top="13px"
                        style={{
                          filter:
                            "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                        }}
                      />
                    </Box>
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      color="#1e1e2f"
                      fontFamily="Inter, sans-serif"
                    >
                      Customize SIMBI AI
                    </Text>
                  </Menu.Item>

                  <Menu.Item
                    value="logout"
                    onClick={handleLogout}
                    cursor="pointer"
                    p="12px"
                    borderRadius="8px"
                    _hover={{ bg: "rgba(122, 95, 255, 0.08)" }}
                    display="flex"
                    alignItems="center"
                    gap="12px"
                  >
                    <Box position="relative" w="18px" h="18px">
                      <Image
                        src="/icons/logout-arrow.svg"
                        alt=""
                        w="6px"
                        h="18px"
                        position="absolute"
                        left="0"
                        style={{
                          filter:
                            "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                        }}
                      />
                      <Image
                        src="/icons/logout-base.svg"
                        alt=""
                        w="14px"
                        h="10px"
                        position="absolute"
                        left="4px"
                        top="4px"
                        style={{
                          filter:
                            "invert(41%) sepia(86%) saturate(2391%) hue-rotate(238deg) brightness(99%) contrast(101%)",
                        }}
                      />
                    </Box>
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      color="#1e1e2f"
                      fontFamily="Inter, sans-serif"
                    >
                      Log out
                    </Text>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Box>

      {/* Search Bar - Mobile Only (Below top row) */}
      <Box
        display={{ base: "block", md: "none" }}
        px="20px"
        pb="20px"
        position="relative"
      >
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          h="48px"
          borderRadius="6px"
          border="1px solid #a5a0be"
          fontSize="16px"
          color="#c9c0d4"
          pl="16px"
          pr="40px"
          _placeholder={{ color: "#c9c0d4" }}
          _focus={{
            borderColor: "#7a5fff",
            outline: "none",
          }}
        />
        <Box
          position="absolute"
          right="36px"
          top="50%"
          transform="translateY(-50%) translateY(-10px)"
        >
          <Image
            src="/icons/search.svg"
            alt="Search"
            w="20px"
            h="20px"
            filter="brightness(0) saturate(100%) invert(77%) sepia(10%) saturate(658%) hue-rotate(221deg) brightness(93%) contrast(88%)"
          />
        </Box>
      </Box>
    </Box>
  );
}
