"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

// const chartData = [
//   { key: "Smoke", weight: 186 },
//   { key: "BMI", weight: 305 },
//   { key: "Job", weight: 237 },
//   { key: "Age", weight: 273 },
//   { key: "General health", weight: 209 },
// ];

type ChartData = {
  key: string;
  weight: number;
};

const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function ConfigurationChart({
  chartData,
}: {
  chartData: ChartData[];
}) {
  return (
    <ChartContainer config={chartConfig} className="ml-0 w-full max-h-[500px]">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="key" />
        <PolarGrid />
        <Radar
          dataKey="weight"
          fill="var(--color-weight)"
          fillOpacity={0.6}
          dot={{
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
