import { ROLE } from "@/consts";
import { generateTaskDataset } from "@/utilities/charts";
import { fetchDashboardSettings, getTaskStatistics } from "@repo/api";
import { auth } from "@repo/auth";
import { notFound } from "next/navigation";
import { DashboardGrid } from "./DashboardGrid";

import { mapDashboardSettings } from "@/utilities/dashboard";
import { DashboardSettings } from "./DashboardSettings";
export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== ROLE.PARENT) {
    notFound();
  }

  const [statistics, settings] = await Promise.all([
    getTaskStatistics(),
    fetchDashboardSettings(),
  ]);

  const taskByChildrenData = generateTaskDataset(statistics);
  const mappedSettings = mapDashboardSettings(settings);

  const visibilitySettings = mappedSettings.layouts.lg.reduce(
    (acc, item) => ({
      ...acc,
      [item.i]: item.isVisible ?? true,
    }),
    {} as Record<string, boolean>,
  );

  return (
    <div>
      <div className="flex justify-end">
        <DashboardSettings
          settings={mappedSettings}
          visibilitySettings={visibilitySettings}
        />
      </div>
      <DashboardGrid
        visibilitySettings={visibilitySettings}
        settings={mappedSettings}
        taskByChildrenData={taskByChildrenData}
      />
    </div>
  );
}
