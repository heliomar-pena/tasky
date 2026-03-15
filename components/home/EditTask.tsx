import { TaskI } from "@/interfaces/Task.interface";
import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import { Typography } from "../ui/Typography";
import { boxShadow, color, fontSize, spacing } from "@/theme";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type EditTaskProps = {
  task: TaskI | null;
  onSave: (task: TaskI) => void;
  onDismiss: () => void;
};

export const EditTask = ({ task, onSave, onDismiss }: EditTaskProps) => {
  const displayModal = task?.id !== undefined;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleOnSave = () => {
    if (!task) return;

    const newTask = { ...task, title, description };
    onSave(newTask);
  };

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
  }, [task]);

  return (
    <Modal
      allowSwipeDismissal
      onDismiss={onDismiss}
      animationType="slide"
      transparent={Platform.OS === "web" ? true : false}
      backdropColor="rgba(0, 0, 0, 0.5)"
      visible={displayModal}
    >
      <View style={styles.editTask}>
        <View style={styles.editTaskContent}>
          <View style={styles.editTaskHeader}>
            <Typography.H4>Edit Task</Typography.H4>
            <Button onPress={onDismiss} rounded variant="outline">
              <MaterialIcons
                name="close"
                color={color.black}
                size={fontSize.h4}
              />
            </Button>
          </View>
          <View style={styles.editTaskForm}>
            <View style={styles.editTaskInputs}>
              <Text>Title</Text>
              <Input value={title || ""} onChangeText={setTitle} />
            </View>
            <View style={styles.editTaskInputs}>
              <Text>Description</Text>
              <Input
                value={description || ""}
                multiline
                numberOfLines={2}
                onChangeText={setDescription}
              />
            </View>
            <Button disabled={!title.trim?.()} onPress={handleOnSave}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  editTask: {
    backgroundColor: Platform.OS === "web" ? "rgba(0, 0, 0, 0.5)" : undefined,
    width: "100%",
    height: "100%",
  },
  editTaskContent: {
    minHeight: 385,
    backgroundColor: color.lighterGray,
    height: "50%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderColor: color.black,
    boxShadow: boxShadow.normal,
  },
  editTaskHeader: {
    padding: spacing[4],
    paddingBottom: spacing[0],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editTaskInputs: {
    gap: spacing[2],
  },
  editTaskForm: {
    padding: spacing[4],
    display: "flex",
    gap: spacing[4],
    justifyContent: "space-between",
  },
});
