"use client";

import { Box, Stack, Text, Image, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  showIndicator?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "/icons/home.svg",
    showIndicator: true,
  },
  {
    label: "Study plans",
    href: "/dashboard/study-plans",
    icon: "/icons/category.svg",
  },
  {
    label: "Schedule",
    href: "/dashboard/schedule",
    icon: "/icons/schedule.svg",
  },
  {
    label: "Milestone",
    href: "/dashboard/milestone",
    icon: "/icons/milestone.svg",
    showIndicator: true,
  },
  { label: "Rewards", href: "/dashboard/rewards", icon: "/icons/rewards.svg" },
  {
    label: "Resources",
    href: "/dashboard/resources",
    icon: "/icons/book-open.svg",
  },
  { label: "Let's Chat", href: "/dashboard/chat", icon: "/icons/chat.svg" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Box
      w={{ base: "274px", lg: "274px" }}
      h="100vh"
      bg="#1f125c"
      position="fixed"
      left={0}
      top={0}
      display={{ base: isOpen ? "flex" : "none", lg: "flex" }}
      flexDirection="column"
      p="36px 0"
      overflowY="auto"
      zIndex={1000}
    >
      {/* Close button for mobile */}
      {onClose && (
        <Box
          position="absolute"
          top="25px"
          right="27px"
          display={{ base: "block", lg: "none" }}
        >
          <IconButton
            aria-label="Close sidebar"
            onClick={onClose}
            variant="ghost"
            size="sm"
            color="#fdfdff"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
          >
            <Image src="/icons/close.svg" alt="Close" w="32px" h="32px" />
          </IconButton>
        </Box>
      )}

      {/* Logo */}
      <Box px="37px" mb="72px">
        <Image
          src="/images/simbi-logo-sidebar.svg"
          alt="SIMBI"
          w="149px"
          h="54px"
        />
      </Box>

      {/* Navigation */}
      <Stack gap="32px" flex={1} px="40px">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="20px"
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                position="relative"
              >
                <Box
                  w="24px"
                  h="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    w="100%"
                    h="100%"
                    style={{
                      filter: isActive
                        ? "brightness(0) saturate(100%) invert(86%) sepia(38%) saturate(1647%) hue-rotate(356deg) brightness(104%) contrast(101%)"
                        : "brightness(0) saturate(100%) invert(100%)",
                    }}
                  />
                </Box>
                <Text
                  fontSize="14px"
                  fontWeight={isActive ? 600 : 500}
                  color={isActive ? "#ffd44d" : "#fdfdff"}
                  fontFamily="Poppins, sans-serif"
                >
                  {item.label}
                </Text>
                {item.showIndicator && isActive && (
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="50%"
                    bg="#ffd44d"
                    flexShrink={0}
                  />
                )}
              </Box>
            </Link>
          );
        })}

        {/* Log out */}
        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          mt="4px"
        >
          <Box
            w="24px"
            h="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Image
              src="/icons/logout.svg"
              alt="Log out"
              w="100%"
              h="100%"
              style={{
                filter: "brightness(0) saturate(100%) invert(100%)",
              }}
            />
          </Box>
          <Text
            fontSize="14px"
            fontWeight={500}
            color="#fdfdff"
            fontFamily="Poppins, sans-serif"
          >
            Log out
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
