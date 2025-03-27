import { DoughnutChart } from "@/components/charts/DoughnutChart";
import { ROLE } from "@/consts";
import { generateDoughnutDataset } from "@/utilities/charts";
import { Grid } from "@radix-ui/themes";
import { getTaskStatistics } from "@repo/api";
import { auth } from "@repo/auth";
import { Card } from "@repo/ui";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== ROLE.CHILD) {
    notFound();
  }

  const statistics = await getTaskStatistics({ childId: session?.user.id });

  const data = generateDoughnutDataset(statistics?.[0]);

  return (
    <Grid columns="1" gap="4" width="auto">
      <Grid columns="2" gap="4" width="auto">
        <Card title="My tasks">
          {data ? <DoughnutChart data={data} /> : <div>No tasks found</div>}
        </Card>
        <Card>2</Card>
      </Grid>
      <Grid columns="3" gap="4" width="auto">
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
      </Grid>
      <Grid columns="4" gap="4" width="auto">
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
      </Grid>
    </Grid>
  );
}
