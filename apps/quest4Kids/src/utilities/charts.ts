import { ITaskStatistics, TASK_STATUS } from "@repo/api";
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
      beginAtZero: true,
      ticks: {},
    },
  },
  elements: {
    bar: {
      borderRadius: 100,
    },
  },
};

export const doughnutChartOptions: ChartOptions<"doughnut"> = {
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
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

export function generateTaskDataset(statistics: ITaskStatistics[]) {
  const colors = {
    OPEN: ["#FFC53D", "#FFBA18", "#AB6400"],
    IN_PROGRESS: ["#23d4ff", "#786eff", "#a534ff"],
    DONE: ["#b0ff00", "#009971", "#23ff70"],
  };

  //   data={{
  //     labels: ['Ola', 'Kasia', 'Adam'],
  //     datasets: [
  //       {
  //         id: 1,
  //         label: 'Open',
  //         data: [5, 6, 7],
  //       },
  //       {
  //         id: 2,
  //         label: 'In Progress',
  //         data: [3, 2, 1],
  //       },
  //     ],
  //   }
  // }

  const datasets = Object.keys(TASK_STATUS).map((status, index) => ({
    label:
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase().replace("_", " "),
    data: statistics.map((item) => {
      if (status === TASK_STATUS.OPEN.name) {
        return item.openTasks || null;
      }
      if (status === TASK_STATUS.IN_PROGRESS.name) {
        return item.inProgressTasks || null;
      }
      if (status === TASK_STATUS.DONE.name) {
        return item.doneTasks || null;
      }
      return null;
    }),
    stack: `Stack ${index}`,
    colors: colors[status as keyof typeof colors],
  }));

  return {
    labels: statistics.map((stat) => stat.name),
    datasets,
  };
}

export function generateDoughnutDataset(statistics?: ITaskStatistics) {
  if (!statistics) {
    return null;
  }

  const colors = {
    OPEN: "rgb(255, 197, 61)",
    IN_PROGRESS: "rgb(35, 212, 255)",
    DONE: "rgb(176, 255, 0)",
  };

  return {
    labels: Object.keys(TASK_STATUS).map(
      (status) =>
        status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase().replace("_", " "),
    ),
    datasets: [
      {
        label: "Tasks",
        data: [
          statistics.openTasks,
          statistics.inProgressTasks,
          statistics.doneTasks,
        ],
        backgroundColor: Object.keys(TASK_STATUS).map(
          (status) => colors[status as keyof typeof colors],
        ),
      },
    ],
  };
}
