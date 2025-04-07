"use client";

import { BarChart } from "@/components/charts/barChart";
import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGrid = ({ data }: { data: any }) => {
  const initialSettings = {
    layouts: {
      lg: [
        { i: "card1", x: 0, y: 0, w: 5, h: 3, minH: 3, static: false },
        { i: "card2", x: 5, y: 0, w: 3, h: 3 },
        { i: "card3", x: 0, y: 3, w: 8, h: 2 },
        { i: "card4", x: 0, y: 9, w: 8, h: 3 },
      ],
      md: [
        { i: "card1", x: 0, y: 0, w: 5, h: 3, minH: 3 },
        { i: "card2", x: 0, y: 3, w: 4, h: 3 },
        { i: "card3", x: 4, y: 3, w: 1, h: 3 },
        { i: "card4", x: 0, y: 9, w: 8, h: 3 },
      ],
      sm: [
        { i: "card1", x: 0, y: 0, w: 4, h: 3, minH: 3 },
        { i: "card2", x: 0, y: 3, w: 4, h: 2 },
        { i: "card3", x: 0, y: 5, w: 4, h: 2 },
        { i: "card4", x: 0, y: 9, w: 8, h: 3 },
      ],
    },
    visibility: {
      card1: true,
      card2: true,
      card3: true,
      card4: true,
    },
  };

  const [layouts, setLayouts] = useState(initialSettings.layouts);
  const [visibility, setVisibility] = useState(initialSettings.visibility);

  const handleLayoutChange = (layout: any, layouts: any) => {
    console.log("layouts", layouts);
    setLayouts(layouts);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      rowHeight={100}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 4, xs: 4, xxs: 2 }}
      autoSize
      onLayoutChange={handleLayoutChange}
    >
      {visibility.card1 && (
        <div key="card1" className="bg-accent">
          <div className="p-4 h-full w-full">
            <BarChart data={data} />
          </div>
        </div>
      )}
      {visibility.card2 && (
        <div key="card2" className="bg-green-100">
          <div className="p-4">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not
          </div>
        </div>
      )}
      {visibility.card3 && (
        <div key="card3" className="bg-blue-100">
          c
        </div>
      )}
      {visibility.card4 && (
        <div key="card4" className="bg-red-100">
          d
        </div>
      )}
    </ResponsiveGridLayout>
  );
};
