"use client";

import { useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import { IWidgetSettings, useUpdateDashboardSettings } from "@repo/api";
import { WidgetCard } from "@repo/ui-tw";

import { BarChart } from "../charts/barChart";

export const DashboardGrid = ({
  taskByChildrenData,
  countOfTasksData,
  childrenData,
  weatherData,
  settings,
  visibilitySettings,
}: {
  taskByChildrenData?: any;
  countOfTasksData?: any;
  childrenData?: any;
  weatherData?: any;
  settings: { layouts: { lg: IWidgetSettings[] } };
  visibilitySettings: Record<string, boolean>;
}) => {
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const layoutsInitial = settings?.layouts ?? [];

  const { updateDashboardSettings } = useUpdateDashboardSettings();

  const handleLayoutChange = (
    _layout: any,
    layouts: { lg: IWidgetSettings[] },
  ) => {
    const mergedSettings = [
      ...layouts.lg.map((item) => {
        const initialItem = layoutsInitial.lg.find((init) => init.i === item.i);
        return {
          ...item,
          maxH: initialItem?.maxH ?? 20,
          maxW: initialItem?.maxW ?? 12,
          minH: initialItem?.minH ?? 0,
          minW: initialItem?.minW ?? 0,
          isDraggable: initialItem?.isDraggable ?? true,
          isResizable: initialItem?.isResizable ?? true,
          isVisible: initialItem?.isVisible ?? true,
        };
      }),
      ...layoutsInitial.lg.filter(
        (init: IWidgetSettings) =>
          !layouts.lg.find((item) => item.i === init.i) &&
          init.isVisible === false,
      ),
    ];

    updateDashboardSettings(mergedSettings);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layoutsInitial}
      rowHeight={100}
      breakpoints={{ lg: 0 }}
      cols={{ lg: 12 }}
      margin={[20, 20]}
      autoSize
      onLayoutChange={handleLayoutChange}
      draggableHandle=".dragItem"
    >
      {visibilitySettings.taskByChildren && (
        <div key="taskByChildren" className="relative group">
          <WidgetCard title="Tasks by kids">
            <BarChart data={taskByChildrenData} />
          </WidgetCard>
        </div>
      )}
      {visibilitySettings.countOfTasks && (
        <div key="countOfTasks" className="relative group">
          <WidgetCard title="Count of tasks">countOfTasksData</WidgetCard>
        </div>
      )}
      {visibilitySettings.children && (
        <div key="children" className="relative group">
          <WidgetCard title="Children">childrenData</WidgetCard>
        </div>
      )}
      {visibilitySettings.weather && (
        <div key="weather" className="relative group">
          <WidgetCard title="Weather">weatherData</WidgetCard>
        </div>
      )}
    </ResponsiveGridLayout>
  );
};
