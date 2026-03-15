import { StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { color, spacing } from "@/theme";

export type FiltersI = "all" | "pending" | "completed";

export type TasksFiltersProps = {
  onChangeFilter: (filter: FiltersI) => void;
  activeFilter: FiltersI;
};

export const TasksFilters = ({
  onChangeFilter,
  activeFilter,
}: TasksFiltersProps) => {
  return (
    <View style={styles.tasksFilters}>
      <Button
        variant="outline"
        style={[
          styles.tasksFilterButton,
          activeFilter === "all" && styles.tasksFilterButtonActive,
        ]}
        textStyle={activeFilter === "all" && styles.tasksFilterButtonTextActive}
        onPress={() => onChangeFilter("all")}
      >
        All
      </Button>
      <Button
        variant="outline"
        style={[
          styles.tasksFilterButton,
          activeFilter === "completed" && styles.tasksFilterButtonActive,
        ]}
        textStyle={
          activeFilter === "completed" && styles.tasksFilterButtonTextActive
        }
        onPress={() => onChangeFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant="outline"
        style={[
          styles.tasksFilterButton,
          activeFilter === "pending" && styles.tasksFilterButtonActive,
        ]}
        textStyle={
          activeFilter === "pending" && styles.tasksFilterButtonTextActive
        }
        onPress={() => onChangeFilter("pending")}
      >
        Pending
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  tasksFilters: {
    display: "flex",
    gap: spacing[4],
    flexDirection: "row",
  },
  tasksFilterButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.primary.base,
  },
  tasksFilterButtonActive: {
    backgroundColor: color.primary.base,
    borderColor: color.primary.base,
    color: color.primary.contrast,
  },
  tasksFilterButtonTextActive: {
    color: color.primary.contrast,
  },
});
