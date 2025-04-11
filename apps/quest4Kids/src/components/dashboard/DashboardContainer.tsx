"use client";

import { IWidgetSettings } from "@repo/api";
import { useState } from "react";
import { DashboardGrid } from "./DashboardGrid";
import { DashboardSettingsModal } from "./DashboardSettingsModal";

type DashboardContainerProps = {
  settings: {
    layouts: {
      lg: IWidgetSettings[];
    };
  };
  taskByChildrenData: any;
};

export const DashboardContainer = ({
  settings,
  taskByChildrenData,
}: DashboardContainerProps) => {
  const [dashboardSettings, setDashboardSettings] = useState(settings);

  const visibilitySettings = dashboardSettings.layouts.lg.reduce(
    (acc, item) => ({
      ...acc,
      [item.i]: item.isVisible ?? true,
    }),
    {} as Record<string, boolean>,
  );

  return (
    <>
      <div className="flex justify-end">
        <DashboardSettingsModal
          settings={dashboardSettings}
          visibilitySettings={visibilitySettings}
          onSettingsChange={setDashboardSettings}
        />
      </div>
      <DashboardGrid
        visibilitySettings={visibilitySettings}
        settings={dashboardSettings}
        taskByChildrenData={taskByChildrenData}
      />
    </>
  );
};
