import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const WaterAreaCharts = ({ waterIntake }) => {
  const formattedData = waterIntake.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    water: entry.water,
  }));

  const intake = waterIntake.map((m) => m.water);
  return (
    <AreaChart
      width={500}
      height={150}
      data={formattedData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorWater" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00b4d2" />
          <stop offset="50%" stopColor="#ade8f4" />
          <stop offset="100%" stopColor="#00b4d8" stopOpacity={0.9} />
        </linearGradient>
      </defs>

      <XAxis dataKey="date" />
      <YAxis dataKey="water" />
      <Tooltip />

      <Area
        type="monotone"
        dataKey="water"
        dot={false}
        stroke="#61a5c2"
        fill="url(#colorWater)"
        strokeWidth={0.5}
      />
    </AreaChart>
  );
};

export default WaterAreaCharts;
