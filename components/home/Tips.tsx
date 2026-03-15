import Animated from "react-native-reanimated";
import { Typography } from "../ui/Typography";
import { useState } from "react";
import { Button } from "../ui/Button";
import { StyleSheet } from "react-native";
import { borderRadius, color, spacing } from "@/theme";

const TIPS = [
  "Long press a task to edit it",
  "Swipe to the right to delete a task",
  "A task was deleted by mistake? Recover it pressing the undo button on the notification",
];

export const Tips = ({ disableTips }: { disableTips: boolean }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [hideTips, setHideTips] = useState(false);

  const isFinalTip = TIPS.length === currentTip + 1;

  const onNextTip = () => {
    if (isFinalTip) {
      setHideTips(true);
      return;
    }
    setCurrentTip((prevTip) => (prevTip + 1) % TIPS.length);
  };

  if (hideTips || disableTips) return null;

  return (
    <Animated.View style={styles.tip}>
      <Typography.Body style={styles.tipText}>
        {TIPS[currentTip]}
      </Typography.Body>
      <Button
        variant="outline"
        textStyle={{ color: color.primary.contrast }}
        onPress={onNextTip}
        style={styles.tipButton}
      >
        {isFinalTip ? "Got it!" : "Next Tip"}
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tip: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    borderRadius: borderRadius.normal,
    backgroundColor: color.primary.base,
  },
  tipText: {
    paddingLeft: spacing[2],
    paddingTop: spacing[2],
    flexGrow: 3,
    color: color.primary.contrast,
    width: "100%",
  },
  tipButton: {
    alignSelf: "flex-end",
  },
});
