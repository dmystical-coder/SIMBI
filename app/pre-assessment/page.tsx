"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  Stack,
  Container,
} from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react";
import { submitPreAssessment, skipPreAssessment } from "@/lib/auth";
import { toaster } from "@/components/ui/toaster";
import { ProgressBar } from "@/components/ui/progress-bar";

interface PreAssessmentData {
  age?: string;
  education?: string;
  educationOther?: string;
  usedStudyApp?: string;
  appsUsed?: string;
  hearAbout?: string[];
  hearAboutOther?: string;
  goals?: string[];
  goalsOther?: string;
  studyDuration?: string;
  biggestStruggle?: string;
  procrastinationFrequency?: string;
  learningPreference?: string;
  notesTaking?: string;
  focusedTime?: string;
  educationLevel?: string;
  accountability?: string;
  missedGoalReaction?: string;
  learningGoals?: string;
  checkInFrequency?: string;
}

const steps = [
  {
    id: 1,
    title: "Pre Assessment Test",
    mobileTitle: "Pre Assessment Test",
    questions: [
      {
        id: "age",
        question: "How old are you?",
        type: "radio" as const,
        options: ["Under 13", "13 -17", "18 -22", "23 -30", "30+"],
      },
      {
        id: "education",
        question: "What level of education are you currently in?",
        type: "radio" as const,
        options: [
          "Secondary school (JSS/SSS)",
          "University/Polythecnic",
          "Vocational or Proffesional training",
          "Just preparing for exams (e.g. JAMB, WAEC)",
          "Other: _______",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Pre Assessment Test",
    mobileTitle: "Pre Assessment Test",
    questions: [
      {
        id: "usedStudyApp",
        question: "Have you used a study assistant app before?",
        type: "radio" as const,
        options: ["Yes", "No"],
      },
      {
        id: "appsUsed",
        question: "If yes, what app(s) did you use? (Optional):",
        type: "text" as const,
        placeholder: "____________",
      },
      {
        id: "hearAbout",
        question: "How did you hear about SIMBI?",
        subtitle: "(Select one or more)",
        type: "checkbox" as const,
        options: [
          "Social Media",
          "A friend or classmate",
          "My school or a teacher",
          "Blog or article",
          "Google search",
          "Other: _______",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Pre Assessment Test",
    mobileTitle: "Pre Assessment Test",
    questions: [
      {
        id: "goals",
        question: "What do you hope to achieve with SIMBI?",
        subtitle: "(You can select more than one)",
        type: "checkbox" as const,
        options: [
          "Just exploring for now",
          "Improve my grades",
          "Track my progress",
          "Build consistent study habits",
          "Stay motivated",
          "Feel less stressed about academics",
          "Other: _______",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Learning Preferences",
    mobileTitle: "Learning Preferences",
    questions: [
      {
        id: "learningPreference",
        question: "What's your preferred way of studying?",
        type: "radio" as const,
        options: [
          "Watching videos",
          "Reading articles",
          "Practicing with quizzes",
          "Group discussions",
          "One-on-one explanations",
        ],
      },
      {
        id: "notesTaking",
        question: "How do you usually take notes?",
        type: "radio" as const,
        options: [
          "Handwritten notes",
          "Typed notes",
          "I don't take notes",
          "I use voice memos",
        ],
      },
      {
        id: "focusedTime",
        question: "What time do you feel most focused?",
        type: "radio" as const,
        options: ["Morning", "Afternoon", "Evening", "Late night"],
      },
    ],
  },
  {
    id: 5,
    title: "Study Habits",
    mobileTitle: "Study Habits",
    questions: [
      {
        id: "studyDuration",
        question: "How long can you study before losing focus?",
        type: "radio" as const,
        options: [
          "Less than 20 minutes",
          "20-40 minutes",
          "1hour",
          "Over one hour",
        ],
      },
      {
        id: "biggestStruggle",
        question: "What is your biggest struggle when studying ?",
        type: "radio" as const,
        options: ["Lack of motivation", "Procrastination", "Time management"],
      },
      {
        id: "procrastinationFrequency",
        question: "How often do you procrastinate on studying?",
        type: "radio" as const,
        options: ["Rarely", "Sometimes", "Often", "All the time"],
      },
    ],
  },
  {
    id: 6,
    title: "Personality & Tone",
    mobileTitle: "Personality & Tone",
    questions: [
      {
        id: "educationLevel",
        question: "What is your current level of education?",
        type: "radio" as const,
        options: ["University", "Secondary", "Primary", "Professional level"],
      },
      {
        id: "accountability",
        question:
          "Would you like Simbi to hold you accountable? (e.g, with reminders or check-ins)?",
        type: "radio" as const,
        options: ["Yes", "No"],
      },
      {
        id: "missedGoalReaction",
        question: "How should SIMBI react if you miss a study goal?",
        type: "radio" as const,
        options: [
          "Send a gentle reminder",
          "Motivate with a funny message",
          "Be firm and direct",
          "Say nothing-I'll catch up on my own",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Goal Setting",
    mobileTitle: "Goal Setting",
    questions: [
      {
        id: "learningGoals",
        question: "What are your current learning goals?",
        type: "text" as const,
        placeholder: "Enter your current learning goals",
      },
      {
        id: "checkInFrequency",
        question:
          "How often would you like SIMBI to check in on your progress?",
        type: "radio" as const,
        options: [
          "Daily",
          "Weekly",
          "After each study session",
          "Only when i ask",
        ],
      },
    ],
  },
];

export default function PreAssessment() {
  const router = useRouter();
  const { refreshAuth, refreshFromServer } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<PreAssessmentData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (
    questionId: string,
    option: string,
    checked: boolean
  ) => {
    setAnswers((prev) => {
      const currentValues =
        (prev[questionId as keyof PreAssessmentData] as string[]) || [];
      return {
        ...prev,
        [questionId]: checked
          ? [...currentValues, option]
          : currentValues.filter((v) => v !== option),
      };
    });
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formattedAnswers: Record<string, string> = {};

      steps.forEach((step) => {
        step.questions.forEach((q) => {
          const answer = answers[q.id as keyof PreAssessmentData];
          if (answer) {
            formattedAnswers[q.question] = Array.isArray(answer)
              ? answer.join(", ")
              : String(answer);
          }
        });
      });

      await submitPreAssessment(formattedAnswers);

      // Refresh user data from server to get updated hasCompletedPreAssessment flag
      await refreshFromServer();

      toaster.create({
        title: "Assessment Submitted!",
        description: "Thank you for completing the pre-assessment.",
        type: "success",
      });

      router.push("/congratulations");
    } catch (error) {
      console.error("Failed to submit pre-assessment:", error);

      toaster.create({
        title: "Submission Failed",
        description: "Unable to submit assessment. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    skipPreAssessment();
    refreshAuth();

    toaster.create({
      title: "Assessment Skipped",
      description: "You can complete it later from your dashboard.",
      type: "info",
    });

          router.push("/");
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #E9E8FF 0%, #F3F2FF 50%, #FFF4E6 100%)"
      position="relative"
      pb="40px"
    >
      {/* Logo and Progress Bar - Desktop */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px="40px"
        pt="30px"
        pb="30px"
      >
        <Image
          src="/simbi-logo.svg"
          alt="SIMBI"
          width={143}
          height={54}
          priority
        />
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      </Flex>

      {/* Logo and Progress Bar - Mobile (Stacked & Centered) */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        direction="column"
        align="center"
        gap="16px"
        pt="20px"
        pb="20px"
        px="20px"
      >
        <Image
          src="/simbi-logo.svg"
          alt="SIMBI"
          width={120}
          height={46}
          priority
        />
        <Box w="100%" maxW="335px">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        </Box>
      </Flex>

      {/* Main Content - Desktop */}
      <Container maxW="995px" display={{ base: "none", lg: "block" }} px="20px">
        <Flex
          bg="white"
          borderRadius="32px"
          overflow="hidden"
          boxShadow="0px 19px 86.9px rgba(149, 127, 255, 0.53)"
          h="650px"
        >
          {/* Left Panel - Purple Gradient */}
          <Flex
            w="40%"
            bg="linear-gradient(180deg, #7A5FFF 0%, #6366F1 100%)"
            align="center"
            justify="center"
            p="40px"
          >
            <Text
              fontSize="32px"
              fontWeight="500"
              color="white"
              textAlign="center"
              lineHeight="40px"
              letterSpacing="-0.96px"
            >
              {currentStepData.title}
            </Text>
          </Flex>

          {/* Right Panel - Content */}
          <Flex flex="1" direction="column" bg="white" h="100%">
            <Box
              flex="1"
              overflowY="auto"
              p="40px"
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#7A5FFF",
                  borderRadius: "4px",
                },
              }}
            >
              <Stack gap="24px">
                {currentStepData.questions.map((question) => (
                  <Box key={question.id}>
                    <Text
                      fontSize="20px"
                      fontWeight="500"
                      color="#1e1e2f"
                      mb={question.subtitle ? "8px" : "24px"}
                      letterSpacing="-0.6px"
                      lineHeight={question.subtitle ? "32px" : "normal"}
                    >
                      {question.question}
                    </Text>

                    {question.subtitle && (
                      <Text
                        fontSize="20px"
                        fontWeight="500"
                        color="#6b7280"
                        mb="24px"
                        letterSpacing="-0.6px"
                      >
                        {question.subtitle}
                      </Text>
                    )}

                    {question.type === "radio" && (
                      <>
                        <RadioGroup.Root
                          value={
                            answers[
                              question.id as keyof PreAssessmentData
                            ] as string
                          }
                          onValueChange={(e) => {
                            if (e.value) {
                              handleRadioChange(question.id, e.value);
                            }
                          }}
                        >
                          <Stack gap="10px">
                            {question.options?.map((option) => {
                              const isSelected =
                                answers[
                                  question.id as keyof PreAssessmentData
                                ] === option;
                              return (
                                <Box key={option}>
                                  <Flex
                                    align="center"
                                    gap="8px"
                                    cursor="pointer"
                                    onClick={() =>
                                      handleRadioChange(question.id, option)
                                    }
                                  >
                                    <Box
                                      w="16px"
                                      h="16px"
                                      borderRadius="50%"
                                      border="1px solid #6b7280"
                                      bg="white"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      flexShrink="0"
                                    >
                                      {isSelected && (
                                        <Box
                                          w="10px"
                                          h="10px"
                                          borderRadius="50%"
                                          bg="#7A5FFF"
                                        />
                                      )}
                                    </Box>
                                    <Text
                                      fontSize="16px"
                                      fontWeight="400"
                                      color="#1e1e2f"
                                      lineHeight="20px"
                                    >
                                      {option}
                                    </Text>
                                  </Flex>

                                  {/* Show text input if "Other" option is selected */}
                                  {option.startsWith("Other:") &&
                                    isSelected && (
                                      <Input
                                        value={
                                          (answers[
                                            `${question.id}Other` as keyof PreAssessmentData
                                          ] as string) || ""
                                        }
                                        onChange={(e) =>
                                          handleTextChange(
                                            `${question.id}Other`,
                                            e.target.value
                                          )
                                        }
                                        placeholder="Please specify"
                                        fontSize="14px"
                                        color="#1e1e2f"
                                        borderColor="#e5e7eb"
                                        _focus={{ borderColor: "#7A5FFF" }}
                                        mt="8px"
                                        ml="24px"
                                        maxW="400px"
                                      />
                                    )}
                                </Box>
                              );
                            })}
                          </Stack>
                        </RadioGroup.Root>
                      </>
                    )}

                    {question.type === "checkbox" && (
                      <Stack gap="10px">
                        {question.options?.map((option) => {
                          const isChecked = (
                            (answers[
                              question.id as keyof PreAssessmentData
                            ] as string[]) || []
                          ).includes(option);
                          return (
                            <Box key={option}>
                              <Flex
                                align="center"
                                gap="8px"
                                cursor="pointer"
                                onClick={() =>
                                  handleCheckboxChange(
                                    question.id,
                                    option,
                                    !isChecked
                                  )
                                }
                              >
                                <Box
                                  w="16px"
                                  h="16px"
                                  borderRadius="3px"
                                  border="1px solid #6b7280"
                                  bg="white"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {isChecked && (
                                    <Box
                                      w="10px"
                                      h="10px"
                                      borderRadius="2px"
                                      bg="#7A5FFF"
                                    />
                                  )}
                                </Box>
                                <Text
                                  fontSize="16px"
                                  fontWeight="400"
                                  color="#1e1e2f"
                                  lineHeight="20px"
                                >
                                  {option}
                                </Text>
                              </Flex>

                              {/* Show text input if "Other" option is checked */}
                              {option.startsWith("Other:") && isChecked && (
                                <Input
                                  value={
                                    (answers[
                                      `${question.id}Other` as keyof PreAssessmentData
                                    ] as string) || ""
                                  }
                                  onChange={(e) =>
                                    handleTextChange(
                                      `${question.id}Other`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Please specify"
                                  fontSize="14px"
                                  color="#1e1e2f"
                                  borderColor="#e5e7eb"
                                  _focus={{ borderColor: "#7A5FFF" }}
                                  mt="8px"
                                  ml="24px"
                                  maxW="400px"
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Stack>
                    )}

                    {question.type === "text" && (
                      <Input
                        value={
                          (answers[
                            question.id as keyof PreAssessmentData
                          ] as string) || ""
                        }
                        onChange={(e) =>
                          handleTextChange(question.id, e.target.value)
                        }
                        placeholder={question.placeholder}
                        fontSize="12px"
                        color="#6b7280"
                        borderColor="#e5e7eb"
                        _focus={{ borderColor: "#7A5FFF" }}
                      />
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Navigation Buttons - Fixed at bottom */}
            <Box p="40px" pt="20px" borderTop="1px solid #f3f4f6">
              <Flex gap="16px" justify="center" align="center">
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  color="#4976f4"
                  fontSize="14px"
                  fontWeight="400"
                  textDecoration="underline"
                  _hover={{ bg: "transparent" }}
                  disabled={isSubmitting}
                  px="20px"
                >
                  Skip for now
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    bg="#7A5FFF"
                    color="white"
                    fontSize="16px"
                    fontWeight="500"
                    letterSpacing="-0.48px"
                    h="48px"
                    px="40px"
                    borderRadius="12px"
                    _hover={{ bg: "#6B4FEF" }}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    bg="#7A5FFF"
                    color="white"
                    fontSize="16px"
                    fontWeight="500"
                    letterSpacing="-0.48px"
                    h="48px"
                    px="40px"
                    borderRadius="12px"
                    _hover={{ bg: "#6B4FEF" }}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>

      {/* Main Content - Mobile */}
      <Container maxW="375px" display={{ base: "block", lg: "none" }} px="20px">
        <Box pb="20px">
          {/* Purple Header */}
          <Box
            bg="linear-gradient(180deg, #7A5FFF 0%, #6366F1 100%)"
            borderRadius="20px"
            py="20px"
            px="20px"
            mb="10px"
          >
            <Text
              fontSize="24px"
              fontWeight="500"
              color="white"
              textAlign="center"
              letterSpacing="-0.72px"
            >
              {currentStepData.mobileTitle}
            </Text>
          </Box>

          {/* Questions */}
          <Stack gap="24px" mb="20px">
            {currentStepData.questions.map((question) => (
              <Box key={question.id}>
                <Text
                  fontSize="16px"
                  fontWeight="500"
                  color="#1e1e2f"
                  mb={question.subtitle ? "8px" : "19.2px"}
                  letterSpacing="-0.48px"
                  lineHeight={question.subtitle ? "25.6px" : "normal"}
                >
                  {question.question}
                </Text>

                {question.subtitle && (
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    color="#6b7280"
                    mb="19.2px"
                    letterSpacing="-0.48px"
                  >
                    {question.subtitle}
                  </Text>
                )}

                {question.type === "radio" && (
                  <>
                    <RadioGroup.Root
                      value={
                        answers[
                          question.id as keyof PreAssessmentData
                        ] as string
                      }
                      onValueChange={(e) => {
                        if (e.value) {
                          handleRadioChange(question.id, e.value);
                        }
                      }}
                    >
                      <Stack gap="8px">
                        {question.options?.map((option) => {
                          const isSelected =
                            answers[question.id as keyof PreAssessmentData] ===
                            option;
                          return (
                            <Box key={option}>
                              <Flex
                                align="center"
                                gap="6.4px"
                                cursor="pointer"
                                onClick={() =>
                                  handleRadioChange(question.id, option)
                                }
                              >
                                <Box
                                  w="13px"
                                  h="13px"
                                  borderRadius="50%"
                                  border="0.8px solid #6b7280"
                                  bg="white"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  flexShrink="0"
                                >
                                  {isSelected && (
                                    <Box
                                      w="8px"
                                      h="8px"
                                      borderRadius="50%"
                                      bg="#7A5FFF"
                                    />
                                  )}
                                </Box>
                                <Text
                                  fontSize="14px"
                                  fontWeight="400"
                                  color="#1e1e2f"
                                  lineHeight="16px"
                                >
                                  {option}
                                </Text>
                              </Flex>

                              {/* Show text input if "Other" option is selected */}
                              {option.startsWith("Other:") && isSelected && (
                                <Input
                                  value={
                                    (answers[
                                      `${question.id}Other` as keyof PreAssessmentData
                                    ] as string) || ""
                                  }
                                  onChange={(e) =>
                                    handleTextChange(
                                      `${question.id}Other`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Please specify"
                                  fontSize="12px"
                                  color="#1e1e2f"
                                  borderColor="#e5e7eb"
                                  _focus={{ borderColor: "#7A5FFF" }}
                                  mt="6px"
                                  ml="20px"
                                  size="sm"
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Stack>
                    </RadioGroup.Root>
                  </>
                )}

                {question.type === "checkbox" && (
                  <Stack gap="8px">
                    {question.options?.map((option) => {
                      const isChecked = (
                        (answers[
                          question.id as keyof PreAssessmentData
                        ] as string[]) || []
                      ).includes(option);
                      return (
                        <Box key={option}>
                          <Flex
                            align="center"
                            gap="6.4px"
                            cursor="pointer"
                            onClick={() =>
                              handleCheckboxChange(
                                question.id,
                                option,
                                !isChecked
                              )
                            }
                          >
                            <Box
                              w="13px"
                              h="13px"
                              borderRadius="2px"
                              border="0.8px solid #6b7280"
                              bg="white"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {isChecked && (
                                <Box
                                  w="8px"
                                  h="8px"
                                  borderRadius="1.5px"
                                  bg="#7A5FFF"
                                />
                              )}
                            </Box>
                            <Text
                              fontSize="14px"
                              fontWeight="400"
                              color="#1e1e2f"
                              lineHeight="16px"
                            >
                              {option}
                            </Text>
                          </Flex>

                          {/* Show text input if "Other" option is checked */}
                          {option.startsWith("Other:") && isChecked && (
                            <Input
                              value={
                                (answers[
                                  `${question.id}Other` as keyof PreAssessmentData
                                ] as string) || ""
                              }
                              onChange={(e) =>
                                handleTextChange(
                                  `${question.id}Other`,
                                  e.target.value
                                )
                              }
                              placeholder="Please specify"
                              fontSize="12px"
                              color="#1e1e2f"
                              borderColor="#e5e7eb"
                              _focus={{ borderColor: "#7A5FFF" }}
                              mt="6px"
                              ml="20px"
                              size="sm"
                            />
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                )}

                {question.type === "text" && (
                  <Input
                    value={
                      (answers[
                        question.id as keyof PreAssessmentData
                      ] as string) || ""
                    }
                    onChange={(e) =>
                      handleTextChange(question.id, e.target.value)
                    }
                    placeholder={question.placeholder}
                    fontSize="12px"
                    color="#6b7280"
                    borderColor="#e5e7eb"
                    _focus={{ borderColor: "#7A5FFF" }}
                  />
                )}
              </Box>
            ))}
          </Stack>

          {/* Navigation Buttons */}
          <Flex direction="column" gap="16px">
            <Flex justify="space-between" align="center">
              <Button
                onClick={handleSkip}
                variant="ghost"
                color="#4976f4"
                fontSize="16px"
                fontWeight="500"
                textDecoration="underline"
                letterSpacing="-0.48px"
                _hover={{ bg: "transparent" }}
                disabled={isSubmitting}
                p="0"
              >
                Skip
              </Button>

              {isLastStep ? (
                <Button
                  onClick={handleSubmit}
                  bg="#7A5FFF"
                  color="white"
                  fontSize="16px"
                  fontWeight="500"
                  letterSpacing="-0.48px"
                  px="32px"
                  h="48px"
                  borderRadius="8px"
                  _hover={{ bg: "#6B4FEF" }}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  bg="#7A5FFF"
                  color="white"
                  fontSize="16px"
                  fontWeight="500"
                  letterSpacing="-0.48px"
                  px="32px"
                  h="48px"
                  borderRadius="8px"
                  _hover={{ bg: "#6B4FEF" }}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
