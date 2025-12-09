"use client";

import { Flex, Text, Image } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";

interface StreakAlertProps {
  open: boolean;
  onClose: () => void;
  streakCount?: number;
}

export function StreakAlert({ open, onClose, streakCount = 2 }: StreakAlertProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          borderRadius="50px"
          background="linear-gradient(22.19deg, rgba(225,188,128,1) 16.99%, rgba(149,127,255,1) 89.32%)"
          p={8}
          maxW="849px"
        >
          <Flex direction="column" gap={4}>
            {/* Header */}
            <Image 
              src="/images/simbi-alert-header.svg" 
              alt="SIMBI Alert" 
              w="403px" 
              h="54px"
            />

            {/* Message */}
            <Text
              fontSize="20px"
              fontWeight="500"
              lineHeight="30px"
              color="#000000"
            >
              STREAK MODE: ACTIVATED ⚡
              <br />
              You&apos;ve smashed {streakCount} plans in a row! I&apos;ve notified the Study gods—they&apos;re impressed.
            </Text>

            {/* Character */}
            <Flex justify="center" mt={4}>
              <Image 
                src="/images/simbi-standing.svg" 
                alt="Simbi Character" 
                w="412px" 
                h="321px"
              />
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}