import { IChild, ITask, TASK_STATUS } from "@repo/api";
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

export function generateTaskDataset(tasks: ITask[], users: IChild[]) {
  const colors = {
    OPEN: ["#FFC53D", "#FFBA18", "#AB6400"],
    IN_PROGRESS: ["#23d4ff", "#786eff", "#a534ff"],
    DONE: ["#b0ff00", "#009971", "#23ff70"],
  };

  // Filter users with tasks
  const activeUsers = users.filter((user) =>
    tasks.some((task) => task.userId === user.id),
  );

  // Group tasks by users
  const tasksByUser = activeUsers.reduce(
    (acc, user) => {
      acc[user.id] = tasks.filter((task) => task.userId === user.id);
      return acc;
    },
    {} as Record<string, ITask[]>,
  );

  const datasets = Object.keys(TASK_STATUS).map((status, index) => ({
    label:
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase().replace("_", " "),
    data: activeUsers.map(
      (user) =>
        tasksByUser[user.id]?.filter((task) => task.status === status).length ??
        0,
    ),
    stack: `Stack ${index}`,
    colors: colors[status as keyof typeof colors],
  }));

  return {
    labels: activeUsers.map((user) => user.name),
    datasets,
  };
}

export function generateDoughnutDataset(tasks: ITask[]) {
  const colors = {
    OPEN: "rgb(255, 197, 61)",
    IN_PROGRESS: "rgb(35, 212, 255)",
    DONE: "rgb(176, 255, 0)",
  };

  const tasksByStatus = Object.keys(TASK_STATUS).reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    labels: Object.keys(TASK_STATUS).map(
      (status) =>
        status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase().replace("_", " "),
    ),
    datasets: [
      {
        label: "Tasks",
        data: Object.values(tasksByStatus),
        backgroundColor: Object.keys(TASK_STATUS).map(
          (status) => colors[status as keyof typeof colors],
        ),
      },
    ],
  };
}
