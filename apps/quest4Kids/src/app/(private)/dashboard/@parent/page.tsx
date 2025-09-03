import { ROLE } from "@/consts";
import { generateTaskDataset } from "@/utilities/charts";
import { fetchDashboardSettings, getTaskStatistics } from "@repo/api";
import { authOptions } from "@repo/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { mapDashboardSettings } from "@/utilities/dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== ROLE.PARENT) {
    notFound();
  }

  const [statistics, settings] = await Promise.all([
    getTaskStatistics(),
    fetchDashboardSettings(),
  ]);

  const taskByChildrenData = generateTaskDataset(statistics);
  const mappedSettings = mapDashboardSettings(settings);

  return (
    <DashboardContainer
      settings={mappedSettings}
      taskByChildrenData={taskByChildrenData}
    />
  );
}
