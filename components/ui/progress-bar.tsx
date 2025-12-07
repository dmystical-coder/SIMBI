import React from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Map current step to milestone percentage
  // For 7 steps: 0->Default, 1->20, 2->30, 3->50, 4->60, 5->80, 6->90, 7->100
  const getMilestoneNumber = () => {
    const progress = currentStep + 1; // Convert 0-based to 1-based
    
    if (progress <= 0) return "Default";
    if (progress === 1) return "20";
    if (progress === 2) return "30";
    if (progress === 3) return "50";
    if (progress === 4) return "60";
    if (progress === 5) return "80";
    if (progress === 6) return "90";
    if (progress >= totalSteps) return "100";
    
    // Fallback: calculate percentage
    const percentage = Math.min(100, Math.round(((progress) / totalSteps) * 100));
    const availablePercentages = [20, 30, 40, 50, 60, 70, 80, 90, 100];
    const closest = availablePercentages.reduce((prev, curr) => 
      Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev
    );
    return closest.toString();
  };

  const milestone = getMilestoneNumber();
  
  return (
    <Box position="relative" w="100%" display="flex" justifyContent="center">
      <Image
        src={`/milestone-${milestone}.svg`}
        alt={`Progress ${milestone}${milestone !== "Default" ? "%" : ""}`}
        width={310}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
      />
    </Box>
  );
}