import { ROLE } from "@/consts";
import { generateTaskDataset } from "@/utilities/charts";
import { getTaskStatistics } from "@repo/api";
import { auth } from "@repo/auth";
import { notFound } from "next/navigation";
import { DashboardGrid } from "./DashboardGrid";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== ROLE.PARENT) {
    notFound();
  }

  const statistics = await getTaskStatistics();

  const data = generateTaskDataset(statistics);

  return (
    <>
      <DashboardGrid data={data} />
      {/* <Grid columns="1" gap="4" width="auto">
        <Grid columns="2" gap="4" width="auto">
          <Card title="Tasks by children">
            <BarChart data={data} />
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
      </Grid> */}
    </>
  );
}
