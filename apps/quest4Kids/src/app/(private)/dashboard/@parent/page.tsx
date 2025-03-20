import { BarChart } from "@/components/charts/barChart";
import { ROLE } from "@/consts";
import { generateTaskDataset } from "@/utilities/charts";
import { Grid } from "@radix-ui/themes";
import { fetchChildren, fetchChildTasks } from "@repo/api";
import { auth } from "@repo/auth";
import { Card } from "@repo/ui";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== ROLE.PARENT) {
    notFound();
  }

  const [children, tasks] = await Promise.all([
    fetchChildren(),
    fetchChildTasks(),
  ]);

  const data = generateTaskDataset(tasks.data, children.data);

  return (
    <Grid columns="3" gap="3" width="auto">
      <Card title="Tasks by children">
        <BarChart data={data} />
      </Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
    </Grid>
  );
}
