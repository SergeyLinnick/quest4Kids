import { Badge, Button, Flex, Table } from "@radix-ui/themes";
import { ITask } from "@repo/api";

interface TasksListProps {
  tasks: ITask[];
}

export const TasksList = ({ tasks }: TasksListProps) => {
  const getBadge = (status: string) => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <Badge color="orange" variant="soft" radius="full">
            {status}
          </Badge>
        );
      case "DONE":
        return (
          <Badge color="green" variant="soft" radius="full">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge color="blue" variant="soft" radius="full">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Points</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.map((task) => (
          <Table.Row key={task.id}>
            <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>
            <Table.Cell>{task.description}</Table.Cell>
            <Table.Cell>{task.points}</Table.Cell>
            <Table.Cell>{getBadge(task.status)}</Table.Cell>
            <Table.Cell>
              <Flex gap="2">
                <Button variant="outline" color="green">
                  Done
                </Button>
                <Button variant="outline" color="blue">
                  In Progress
                </Button>
                <Button variant="outline" color="red">
                  Delete
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
