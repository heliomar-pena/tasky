import { Typography } from "@/components/ui/Typography";
import { spacing } from "@/theme";
import { Animated, StyleSheet, View } from "react-native";
import { CreateTask } from "@/components/home/CreateTask";
import { useMemo, useState } from "react";
import { TaskI } from "@/interfaces/Task.interface";
import { Task } from "@/components/home/Task";
import { EditTask } from "@/components/home/EditTask";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FiltersI, TasksFilters } from "@/components/home/TasksFilters";

export default function Index() {
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [focusedTask, setFocusedTask] = useState<number | null>(null);
  const [taskInEdit, setTaskInEdit] = useState<TaskI | null>(null);
  const [activeFilter, setActiveFilter] = useState<FiltersI>("all");

  const onCreateTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title,
        description: "",
        completed: false,
        createdAt: new Date(),
      },
    ]);

    return Promise.resolve();
  };

  const editTask = (task: TaskI) => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      setTasks((prev) => prev.toSpliced(taskIndex, 1, task));

      setFocusedTask(null);

      return Promise.resolve();
    }

    return Promise.reject();
  };

  const onSwitchTaskCompletion = (task: TaskI) => {
    return editTask({ ...task, completed: !task.completed });
  };

  const onDeleteTask = (task: TaskI) => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      setTasks((prev) => prev.toSpliced(taskIndex, 1));
      setFocusedTask(null);
      return Promise.resolve();
    }

    return Promise.reject();
  };

  const onFocusTask = (task: TaskI) => {
    setFocusedTask((prev) => (prev === task.id ? null : task.id));
  };

  const onCloseModal = () => {
    setTaskInEdit(null);
  };

  const onOpenDetails = (task: TaskI) => {
    setTaskInEdit(task);
    setFocusedTask(null);
  };

  const onConfirmEdit = (task: TaskI) => {
    return editTask(task).then(() => {
      setTaskInEdit(null);
    });
  };

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  return (
    <View style={styles.home}>
      <Typography.H1>Tasky</Typography.H1>
      <CreateTask onCreateTask={onCreateTask} />
      {tasks.length > 0 && (
        <TasksFilters
          activeFilter={activeFilter}
          onChangeFilter={setActiveFilter}
        />
      )}
      {!tasks.length && (
        <Typography.H3 style={styles.homeNoTasks}>
          Create your first task
          <MaterialIcons name="add" />
        </Typography.H3>
      )}
      {tasks.length && !filteredTasks.length && (
        <Typography.H3 style={styles.homeNoTasks}>
          No {activeFilter} tasks found
        </Typography.H3>
      )}
      <Animated.FlatList
        data={filteredTasks}
        keyExtractor={(item) => "" + item.id}
        renderItem={(task) => (
          <Animated.View key={task.item.id}>
            <Task
              key={task.item.id}
              style={{ marginVertical: spacing[1] }}
              task={task.item}
              focused={focusedTask === task.item.id}
              onFocus={onFocusTask}
              onComplete={onSwitchTaskCompletion}
              onDelete={onDeleteTask}
              onEditTask={onOpenDetails}
            />
          </Animated.View>
        )}
      />
      <EditTask
        onSave={onConfirmEdit}
        onDismiss={onCloseModal}
        task={taskInEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: "column",
    gap: spacing[4],
    padding: spacing[4],
    paddingTop: spacing[8],
    maxWidth: 600,
    width: "100%",
    margin: "auto",
  },
  homeNoTasks: { color: "gray" },
});
