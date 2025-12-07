"use client";

import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import {
  getStudyPlans,
  getStudySessions,
  getStudyConsistencyData,
  type StudySession,
} from "@/lib/dashboard";

type TimeFrame = "week" | "month" | "year";

interface ChartDataPoint {
  day: string;
  hours: number;
  highlight?: boolean;
  label?: string;
}

export default function StudyConsistencyChart() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("week");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxHours, setMaxHours] = useState(10);

  const fetchConsistencyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const studyPlans = await getStudyPlans();
      const allSessions: StudySession[] = [];

      // Fetch sessions from all study plans
      for (const plan of studyPlans) {
        const sessions = await getStudySessions(plan.id);
        allSessions.push(...sessions);
      }

      // Get consistency data
      const consistencyData = getStudyConsistencyData(
        allSessions,
        selectedTimeFrame
      );

      // Transform data for chart
      const transformed: ChartDataPoint[] = consistencyData.map(
        (item) => {
          let dayLabel: string;
          if (selectedTimeFrame === "year") {
            // For year view, show month abbreviation
            const date = new Date(item.date + "-01");
            dayLabel = date.toLocaleDateString("en-US", { month: "short" });
          } else {
            // For week/month view, show day abbreviation
            const date = new Date(item.date);
            dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
          }

          return {
            day: dayLabel,
            hours: item.hours,
          };
        }
      );

      // Find max hours for chart scaling
      const max = Math.max(...transformed.map((d) => d.hours), 10);
      setMaxHours(Math.ceil(max / 2) * 2); // Round up to nearest even number

      // Highlight the highest point
      if (transformed.length > 0) {
        const maxIndex = transformed.findIndex((d) => d.hours === max);
        if (maxIndex !== -1) {
          transformed[maxIndex].highlight = true;
          const hours = Math.floor(transformed[maxIndex].hours);
          const minutes = Math.round(
            (transformed[maxIndex].hours - hours) * 60
          );
          transformed[maxIndex].label = `${hours}hr ${minutes}m`;
        }
      }

      setChartData(transformed);
    } catch (error) {
      console.error("Failed to fetch consistency data:", error);
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTimeFrame]);

  useEffect(() => {
    fetchConsistencyData();
  }, [fetchConsistencyData]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="10px"
        flexWrap="wrap"
        gap="10px"
      >
        <Text fontSize="16px" fontWeight={600} color="#1e1e2f">
          Study Consistency
        </Text>
        <Box display="flex" gap="7.5px">
          {(["week", "month", "year"] as TimeFrame[]).map((timeFrame) => (
            <Text
              key={timeFrame}
              fontSize="10px"
              fontWeight={500}
              color={selectedTimeFrame === timeFrame ? "#7a5fff" : "#c9c0d4"}
              cursor="pointer"
              onClick={() => setSelectedTimeFrame(timeFrame)}
              _hover={{ opacity: 0.8 }}
            >
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </Text>
          ))}
        </Box>
      </Box>

      <Box
        border="0.5px solid rgba(0, 0, 0, 0.10)"
        borderRadius="3px"
        p="10px"
        bg="#ffffff"
      >
        <Text
          fontSize="10.2px"
          fontWeight={400}
          color="rgba(0, 0, 0, 0.50)"
          lineHeight="10.2px"
          mb="5px"
        >
          Hours
        </Text>

        <Box h="250px" w="100%" position="relative">
          {isLoading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="100%"
            >
              <Text fontSize="14px" color="#a5a0be">
                Loading chart...
              </Text>
            </Box>
          ) : chartData.length === 0 ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="100%"
            >
              <Text fontSize="14px" color="#a5a0be" textAlign="center">
                No study data available
              </Text>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={250} minWidth={0}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7a5fff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7a5fff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  stroke="#b1b1b1"
                  strokeWidth={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#2e2e30" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#2e2e30" }}
                  domain={[0, maxHours]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                    fontSize: "10px",
                  }}
                  formatter={(value: number) => [
                    `${value.toFixed(1)} hrs`,
                    "Study Time",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#7a5fff"
                  strokeWidth={2}
                  fill="url(#colorHours)"
                />
                {chartData.find((d) => d.highlight) && (
                  <ReferenceDot
                    x={chartData.find((d) => d.highlight)?.day}
                    y={chartData.find((d) => d.highlight)?.hours}
                    r={8}
                    fill="#344bfd"
                    stroke="#ffffff"
                    strokeWidth={3}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          )}

          {/* Custom label for highlighted point */}
          {!isLoading && chartData.find((d) => d.highlight) && (
            <Box
              position="absolute"
              top="35%"
              left="50%"
              transform="translate(-50%, -100%)"
              bg="transparent"
              pointerEvents="none"
            >
              <Text
                fontSize="10px"
                fontWeight={700}
                color="#344bfd"
                textAlign="center"
              >
                {chartData.find((d) => d.highlight)?.label}
              </Text>
            </Box>
          )}
        </Box>

        <Text
          fontSize="10.2px"
          fontWeight={400}
          color="rgba(0, 0, 0, 0.50)"
          lineHeight="10.2px"
          mt="5px"
          textAlign="center"
        >
          Days
        </Text>
      </Box>
    </Box>
  );
}
