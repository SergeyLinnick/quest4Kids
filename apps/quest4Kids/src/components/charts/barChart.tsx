"use client";

import { barChartOptions, createChartGradient } from "@/utilities/charts";
import {
  BarElement,
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CustomChartDataset extends ChartDataset<"bar"> {
  colors?: string[];
}

interface CustomChartData extends Omit<ChartData<"bar">, "datasets"> {
  datasets: CustomChartDataset[];
}

export function BarChart({ data }: { data: CustomChartData }) {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => {
        return {
          ...dataset,
          backgroundColor: createChartGradient(
            chart.ctx,
            chart.chartArea,
            dataset.colors,
          ),
        };
      }),
    };

    setChartData(chartData);
  }, [data]);

  return (
    <Bar
      ref={chartRef}
      options={barChartOptions}
      data={chartData}
      height={200}
    />
  );
}
