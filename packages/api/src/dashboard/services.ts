import { Session } from "@repo/auth";
import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { IWidgetSettings } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const dashboardService = {
  /**
   * Get the dashboard settings
   * @returns The dashboard settings
   */
  getDashboardSettings: (): Promise<IWidgetSettings[]> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.DASHBOARD.GET_DASHBOARD_SETTINGS}`,
    };
    return authHttpClient.fetch(options);
  },
  /**
   * Update the dashboard settings
   * @param settings - The settings to update
   * @returns The updated settings
   */
  updateDashboardSettings: (
    settings: IWidgetSettings[],
    session: Session,
  ): Promise<IWidgetSettings[]> => {
    const settingsToUpdate = {
      layout: settings,
    };

    const options = {
      method: "PUT",
      url: `${api}${API_PATH.DASHBOARD.UPDATE_DASHBOARD_SETTINGS}`,
      body: JSON.stringify(settingsToUpdate),
      sessionClient: session,
    };
    return authHttpClient.fetch(options);
  },
};
