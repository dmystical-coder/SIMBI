import { DashboardProps } from "@/types/dashboard";

export const mockDashboardData: DashboardProps = {
  user: {
    id: "1",
    firstName: "Grace",
    lastName: "Fernandes",
    email: "grace@example.com",
    avatarUrl: "/images/user-avatar.png",
    plan: "Basic Plan",
  },
  studyStreak: {
    consecutiveDays: 5,
    mood: "Happy",
    weeklyGoal: 5,
    weeklyProgress: 5,
  },
  productivityData: {
    studyHours: 40,
    studySessions: 5,
    brainpowerRating: 72,
    timeFilter: "week",
  },
  studyPlans: [
    {
      id: "1",
      subject: "Chemistry",
      type: "Reading",
      startTime: new Date(2025, 3, 23, 13, 0),
      endTime: new Date(2025, 3, 23, 14, 0),
      backgroundColor: "#FFF3FE",
      iconColor: "#FF69B4",
    },
    {
      id: "2",
      subject: "Biology",
      type: "Reading",
      startTime: new Date(2025, 3, 23, 13, 0),
      endTime: new Date(2025, 3, 23, 14, 0),
      backgroundColor: "#FFFBEB",
      iconColor: "#FFA500",
    },
    {
      id: "3",
      subject: "Mathematics",
      type: "Test",
      startTime: new Date(2025, 3, 23, 13, 0),
      endTime: new Date(2025, 3, 23, 14, 0),
      backgroundColor: "#F0FDF5",
      iconColor: "#22C55E",
    },
    {
      id: "4",
      subject: "Physics",
      type: "Reading",
      startTime: new Date(2025, 3, 23, 13, 0),
      endTime: new Date(2025, 3, 23, 14, 0),
      backgroundColor: "#F3F4FA",
      iconColor: "#6B7280",
    },
  ],
  rewards: {
    nftBadgeUrl: "/images/nft-badge.png",
    tokensEarned: 15,
    milestonesCompleted: 12,
    activePlans: 10,
  },
  studyTips: [
    {
      id: "1",
      title: "Study Session",
      message: "I set a timer for your study session. Try not to wander off into TikTok land again.",
      timestamp: new Date(Date.now() - 9 * 60 * 1000),
    },
  ],
  consistencyData: {
    dailyHours: [
      { day: "Sun", hours: 2 },
      { day: "Mon", hours: 4 },
      { day: "Tues", hours: 3 },
      { day: "Wed", hours: 5 },
      { day: "Thurs", hours: 6.5 },
      { day: "Fri", hours: 8 },
      { day: "Sat", hours: 7 },
    ],
    weeklyHours: [],
    monthlyHours: [],
  },
};

export const formatTime = (time: Date): string => {
  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatTimeRange = (start: Date, end: Date): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    return `${diffMins}min ago`;
  }
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours}hr ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};