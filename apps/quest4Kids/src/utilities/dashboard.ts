import { IWidgetSettings } from "@repo/api";

export const mapDashboardSettings = (settings: IWidgetSettings[]) => {
  return {
    layouts: {
      lg: settings,
    },
  };
};
