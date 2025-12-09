"use client";

import { Box, Text, Flex, Image, Button, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";

interface NotificationAction {
  label: string;
  onClick: () => void;
  variant: "primary" | "outline";
}

interface Notification {
  id: string;
  content: string;
  time: string;
  isRead: boolean;
  type: "info" | "milestone" | "action" | "alert";
  actions?: NotificationAction[];
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    content: "You earned 5 tokens. I suggest you celebrate. Responsibly",
    time: "Thursday at 9:42 AM",
    isRead: false,
    type: "info",
  },
  {
    id: "2",
    content: "Milestone unlocked! You&apos;ve officially entered the &apos;I&apos;m serious about this&apos; zone.",
    time: "Wednesday at 9:42 AM",
    isRead: false,
    type: "milestone",
  },
  {
    id: "3",
    content: "Your next study session is waiting. So is your future degree. Let's gooo! 🎯",
    time: "Wednesday at 9:42 AM",
    isRead: false,
    type: "action",
    actions: [
      { label: "Start Session", onClick: () => console.log("Start"), variant: "primary" },
      { label: "Reschedule", onClick: () => console.log("Reschedule"), variant: "outline" },
    ],
  },
  {
    id: "4",
    content: "Boom! You just hit 50% of your study goal. I'm impressed (and that's rare).",
    time: "Tuesday at 9:42 PM",
    isRead: true,
    type: "info",
  },
  {
    id: "5",
    content: "Good morning, superstar. Your study plan is waiting. Let's flex that brain 💪",
    time: "Monday at 9:42 AM",
    isRead: true,
    type: "info",
  },
  {
    id: "6",
    content: "One missed session isn't the end. But don't make me show up in your dreams tonight.",
    time: "June 22 at 8:42 PM",
    isRead: true,
    type: "alert",
  },
];

interface NotificationDrawerProps {
  children: React.ReactNode;
}

