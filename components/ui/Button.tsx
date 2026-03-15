import { borderRadius, color, spacing } from "@/theme";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Typography } from "./Typography";

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "outline"
  | "error";

export type ButtonProps = React.PropsWithChildren<
  PressableProps & {
    rounded?: boolean;
    variant?: ButtonVariants;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }
>;

const getButtonColors = (variant?: ButtonVariants) => {
  switch (variant) {
    case "primary":
      return color.primary;
    case "secondary":
      return color.secondary;
    case "success":
      return color.success;
    case "warning":
      return color.warning;
    case "error":
      return color.error;
    case "outline":
      return {
        base: "transparent",
        contrast: color.primary.base,
      };
    default:
      return color.primary;
  }
};

export const Button = ({
  rounded,
  variant,
  style,
  textStyle,
  children,
  ...props
}: ButtonProps) => {
  const colors = getButtonColors(variant);

  return (
    <Pressable
      style={[styles.button, { backgroundColor: colors.base }, rounded && styles.buttonRounded, style]}
      {...props}
    >
      <Typography.Body style={[{ color: colors.contrast }, textStyle]}>
        {children}
      </Typography.Body>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing[4],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.normal,
  },
  buttonPrimary: {
    backgroundColor: color.primary.base,
    color: color.primary.contrast,
  },
  buttonSecondary: {
    backgroundColor: color.secondary.base,
    color: color.secondary.contrast,
  },
  buttonSuccess: {
    backgroundColor: color.success.base,
    color: color.success.contrast,
  },
  buttonWarning: {
    backgroundColor: color.warning.base,
    color: color.warning.contrast,
  },
  buttonError: {
    backgroundColor: color.error.base,
    color: color.error.contrast,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    color: color.primary.base,
  },
  buttonRounded: {
    borderRadius: borderRadius.full,
  },
});
