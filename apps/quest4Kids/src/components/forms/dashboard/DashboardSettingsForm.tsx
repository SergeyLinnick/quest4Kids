"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DashboardSettings } from "@/components/dashboard/DashboardSettingsModal";
import { useUpdateDashboardSettings } from "@repo/api";
import { Button, CheckboxFields, Form } from "@repo/ui-tw";
import { parentDashboardWidgets } from "../../dashboard/parentDashboardWidgets";

const FormSchema = z.object({
  widgets: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface DashboardSettingsFormProps {
  visibilitySettings: Record<string, boolean>;
  settings: DashboardSettings;
  afterSubmit?: () => void;
  onSettingsChange: (settings: DashboardSettings) => void;
  widgets: typeof parentDashboardWidgets;
}

export const DashboardSettingsForm = ({
  visibilitySettings,
  settings,
  afterSubmit,
  onSettingsChange,
  widgets,
}: DashboardSettingsFormProps) => {
  const { updateDashboardSettings, isLoading } = useUpdateDashboardSettings();

  const layoutsInitial = settings?.layouts ?? [];

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      widgets: Object.keys(visibilitySettings).filter(
        (key) => visibilitySettings[key],
      ),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!layoutsInitial?.lg) return;

    const updatedSettings = layoutsInitial?.lg?.map((item) => ({
      ...item,
      isVisible: data.widgets.includes(item.i),
    }));
    await updateDashboardSettings(updatedSettings);
    onSettingsChange({
      layouts: {
        lg: updatedSettings,
      },
    });
    afterSubmit?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <CheckboxFields items={widgets} control={form.control} name="widgets" />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
