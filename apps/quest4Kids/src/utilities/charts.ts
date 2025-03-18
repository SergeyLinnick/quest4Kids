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
    },
  },
  elements: {
    bar: {
      borderRadius: 100,
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
