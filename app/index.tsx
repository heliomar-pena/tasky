import { Typography } from "@/components/ui/Typography";
import { spacing } from "@/theme";
import { FlatList, StyleSheet, View } from "react-native";
import { CreateTask } from "@/components/home/CreateTask";
import { useMemo, useRef, useState } from "react";
import { TaskI } from "@/interfaces/Task.interface";
import { Task } from "@/components/home/Task";
import { EditTask } from "@/components/home/EditTask";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FiltersI, TasksFilters } from "@/components/home/TasksFilters";
import { Tips } from "@/components/home/Tips";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [taskInEdit, setTaskInEdit] = useState<TaskI | null>(null);
  const [activeFilter, setActiveFilter] = useState<FiltersI>("all");

  const atLeastOneTaskCreated = useRef(false);

  const onCreateTask = (title: string) => {
    atLeastOneTaskCreated.current = true;
    if (!title.trim()) {
      return Promise.reject(new Error("Task title is required"));
    }

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

  const insertTask = (task: TaskI) => {
    setTasks((prev) => [...prev, task]);
  };

  const editTask = (task: TaskI) => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      setTasks((prev) => prev.toSpliced(taskIndex, 1, task));

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
      return Promise.resolve();
    }

    return Promise.reject();
  };

  const onCloseModal = () => {
    setTaskInEdit(null);
  };

  const onOpenDetails = (task: TaskI) => {
    setTaskInEdit(task);
  };

  const onConfirmEdit = async (task: TaskI) => {
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

  const sortedTasks = useMemo(() => {
    if (activeFilter !== "all") return filteredTasks;

    return filteredTasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }, [activeFilter, filteredTasks]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        {tasks.length > 0 && !filteredTasks.length && (
          <Typography.H3 style={styles.homeNoTasks}>
            No {activeFilter} tasks found
          </Typography.H3>
        )}
        <FlatList
          style={{ flexGrow: 1 }}
          data={sortedTasks}
          keyExtractor={(item) => "" + item.id}
          renderItem={(task) => (
            <Task
              key={task.item.id}
              style={{ marginVertical: spacing[2] }}
              task={task.item}
              insertTask={insertTask}
              onComplete={onSwitchTaskCompletion}
              onDelete={onDeleteTask}
              onEditTask={onOpenDetails}
            />
          )}
        />
        <EditTask
          onSave={onConfirmEdit}
          onDismiss={onCloseModal}
          task={taskInEdit}
        />
        <Tips disableTips={!atLeastOneTaskCreated.current} />
      </View>
    </SafeAreaView>
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
