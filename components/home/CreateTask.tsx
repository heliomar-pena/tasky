import { StyleSheet, View } from "react-native";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { color, fontSize, spacing } from "@/theme";
import { useState } from "react";

export type CreateTaskProps = {
  onCreateTask?: (title: string) => Promise<void>;
};

export const CreateTask = ({ onCreateTask }: CreateTaskProps) => {
  const [title, setTitle] = useState("");

  const handleOnCreateTask = () => {
    if (onCreateTask) {
      onCreateTask(title).then(() => setTitle(""));
    }
  };

  return (
    <View style={styles.createTask}>
      <Input
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleOnCreateTask}
        placeholder="What needs to be done?"
        style={styles.input}
      />
      {!!title && (
        <Button
          onPress={handleOnCreateTask}
          rounded
          style={{ width: 50, height: 50 }}
        >
          <MaterialIcons
            style={{ color: color.primary.contrast }}
            name="add"
          />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  createTask: {
    display: "flex",
    flexDirection: "row",
    gap: spacing[2],
  },
  input: {
    flex: 1,
    width: "100%",
  },
});
