import { api } from "./api";

/**
 * Dashboard API Service
 * Handles all dashboard-related data fetching
 */

// Types for dashboard data
export interface StudySession {
  id: string;
  planId: string;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  completed: boolean;
  rating?: number;
}

export interface StudyPlan {
  id: string;
  name: string;
  subjects: string[];
  startDate: string;
  endDate: string;
  status: string;
  milestones?: Milestone[];
  sessions?: StudySession[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  reward?: string;
}

export interface ProductivityStats {
  totalStudyHours: number;
  totalStudySessions: number;
  averageRating: number;
  timeFrame: "week" | "month" | "year";
}

export interface StudyStreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
}

export interface StudyConsistencyData {
  date: string;
  hours: number;
}

export interface TodayScheduleItem {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number;
  completed: boolean;
}

/**
 * Get all study plans for the current user
 */
export const getStudyPlans = async (): Promise<StudyPlan[]> => {
  try {
    const response = await api.get<{ status: string; studyPlans: StudyPlan[] }>(
      "/api/v1/study-plan/all"
    );
    return response.data.studyPlans || [];
  } catch (error) {
    console.error("Failed to fetch study plans:", error);
    return [];
  }
};

/**
 * Get a specific study plan by ID with full details
 */
export const getStudyPlanById = async (
  planId: string
): Promise<StudyPlan | null> => {
  try {
    const response = await api.get<{ status: string; studyPlan: StudyPlan }>(
      `/api/v1/study-plan/${planId}`
    );
    return response.data.studyPlan;
  } catch (error) {
    console.error(`Failed to fetch study plan ${planId}:`, error);
    return null;
  }
};

/**
 * Get study sessions for a specific study plan
 */
export const getStudySessions = async (
  planId: string
): Promise<StudySession[]> => {
  try {
    const response = await api.get<{
      status: string;
      sessions: StudySession[];
    }>(`/api/v1/study-plan/${planId}/sessions`);
    return response.data.sessions || [];
  } catch (error) {
    console.error(`Failed to fetch sessions for plan ${planId}:`, error);
    return [];
  }
};

/**
 * Get milestones for a specific study plan
 */
export const getMilestones = async (planId: string): Promise<Milestone[]> => {
  try {
    const response = await api.get<{ status: string; milestones: Milestone[] }>(
      `/api/v1/study-plan/${planId}/milestones`
    );
    return response.data.milestones || [];
  } catch (error) {
    console.error(`Failed to fetch milestones for plan ${planId}:`, error);
    return [];
  }
};

/**
 * Calculate productivity statistics from sessions
 * This is a client-side calculation based on fetched data
 */
export const calculateProductivityStats = (
  sessions: StudySession[],
  timeFrame: "week" | "month" | "year"
): ProductivityStats => {
  const now = new Date();
  const startDate = new Date();

  // Set the start date based on timeframe
  switch (timeFrame) {
    case "week":
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  // Filter sessions within the timeframe
  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.startTime);
    return sessionDate >= startDate && sessionDate <= now && session.completed;
  });

  // Calculate statistics
  const totalMinutes = filteredSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const totalStudyHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal
  const totalStudySessions = filteredSessions.length;

  // Calculate average rating
  const sessionsWithRating = filteredSessions.filter(
    (session) => session.rating !== undefined
  );
  const averageRating =
    sessionsWithRating.length > 0
      ? sessionsWithRating.reduce(
          (sum, session) => sum + (session.rating || 0),
          0
        ) / sessionsWithRating.length
      : 0;

  return {
    totalStudyHours,
    totalStudySessions,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    timeFrame,
  };
};

/**
 * Calculate study streak from sessions
 */
