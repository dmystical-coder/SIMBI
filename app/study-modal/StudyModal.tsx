"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  CloseButton,
  Dialog,
  Portal,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";




type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

const today = new Date().toISOString().split("T")[0];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${month}`;
};

interface StudyModalProps {
  onPlanCreated?: () => void;
}

export default function StudyModal({ onPlanCreated }: StudyModalProps) {
  // ---------- STATE ----------
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysAvailable, setDaysAvailable] = useState<Day[]>([]);
  const [studyDuration, setStudyDuration] = useState<number | "">("");
  const [dailyStudyTime, setDailyStudyTime] = useState("");
  const breakReference = studyDuration ? Math.round(studyDuration * 60 * 0.25) : 0;

  const router = useRouter()

  // ---------- FORM SUBMIT ----------
  const handleSubmit = () => {
    const formData = {
      subject,
      topics,
      startDate,
      endDate,
      daysAvailable,
      studyDuration,
      breakReference,
      dailyStudyTime,
    };
    console.log("Form Data (to backend):", formData);
  };

  return (
    <Box w="100%">
      <Flex>
        <Dialog.Root size="lg">
          <Dialog.Trigger asChild>
            <Button variant="outline" w={{base:"56%", lg:"30%"}} bgColor="#7A5FFF" color="white" mx="auto">Generate your Study plan</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header display="flex" flexDirection="column" gap={1}>
                  <Flex align="center" gap={2}>
                    <Box
                      w="42px"
                      h="42px"
                      p={2}
                      bgColor="#FAFBFB"
                      borderRadius="full"
                      border="1px dashed #919EAB"
                    >
                      <Image
                        src="/study-plan.svg"
                        w="24px"
                        h="24px"
                        objectFit="contain"
                      />
                    </Box>
                    <Box>
                      <Dialog.Title color="#7A5FFF">
                        Generate a Study Plan
                      </Dialog.Title>
                      <Dialog.Description>
                        Let's generate your study plan
                      </Dialog.Description>
                    </Box>
                  </Flex>
                </Dialog.Header>

                <Dialog.Body borderTop="1px solid #919EAB" py={8}>
                  <Button
                    bgColor="#E4DFFF"
                    color="#7A5FFF"
                    w="100%"
                    border="5px solid #F7F8F8"
                    borderRadius="xl"
                    mb={4}
                  >
                    Plan Overview
                  </Button>

                  <Flex wrap="wrap" gap={4}>
                    {/* Name of Subject */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Name of Subject
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>

                    {/* Topics of Focus */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Topics of Focus
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>

                    {/* Start - End Date */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Start Date – End Date
                      </Field.Label>
                      <Flex gap={2}>
                        <Input
                          type="date"
                          min={today}
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            if (endDate && endDate < e.target.value) setEndDate("");
                          }}
                          bg="transparent"
                          border="none"
                        />
                        <Input
                          type="date"
                          min={startDate || today}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          bg="transparent"
                          border="none"
                        />
                      </Flex>
                      {startDate && endDate && (
                        <Box fontSize="12px" color="#6B7280" mt={1}>
                          {formatDate(startDate)} – {formatDate(endDate)}
                        </Box>
                      )}
                    </Field.Root>

                    {/* Days Available */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Days Available
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        placeholder="Comma separated, e.g. Mon/Tue"
                        value={daysAvailable.join("/")}
                        onChange={(e) =>
                          setDaysAvailable(
                            e.target.value
                              .split("/")
                              .map((v) => v.trim() as Day)
                          )
                        }
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>

                    {/* Daily Study Duration */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Daily Study Duration (hrs)
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        type="number"
                        value={studyDuration}
                        onChange={(e) =>
                          setStudyDuration(
                            e.target.value === "" ? "" : parseFloat(e.target.value)
                          )
                        }
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>

                    {/* Break Reference */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Break Reference (25% of study time)
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        value={`${breakReference} min`}
                        readOnly
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>

                    {/* Daily Study Time */}
                    <Field.Root
                      border="1px solid #C9C0D4"
                      borderRadius="xl"
                      w={{ base: "100%", md: "48%" }}
                      h={58}
                      p={1}
                      _focusWithin={{
                        boxShadow: "0px 0px 12px rgba(149,127,255,0.53)",
                      }}
                    >
                      <Field.Label
                        fontSize="12px"
                        color="gray.400"
                        fontWeight="lighter"
                      >
                        Daily Study Time
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="transparent"
                        p={2}
                        value={dailyStudyTime}
                        onChange={(e) => setDailyStudyTime(e.target.value)}
                        _focus={{
                          outline: "none",
                          borderColor: "transparent",
                        }}
                      />
                    </Field.Root>
                  </Flex>
                </Dialog.Body>

                <Dialog.Footer px={{ base: 1, lg: 4 }} mx={{ base: "auto", lg: 0 }}>
                  <Flex
                    justify="space-between"
                    w="100%"
                    gap={{ base: 4, lg: 8 }}
                    flexDirection={{ base: "column", lg: "row" }}
                  >
                    <Flex gap={0.5} align="center" order={{ base: 2, lg: 1 }}>
                      <Image
                        src="/chat-simbi.svg"
                        w="120px"
                        h="44px"
                        objectFit="contain"
                      />
                      <Image src="/chat.svg" w="60px" h="48px" objectFit="contain" />
                    </Flex>

                    <Flex gap={{ base: 2, lg: 4 }} order={{ base: 1, lg: 2 }}>
                      <Button
                        variant="outline"
                        border="1px solid #7A5FFF"
                        color="#7A5FFF"
                        borderRadius={12}
                        onClick={() => {
                          // Reset all fields
                          setSubject("");
                          setTopics("");
                          setStartDate("");
                          setEndDate("");
                          setDaysAvailable([]);
                          setStudyDuration("");
                          setDailyStudyTime("");
                        }}
                      >
                        Reset Data
                      </Button>

                      <Button
                        bgColor="#7A5FFF"
                        borderRadius={12}
                        onClick={() => {
                          handleSubmit();
                          if (onPlanCreated) {
                            onPlanCreated();
                          }
                        }}
                      >
                        Generate Study Plan
                      </Button>
                    </Flex>
                  </Flex>
                </Dialog.Footer>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>
    </Box>
  );
}
