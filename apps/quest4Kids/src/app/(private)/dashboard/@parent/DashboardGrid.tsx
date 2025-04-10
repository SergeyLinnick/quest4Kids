"use client";

import { BarChart } from "@/components/charts/barChart";
import { IWidgetSettings, useUpdateDashboardSettings } from "@repo/api";
import { Card } from "@repo/ui";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

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
  const layoutsInitial = settings?.layouts ?? [];

  const { updateDashboardSettings, isLoading } = useUpdateDashboardSettings();

  const handleLayoutChange = (
    _layout: any,
    layouts: { lg: IWidgetSettings[] },
  ) => {
    const mergedSettings = [
      ...layouts.lg.map((item) => {
        const initialItem = layoutsInitial.lg.find((init) => init.i === item.i);
        return {
          ...item,
          isVisible: initialItem?.isVisible ?? true,
          isStatic: initialItem?.static ?? false,
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
    >
      {visibilitySettings.taskByChildren && (
        <div key="taskByChildren" className="bg-accent">
          <Card title="Tasks by kids" className="h-full w-full">
            <BarChart data={taskByChildrenData} />
          </Card>
        </div>
      )}
      {visibilitySettings.countOfTasks && (
        <div key="countOfTasks" className="bg-green-100">
          <Card title="Count of tasks" className="h-full w-full">
            countOfTasksData
          </Card>
        </div>
      )}
      {visibilitySettings.children && (
        <div key="children" className="bg-blue-100">
          <Card title="Children" className="h-full w-full">
            childrenData
          </Card>
        </div>
      )}
      {visibilitySettings.weather && (
        <div key="weather" className="bg-red-100">
          <Card title="Weather" className="h-full w-full">
            weatherData
          </Card>
        </div>
      )}
    </ResponsiveGridLayout>
  );
};