export const calculateStudyStreak = (
  sessions: StudySession[]
): StudyStreakData => {
  // Sort sessions by date (most recent first)
  const completedSessions = sessions
    .filter((session) => session.completed)
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );

  if (completedSessions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: "",
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get unique study dates
  const studyDates = Array.from(
    new Set(
      completedSessions.map((session) => {
        const date = new Date(session.startTime);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    )
  )
    .sort((a, b) => b - a)
    .map((time) => new Date(time));

  // Calculate current streak
  let expectedDate = new Date(today);
  for (const studyDate of studyDates) {
    const diffDays = Math.floor(
      (expectedDate.getTime() - studyDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0 || diffDays === 1) {
      currentStreak++;
      expectedDate = new Date(studyDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (let i = 0; i < studyDates.length - 1; i++) {
    const diffDays = Math.floor(
      (studyDates[i].getTime() - studyDates[i + 1].getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    currentStreak,
    longestStreak,
    lastStudyDate: completedSessions[0].startTime,
  };
};

/**
 * Get study consistency data for chart
 */
export const getStudyConsistencyData = (
  sessions: StudySession[],
  timeFrame: "week" | "month" | "year"
): StudyConsistencyData[] => {
  const now = new Date();
  const startDate = new Date();
  const dataPoints: StudyConsistencyData[] = [];

  // Set the start date and number of data points based on timeframe
  let numDays = 7;
  switch (timeFrame) {
    case "week":
      startDate.setDate(now.getDate() - 7);
      numDays = 7;
      break;
    case "month":
      startDate.setMonth(now.getMonth() - 1);
      numDays = 30;
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      numDays = 12; // 12 months
      break;
  }

  // Initialize data points
  if (timeFrame === "year") {
    // Group by month for year view
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      dataPoints.push({
        date: date.toISOString().slice(0, 7), // YYYY-MM format
        hours: 0,
      });
    }
  } else {
    // Group by day for week/month view
    for (let i = numDays - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dataPoints.push({
        date: date.toISOString().slice(0, 10), // YYYY-MM-DD format
        hours: 0,
      });
    }
  }

  // Calculate hours for each data point
  sessions
    .filter((session) => session.completed)
    .forEach((session) => {
      const sessionDate = new Date(session.startTime);
      const dateKey =
        timeFrame === "year"
          ? sessionDate.toISOString().slice(0, 7) // YYYY-MM
          : sessionDate.toISOString().slice(0, 10); // YYYY-MM-DD

      const dataPoint = dataPoints.find((dp) => dp.date === dateKey);
      if (dataPoint) {
        dataPoint.hours += session.duration / 60; // Convert minutes to hours
      }
    });

  // Round hours to 1 decimal place
  dataPoints.forEach((dp) => {
    dp.hours = Math.round(dp.hours * 10) / 10;
  });

  return dataPoints;
};

/**
 * Get today's schedule from all active study plans
 */
export const getTodaySchedule = async (): Promise<TodayScheduleItem[]> => {
  try {
    const studyPlans = await getStudyPlans();
    const activeStudyPlans = studyPlans.filter(
      (plan) => plan.status === "active"
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaySchedule: TodayScheduleItem[] = [];

    // Fetch sessions for each active plan
    for (const plan of activeStudyPlans) {
      const sessions = await getStudySessions(plan.id);

      // Filter sessions for today
      const todaySessions = sessions.filter((session) => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= today && sessionDate < tomorrow;
      });

      // Map to schedule items
      todaySessions.forEach((session) => {
        todaySchedule.push({
          id: session.id,
          subject: session.subject,
          startTime: session.startTime,
          endTime: session.endTime,
          duration: session.duration,
          completed: session.completed,
        });
      });
    }

    // Sort by start time
    todaySchedule.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    return todaySchedule;
  } catch (error) {
    console.error("Failed to fetch today's schedule:", error);
    return [];
  }
};

/**
 * Get active study plans (for ActiveStudyPlan component)
 */
export const getActiveStudyPlans = async (): Promise<StudyPlan[]> => {
  try {
    const studyPlans = await getStudyPlans();
    return studyPlans.filter((plan) => plan.status === "active");
  } catch (error) {
    console.error("Failed to fetch active study plans:", error);
    return [];
  }
};

/**
 * Get all milestones from all active study plans
 */
export const getAllMilestones = async (): Promise<Milestone[]> => {
  try {
    const studyPlans = await getStudyPlans();
    const activeStudyPlans = studyPlans.filter(
      (plan) => plan.status === "active"
    );

    const allMilestones: Milestone[] = [];

    for (const plan of activeStudyPlans) {
      const milestones = await getMilestones(plan.id);
      allMilestones.push(...milestones);
    }

    return allMilestones;
  } catch (error) {
    console.error("Failed to fetch milestones:", error);
    return [];
  }
};

/**
 * Complete a study session
 */
export const completeStudySession = async (
  planId: string,
  sessionId: string,
  timeSpent: number
): Promise<boolean> => {
  try {
    await api.post("/api/v1/study-plan/complete-session", {
      planId,
      sessionId,
      timeSpent: timeSpent.toString(),
    });
    return true;
  } catch (error) {
    console.error("Failed to complete study session:", error);
    return false;
  }
};
