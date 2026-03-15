import { borderRadius, color, fontSize, spacing } from "@/theme";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

export type InputProps = React.PropsWithChildren<
  React.ComponentProps<typeof TextInput> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }
>;

export const Input = ({ prefix, suffix, style, ...props }: InputProps) => {
  return (
    <View style={[styles.input, style]}>
      {prefix}
      <TextInput
        placeholderTextColor={color.black}
        style={styles.inputTextField}
        {...props}
      />
      {suffix}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: fontSize.normal,
    color: color.black,
    backgroundColor: color.white,
    borderColor: color.black,
    borderRadius: borderRadius.normal,
    overflow: "hidden",
    display: "flex",
    gap: spacing[4],
  },
  inputTextField: {
    padding: spacing[4],
  },
});
