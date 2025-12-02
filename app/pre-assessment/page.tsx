"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

// Dummy user for testing
const dummyUser = {
  id: "dummy-id-123",
  username: "dummyUser",
  email: "dummy@example.com",
  token: "dummy-token-123",
};

interface Question {
  id: string;
  type: "radio" | "multi";
  question: string;
  options?: string[];
}

const questions: Question[] = [
  {
    id: "q1",
    type: "radio",
    question: "How old are you?",
    options: ["Under 13", "13-17", "18-22", "23-30", "30+"],
  },
  {
    id: "q2",
    type: "radio",
    question: "What level of education are you in?",
    options: [
      "Secondary school(JSS/SSS)",
      "University/Polytechnic",
      "Vocational or Professional training",
      "Just preparing for exams (e.g. JAMB, WAEC)",
      "Other: -----",
    ],
  },
  {
    id: "q3",
    type: "radio",
    question: "Have you used a study assistant app before?",
    options: ["Yes", "No"],
  },
  {
    id: "q4",
    type: "multi",
    question: "How did you hear about SIMBI?",
    options: [
      "Social Media",
      "A friend or classmate",
      "My school or a teacher",
      "Blog or article",
      "Google search",
      "Other:------",
    ],
  },
  {
    id: "q5",
    type: "multi",
    question: "What do you hope to achieve with SIMBI?",
    options: [
      "Just exploring for now",
      "Improve my grades",
      "Build consistent study habits",
      "Stay motivated",
      "Feel less stressed about academics",
      "Other:------",
    ],
  },
];

const QUESTIONS_PER_PAGE = 2;

export default function PreAssessment() {
  const router = useRouter();
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    {}
  );

  const start = page * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const pageQuestions = questions.slice(start, end);
  const isLastPage = end >= questions.length;

  // Dummy data for now
  const token = (user as any)?.token ?? dummyUser.token;
  const userId = user?.id ?? dummyUser.id;

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleMultiSelectChange = (id: string, option: string, checked: boolean) => {
    setAnswers((prev) => {
      const prevArray: string[] = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      return {
        ...prev,
        [id]: checked
          ? [...prevArray, option]
          : prevArray.filter((x) => x !== option),
      };
    });
  };

  const handleNext = () => setPage((p) => p + 1);
  const handlePrev = () => setPage((p) => p - 1);

  const handleSubmit = async () => {
    // Send answers to backend (dummy for now)
    console.log("Submitting answers for user:", userId, answers);

    try {
      await fetch("/api/pre-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, answers }),
      });

      router.push("/congratulations");
    console.log("It's working")
    } catch (error) {
      console.error("Failed to submit questionnaire:", error);
      router.push("/pre-assessment")
    }
  };

  return (
    <Box w="100%">

        <Flex  py={8} justify="space-between" align="center">
                  <Box position="relative" width="280px" height="48px" ml={{base:"32px", lg:"144px"}}>
                    <Image
                      src="/logo.svg"
                      alt="SIMBI"
                      fill
                      style={{ objectFit: "contain", objectPosition: "left" }}
                    />
                  </Box>
                </Flex>

        <Flex as="section" flexDirection="column" align="center" justify="center" minH="100vh" p="1rem">

            {/* Progress Bar */}
            <Box w="30%" mt={{base:2, lg:4}} mb={{base:6, lg:12}} position="relative">
                <div className="w-full h-2.5 bg-[#200B6A] rounded-lg border-2 border-black">
                    <div className="h-full bg-[#957FFF] rounded-full relative"
                    style={{
                    width: `${((page + 1) / Math.ceil(questions.length / QUESTIONS_PER_PAGE)) * 100}%`,
                    }}>

                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full p-1">
                            <Image src="/logo-purple.png" width={28} height={22} alt="simbi icon" />
                        </div>
                    </div>
                </div>
            </Box>

      {/* Question Box */}
            <Flex  as="section" w="70%" flexDirection={{base:"column", md:"row", lg:"row"}} 
            justify="space-between" align="stretch" mb="128px"
            className=" rounded-xl mb-32 shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)]">

                <Flex justify="center" align="center" p={{base:2, lg:16}} w={{base: "100%", lg: "40%"}}
                borderRadius={12}
                borderRightRadius={{base:"0", lg:"12"}} 
                className="bg-[#7A5FFF]">
                    <Text 
                    as="h2" textAlign="center" 
                    fontSize={{base:"18px", md:"24px", lg:"30px"}} 
                    fontWeight={500}
                    color="white">
                        Pre Assessment Test
                    </Text>
                </Flex>

                {/* Right Panel */}
                <Flex flexDirection="column" p={{base:4, lg:12}} flex={1}
                borderRadius={12}
                borderLeftRadius={{base:"0", lg:"12"}}
                fontSize={{base:"16px", md:"18px", lg:"20px"}} fontWeight="medium">

                    {pageQuestions.map((q) => (
                        <Box as="div" key={q.id} mb={20}>
              <p className="font-medium mb-2">{q.question}</p>

              {q.type === "radio" &&
                q.options?.map((opt) => (
                  <label key={opt} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswerChange(q.id, opt)}
                      className="hidden"
                    />
                    <Box as="span"
                    mr={4}
                      className={`w-4 h-4 rounded-full flex items-center justify-center border-2 bg-white ${
                        answers[q.id] === opt ? "ring-1 ring-[#957FFF]" : "ring-1 ring-gray-600 border-gray-600"
                      }`}
                    >
                      {answers[q.id] === opt && (
                        <span className="w-2 h-2 bg-[#957FFF] rounded-full"></span>
                      )}
                    </Box>
                    <Box fontSize={{base:"12px", lg:"16px"}} fontWeight="400" mb={2}
                    >{opt}</Box>
                  </label>
                ))}

              {q.type === "multi" &&
                q.options?.map((opt) => {
                  const checked = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
                  return (
                    <label key={opt} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleMultiSelectChange(q.id, opt, e.target.checked)}
                        className="hidden"
                      />
                    <Box as="span"
                    mr={4}
                        className={`w-4 h-4 rounded-full flex items-center justify-center border-2 bg-white ${
                          checked ? "ring-1 ring-[#957FFF]" : "ring-1 ring-gray-600 border-gray-600"
                        }`}
                      >
                        {checked && <span className="w-2 h-2 bg-[#957FFF] rounded-full"></span>}
                      </Box>
                    <Box fontSize={{base:"12px", lg:"16px"}} fontWeight="400" mb={2}
                    >{opt}</Box>
                    </label>
                  );
                })}
                        </Box>
                    ))}

                <Flex gap={{base:2, lg:12}} mt={{base:2, lg:12}} justify="space-between">
                    <Button
                    onClick={handlePrev}
                    disabled={page === 0}
                    colorScheme="gray"
                    className="flex-1"
                    >
                        Previous
                    </Button>

                    {isLastPage ? (
                    <Button onClick={handleSubmit} bgColor="#7A5FFF" className="flex-1 text-white py-3 rounded-lg">
                        Submit
                    </Button>
                    ) : (
                    <Button onClick={handleNext} bgColor="#7A5FFF" className="flex-1 text-white py-3 rounded-lg">
                        Next
                    </Button>
                    )}
                </Flex>

                </Flex>
            </Flex>
      </Flex>
    </Box>
  );
}