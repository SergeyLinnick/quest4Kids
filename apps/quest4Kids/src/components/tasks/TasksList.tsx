import { Badge, Flex, Table } from "@radix-ui/themes";
import { ITask, TASK_LABELS, TASK_STATUS } from "@repo/api";
import { ChangeStatusTaskForm } from "../forms/taskForm/ChangeStatusTaskForm";
import { RemoveTaskForm } from "../forms/taskForm/RemoveTaskForm";

import { ChangeLabelsTaskForm } from "../forms/taskForm/ChangeLabelsTaskForm";
import styles from "./taskList.module.css";

interface TasksListProps {
  tasks: ITask[];
  childId: string;
  hideDelete?: boolean;
}

export const TasksList = ({
  tasks,
  childId,
  hideDelete = false,
}: TasksListProps) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Coins</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Labels</Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.map((task) => {
          const { status, id: taskId } = task;
          const isStatusDone = status === TASK_STATUS.DONE.name;
          const doneClassName = isStatusDone ? styles.done : "";
          const isStatusInProgress = status === TASK_STATUS.IN_PROGRESS.name;

          const taskLabel = task?.labels?.[0]?.name;

          const initialValues = new FormData();
          initialValues.set("labels", taskLabel || TASK_LABELS.HOME);

          return (
            <Table.Row key={taskId} align="center">
              <Table.RowHeaderCell className={doneClassName}>
                {task.title}
              </Table.RowHeaderCell>
              <Table.Cell className={doneClassName}>
                {task.description}
              </Table.Cell>
              <Table.Cell>{task.points}</Table.Cell>
              <Table.Cell>
                <Badge
                  color={TASK_STATUS[status as keyof typeof TASK_STATUS]?.color}
                  variant="soft"
                  radius="full"
                >
                  {TASK_STATUS[status as keyof typeof TASK_STATUS]?.value}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <ChangeLabelsTaskForm
                  taskId={taskId}
                  childId={childId}
                  initialValues={initialValues}
                />
              </Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <ChangeStatusTaskForm
                    taskId={taskId}
                    childId={childId}
                    status={TASK_STATUS.IN_PROGRESS}
                    isDisabled={isStatusInProgress || isStatusDone}
                  />
                  <ChangeStatusTaskForm
                    taskId={taskId}
                    childId={childId}
                    status={TASK_STATUS.DONE}
                    isDisabled={isStatusDone}
                  />
                  {!hideDelete && (
                    <RemoveTaskForm taskId={taskId} childId={childId} />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
