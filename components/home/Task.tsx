import { TaskI } from "@/interfaces/Task.interface";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Button } from "../ui/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { borderRadius, boxShadow, color, fontSize, spacing } from "@/theme";
import { Typography } from "../ui/Typography";

type TaskProps = {
  task: TaskI;
  focused?: boolean;
  onFocus?: (task: TaskI) => void;
  onEditTask?: (task: TaskI) => void;
  onComplete: (task: TaskI) => Promise<void>;
  onDelete: (task: TaskI) => Promise<void>;
  style?: StyleProp<ViewStyle>;
};

export const Task = ({
  task,
  onComplete,
  focused,
  onEditTask,
  onDelete,
  onFocus,
  style,
}: TaskProps) => {
  return (
    <View style={[styles.task, style]}>
      {focused && (
        <Button
          variant="outline"
          style={styles.taskCompleteButton}
          onPress={() => onDelete(task)}
        >
          <MaterialIcons
            style={{ fontSize: fontSize.h4, color: color.error.base }}
            name="delete"
          />
        </Button>
      )}
      <Pressable
        style={styles.taskTitleContainer}
        onPress={() => onFocus?.(task)}
        onLongPress={() => onEditTask?.(task)}
      >
        <Typography.Body
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
          ]}
        >
          {task.title}
        </Typography.Body>
      </Pressable>
      <View style={styles.taskActions}>
        <Button
          variant="outline"
          style={styles.taskCompleteButton}
          onPress={() => onComplete(task)}
        >
          <MaterialIcons
            style={{ fontSize: fontSize.h4, color: color.success.base }}
            name={task.completed ? "check-box" : "check-box-outline-blank"}
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius.normal,
    overflow: "hidden",
    height: 60,
    backgroundColor: color.white,
    boxShadow: boxShadow.light,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
  },
  taskTitleContainer: {
    flex: 1,
    padding: spacing[4],
  },
  taskTitle: {
    fontSize: fontSize.normal,
    color: color.black,
  },
  taskActions: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  taskCompleteButton: {
    height: "100%",
  },
});
