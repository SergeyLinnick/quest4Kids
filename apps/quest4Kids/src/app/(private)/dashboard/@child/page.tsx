import { DoughnutChart } from "@/components/charts/DoughnutChart";
import { ROLE } from "@/consts";
import { generateDoughnutDataset } from "@/utilities/charts";
import { Grid } from "@radix-ui/themes";
import { fetchChildTasks } from "@repo/api";
import { auth } from "@repo/auth";
import { Card } from "@repo/ui";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== ROLE.CHILD) {
    notFound();
  }

  const tasks = await fetchChildTasks({ childId: session?.user.id });

  const data = generateDoughnutDataset(tasks?.data);

  return (
    <Grid columns="3" gap="3" width="auto">
      <Card title="My tasks">
        <DoughnutChart data={data} />
      </Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
      <Card>test</Card>
    </Grid>
  );
}
