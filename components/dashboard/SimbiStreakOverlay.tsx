"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import NextImage from "next/image";

interface SimbiStreakOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  consecutiveDays: number;
}

export default function SimbiStreakOverlay({
  isOpen,
  onClose,
  consecutiveDays,
}: SimbiStreakOverlayProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="xl"
    >
      <Dialog.Backdrop bg="rgba(0, 0, 0, 0.5)" />
      <Dialog.Positioner>
        <Dialog.Content
          maxW={{ base: "90%", sm: "350px", md: "849px" }}
          borderRadius={{ base: "25px", md: "50px" }}
          p="0"
          bg="linear-gradient(22.19deg, rgba(225,188,128,1) 16.99%, rgba(149,127,255,1) 89.32%)"
          position="relative"
          overflow="hidden"
          mx="auto"
        >
          {/* Custom Close Button */}
          <Box
            position="absolute"
            top={{ base: "16px", md: "20px" }}
            right={{ base: "16px", md: "20px" }}
            zIndex={2}
            w={{ base: "32px", md: "32px" }}
            h={{ base: "32px", md: "32px" }}
            bg="rgba(0, 0, 0, 0.3)"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: "rgba(0, 0, 0, 0.5)" }}
            cursor="pointer"
            onClick={onClose}
          >
            <Image
              src="/icons/close.svg"
              alt="Close"
              w={{ base: "16px", md: "18px" }}
              h={{ base: "16px", md: "18px" }}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Box>

          <Box
            p={{ base: "50px 20px 30px 20px", md: "40px 60px" }}
            position="relative"
          >
            {/* SIMBI Alert Header */}
            <Box
              mb={{ base: "8px", md: "13px" }}
              display="flex"
              alignItems="center"
              gap="12px"
            >
              <Box
                w={{ base: "51px", md: "50px" }}
                h={{ base: "40px", md: "54px" }}
                position="relative"
              >
                <NextImage
                  src="/images/simbi.svg"
                  alt="Simbi"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Text
                fontSize={{ base: "36px", md: "32px" }}
                fontWeight={700}
                color="#070803"
                fontFamily="Poppins, sans-serif"
                lineHeight="1.5"
              >
                SIMBI Alert!
              </Text>
            </Box>

            {/* Streak Message */}
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              fontWeight={500}
              color="#000000"
              lineHeight={{ base: "24px", md: "30px" }}
              mb={{ base: "20px", md: "40px" }}
              maxW={{ base: "335px", md: "776px" }}
              fontFamily="Poppins, sans-serif"
            >
              <Text as="span" fontWeight={600}>
                STREAK MODE: ACTIVATED ⚡
              </Text>
              <br />
              You've smashed {consecutiveDays} plans in a row! I've notified the
              Study gods—they're impressed.
            </Text>

            {/* Simbi Character */}
            <Box
              position="relative"
              w={{ base: "240px", sm: "280px", md: "412px" }}
              h={{ base: "205px", sm: "240px", md: "321px" }}
              mx="auto"
              mt={{ base: "20px", md: "0" }}
            >
              <NextImage
                src="/images/simbi-character-standing.svg"
                alt="Simbi character"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
