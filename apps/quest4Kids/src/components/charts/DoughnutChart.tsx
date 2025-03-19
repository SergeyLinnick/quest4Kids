"use client";

import { doughnutChartOptions } from "@/utilities/charts";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

export function DoughnutChart({ data }: { data: ChartData<"doughnut"> }) {
  return <Doughnut data={data} options={doughnutChartOptions} />;
}
