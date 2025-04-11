"use client";

import { useState } from "react";

import { IWidgetSettings } from "@repo/api";
import { Button, Modal, SettingsIcon } from "@repo/ui-tw";

import { DashboardSettingsForm } from "../forms/dashboard/DashboardSettingsForm";
import { parentDashboardWidgets } from "./parentDashboardWidgets";

export type DashboardSettings = {
  layouts: {
    lg: IWidgetSettings[];
  };
};

interface DashboardSettingsModalProps {
  visibilitySettings: Record<string, boolean>;
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
}

export const DashboardSettingsModal = ({
  visibilitySettings,
  settings,
  onSettingsChange,
}: DashboardSettingsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <Button variant="ghost">
          <SettingsIcon />
        </Button>
      </Modal.Button>
      <Modal.Content
        title="Dashboard settings"
        description="Select the widgets you want to display in the dashboard."
      >
        <DashboardSettingsForm
          settings={settings}
          visibilitySettings={visibilitySettings}
          afterSubmit={() => setOpen(false)}
          onSettingsChange={onSettingsChange}
          widgets={parentDashboardWidgets}
        />
      </Modal.Content>
    </Modal>
  );
};
