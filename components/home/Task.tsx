import { TaskI } from "@/interfaces/Task.interface";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Button } from "../ui/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { borderRadius, boxShadow, color, fontSize, spacing } from "@/theme";
import { Typography } from "../ui/Typography";
import { toast } from "sonner-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type TaskProps = {
  task: TaskI;
  onEditTask?: (task: TaskI) => void;
  onComplete: (task: TaskI) => Promise<void>;
  onDelete: (task: TaskI) => Promise<void>;
  insertTask: (task: TaskI) => void;
  style?: StyleProp<ViewStyle>;
};

export const Task = ({
  task,
  onComplete,
  insertTask,
  onEditTask,
  onDelete,
  style,
}: TaskProps) => {
  const pressed = useSharedValue(false);
  const deleteButtonWidth = useSharedValue(0);

  const swipe = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      if (event.translationX < 30) {
        deleteButtonWidth.value = withSpring(0);
      } else {
        deleteButtonWidth.value = withSpring(60);
      }
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const handleOnComplete = () => {
    onComplete(task).then(() => {
      toast.success(
        task.completed
          ? `Task ${task.title} marked as incompleted`
          : `Task ${task.title} marked as complete`,
        {
          id: task.id,
        },
      );
    });
  };

  const animatedTaskStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(pressed.value ? 0.97 : 1, {
            duration: 100,
          }),
        },
      ],
      opacity: withTiming(pressed.value ? 0.9 : 1, {
        duration: 100,
      }),
    };
  });

  const handleOnDelete = () => {
    onDelete(task).then(() => {
      toast.success(`Task ${task.title} deleted`, {
        action: {
          label: "Undo",
          onClick: () => {
            insertTask(task);
            toast.info(`Task ${task.title} restored`, {
              id: task.id,
              action: null,
            });
          },
        },
        id: task.id,
      });
    });
  };

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.task, style, animatedTaskStyle]}
    >
      <View style={[styles.taskHeader]}>
        <Animated.View
          style={[
            { width: 0 },
            {
              position: "relative",
              overflow: "hidden",
              width: deleteButtonWidth,
            },
          ]}
        >
          <Button
            variant="outline"
            style={styles.taskCompleteButton}
            onPress={handleOnDelete}
          >
            <MaterialIcons
              style={{ fontSize: fontSize.h4, color: color.error.base }}
              name="delete"
            />
          </Button>
        </Animated.View>
        <GestureDetector gesture={swipe}>
          <Pressable
            style={styles.taskTitleContainer}
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
        </GestureDetector>
        <View style={styles.taskActions}>
          <Button
            variant="outline"
            style={styles.taskCompleteButton}
            onPress={handleOnComplete}
          >
            <MaterialIcons
              style={{ fontSize: fontSize.h4, color: color.success.base }}
              name={task.completed ? "check-box" : "check-box-outline-blank"}
            />
          </Button>
        </View>
      </View>
      <Typography style={styles.taskDescription} size="small">
        {task.description}
      </Typography>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  task: {
    display: "flex",
    flexDirection: "column",
    borderRadius: borderRadius.normal,
    overflow: "hidden",
    backgroundColor: color.white,
    boxShadow: boxShadow.light,
  },
  taskHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    position: "relative",
    flex: 1,
  },
  taskDescription: {
    color: color.gray,
    paddingLeft: spacing[2],
    paddingBottom: spacing[2],
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
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
