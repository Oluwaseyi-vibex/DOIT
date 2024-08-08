// components/CompletedTasksDoughnut.tsx
"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CompletedTasksDoughnutProps {
  completedTasks: number;
  totalTasks: number;
}

const CompletedTasksDoughnut: React.FC<CompletedTasksDoughnutProps> = ({
  completedTasks,
  totalTasks,
}) => {
  const data = {
    labels: ["Completed", "Incomplete"],

    datasets: [
      {
        data: [totalTasks - completedTasks, completedTasks],
        backgroundColor: ["#D9D9D9", "#05A301"],
        borderWidth: 8,
        weight: 3,
        spacing: -1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CompletedTasksDoughnut;
