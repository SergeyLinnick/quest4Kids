"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IWidgetSettings, useUpdateDashboardSettings } from "@repo/api";
import { Button, CheckboxFields, Form } from "@repo/ui-tw";

const items = [
  {
    label: "Task by children",
    id: "taskByChildren",
  },
  {
    label: "Count of tasks",
    id: "countOfTasks",
  },
  {
    label: "Children",
    id: "children",
  },
  {
    label: "Weather",
    id: "weather",
  },
];

const FormSchema = z.object({
  widgets: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface DashboardSettingsFormProps {
  visibilitySettings: Record<string, boolean>;
  settings: { layouts: { lg: IWidgetSettings[] } };
}

export const DashboardSettingsForm = ({
  visibilitySettings,
  settings,
}: DashboardSettingsFormProps) => {
  const { updateDashboardSettings, isLoading } = useUpdateDashboardSettings();

  const allCookies = document.cookie;
  console.log("allCookies", allCookies);

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!layoutsInitial?.lg) return;

    const updatedSettings = layoutsInitial?.lg?.map((item) => ({
      ...item,
      isVisible: data.widgets.includes(item.i),
    }));
    updateDashboardSettings(updatedSettings);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <CheckboxFields items={items} control={form.control} name="widgets" />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
