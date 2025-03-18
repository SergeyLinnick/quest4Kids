import { ChartArea, ChartOptions } from "chart.js";

export function createChartGradient(
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  colors = ["#80b6f4", "#f49080", "#00d4ff"],
) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  return gradient;
}

export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: true,
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        useBorderRadius: true,
        borderRadius: 5,
        textAlign: "center",
      },
    },
  },
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  elements: {
    bar: {
      borderRadius: 100,
    },
  },
};
