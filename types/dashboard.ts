export type NavItem = "dashboard" | "study-plans" | "schedule" | "milestone" | "rewards" | "chat" | "logout";

export type TimeFilter = "day" | "week" | "month";

export type StudyPlanType = "reading" | "test" | "practice";

export type StudyPlanSubject = "chemistry" | "biology" | "mathematics" | "physics";

// Props types (data passed to components)
export interface DashboardProps {
  user: UserProfile;
  studyStreak: StudyStreakData;
  productivityData: ProductivityData;
  studyPlans: StudyPlan[];
  rewards: RewardsData;
  studyTips: StudyTip[];
  consistencyData: ConsistencyData;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  plan: "Basic Plan" | "Premium Plan" | "Pro Plan";
}

export interface StudyStreakData {
  consecutiveDays: number;
  mood: "Happy" | "Neutral" | "Sad";
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface ProductivityData {
  studyHours: number;
  studySessions: number;
  brainpowerRating: number;
  timeFilter: TimeFilter;
}

export interface StudyPlan {
  id: string;
  subject: string;
  type: "Reading" | "Test" | "Practice";
  startTime: Date;
  endTime: Date;
  backgroundColor: string;
  iconColor: string;
}

export interface RewardsData {
  nftBadgeUrl: string;
  tokensEarned: number;
  milestonesCompleted: number;
  activePlans: number;
}

export interface StudyTip {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

export interface ConsistencyData {
  dailyHours: { day: string; hours: number }[];
  weeklyHours: { week: string; hours: number }[];
  monthlyHours: { month: string; hours: number }[];
}

export interface DashboardStore {
  currentFilter: TimeFilter;
  showStreakAlert: boolean;
  notifications: number;
}