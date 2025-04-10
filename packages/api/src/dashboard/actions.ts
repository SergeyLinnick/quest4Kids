"use server";

import { dashboardService } from "./services";
import { IWidgetSettings } from "./types";

export const fetchDashboardSettings = async (): Promise<IWidgetSettings[]> => {
  return await dashboardService.getDashboardSettings();
};