export default function NotificationDrawer({ children }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<"All" | "Unread">("All");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "Unread") return !n.isRead;
    return true;
  });

  const isEmpty = filteredNotifications.length === 0;


  return (
    <Popover.Root positioning={{ placement: "bottom-end", gutter: 12 }}>
      <Popover.Trigger asChild>
        <Box position="relative" cursor="pointer">
          {children}
          {unreadCount > 0 && (
            <Box
              w="10px"
              h="10px"
              bg="#ff0000"
              borderRadius="50%"
              position="absolute"
              top="0"
              right="0"
              zIndex={10}
            />
          )}
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
          mt="16px"
            w="480px"
            maxW="90vw"
            bg="white"
            borderRadius="16px"
            boxShadow="0px 19px 86.9px 0px rgba(149, 127, 255, 0.53)"
            outline="none"
            _focus={{ outline: "none" }}
            overflow="hidden"
          >
            {/* Header */}
            <Flex
              direction="column"
              p="20px 24px"
              borderBottom="1px solid #F2F4F7"
              gap="16px"
            >
              <Flex justify="space-between" align="center">
                <Text fontSize="18px" fontWeight="600" color="#101828">
                  Notifications
                </Text>

                <Flex
                  align="center"
                  gap="6px"
                  cursor="pointer"
                  onClick={handleMarkAllRead}
                  _hover={{ opacity: 0.8 }}
                >
                  <Text fontSize="14px" color="#344054" fontWeight="500">
                    Mark all as read
                  </Text>
                  <Image
                    src="/check.svg"
                    alt="Check mark"
                    w="16px"
                    h="16px"
                    style={{
                      filter: "grayscale(100%) brightness(0%)",
                    }}
                  />
                </Flex>
              </Flex>

              {/* Tabs */}
              <Flex gap="24px" borderBottom="1px solid #F2F4F7" pb="0px">
                 <Box 
                    cursor="pointer"
                    pb="8px"
                    borderBottom={activeTab === "All" ? "2px solid #7A5FFF" : "2px solid transparent"}
                    onClick={() => setActiveTab("All")}
                 >
                    <Text 
                        fontSize="14px" 
                        fontWeight="500" 
                        color={activeTab === "All" ? "#7A5FFF" : "#667085"}
                    >
                        All
                    </Text>
                 </Box>
                 <Box 
                    cursor="pointer"
                    pb="8px"
                    borderBottom={activeTab === "Unread" ? "2px solid #7A5FFF" : "2px solid transparent"}
                    onClick={() => setActiveTab("Unread")}
                 >
                    <Text 
                        fontSize="14px" 
                        fontWeight="500" 
                        color={activeTab === "Unread" ? "#7A5FFF" : "#667085"}
                    >
                        Unread
                    </Text>
                 </Box>
              </Flex>
            </Flex>

            {/* Content */}
            <Box
              maxH={{ base: "400px", md: "calc(100vh - 400px)" }}
              overflowY="auto"
            >
              {isEmpty ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py="60px"
                  px="20px"
                  textAlign="center"
                  minH="300px"
                >
                  <Text fontSize="18px" fontWeight="600" color="#101828" mb="8px">
                    No notifications yet
                  </Text>
                  <Text fontSize="14px" color="#667085" maxW="280px" lineHeight="1.5">
                    We&apos;ll let you know when we&apos;ve got something new for you.
                  </Text>
                </Flex>
              ) : (
                <Box>
                  {filteredNotifications.map((notification) => (
                    <Box
                      key={notification.id}
                      bg={notification.type === "action" ? "#F5F3FF" : "white"}
                      p="16px 24px"
                      position="relative"
                      borderBottom="1px solid #F2F4F7"
                      _last={{ borderBottom: "none" }}
                      role="group"
                    >
                      <Flex gap="16px">
                        <Box position="relative">
                          {!notification.isRead && (
                            <Box
                              w="10px"
                              h="10px"
                              borderRadius="full"
                              bg="#7A5FFF"
                              mt="6px"
                            />
                          )}
                        </Box>

                        <Box flex={1}>
                          <Flex justify="space-between" align="flex-start" gap="8px">
                              <Text 
                                fontSize="14px" 
                                color="#101828" 
                                lineHeight="1.5" 
                                mb="4px"
                                fontWeight={!notification.isRead ? "600" : "400"}
                              >
                                {notification.content}
                              </Text>

                               {/* Mark Read Action */}
                               {!notification.isRead && (
                                   <Box 
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         handleMarkAsRead(notification.id);
                                     }}
                                     cursor="pointer"
                                     p="6px"
                                     borderRadius="full"
                                     _hover={{ bg: "#F2F4F7" }}
                                     flexShrink={0}
                                   >
                                       <Image 
                                         src="/check.svg"
                                         alt="Mark as read" 
                                         w="18px" 
                                         h="18px" 
                                         style={{ filter: "brightness(0) saturate(100%) invert(48%) sepia(8%) saturate(543%) hue-rotate(182deg) brightness(93%) contrast(88%)" }}
                                        />
                                   </Box>
                               )}
                          </Flex>
                          
                          {notification.actions && (
                            <Flex gap="12px" mt="12px" mb="4px">
                              {notification.actions.map((action, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  bg={action.variant === "primary" ? "#7A5FFF" : "white"}
                                  color={action.variant === "primary" ? "white" : "#344054"}
                                  border={action.variant === "outline" ? "1px solid #D0D5DD" : "none"}
                                  _hover={{
                                    bg: action.variant === "primary" ? "#6B4FEF" : "#F9FAFB"
                                  }}
                                  fontSize="14px"
                                  fontWeight="500"
                                  px="16px"
                                  h="36px"
                                  borderRadius="8px"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                  }}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </Flex>
                          )}

                          <Text fontSize="13px" color="#667085" mt="4px">
                            {notification.time}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
