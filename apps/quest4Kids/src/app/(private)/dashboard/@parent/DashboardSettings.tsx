import { IWidgetSettings } from "@repo/api";
import { Button, Modal, SettingsIcon } from "@repo/ui-tw";
import { DashboardSettingsForm } from "./DashboardSettingsForm";

interface DashboardSettingsProps {
  visibilitySettings: Record<string, boolean>;
  settings: {
    layouts: {
      lg: IWidgetSettings[];
    };
  };
}

export const DashboardSettings = ({
  visibilitySettings,
  settings,
}: DashboardSettingsProps) => {
  return (
    <Modal>
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
        />
      </Modal.Content>
    </Modal>
  );
};
