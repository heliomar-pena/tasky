import { fontSize } from "@/theme";
import { StyleProp, Text, TextStyle } from "react-native";

export const TypographySize = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  normal: "normal",
  small: "small",
} as const;

type TypographyProps = React.PropsWithChildren<
  React.ComponentProps<typeof Text> & {
    children: React.ReactNode;
    size: (typeof TypographySize)[keyof typeof TypographySize];
    style?: StyleProp<TextStyle>;
  }
>;

export const Typography = ({
  children,
  style,
  size,
  ...props
}: TypographyProps) => {
  return (
    <Text style={[{ fontSize: fontSize[size] }, style]} {...props}>
      {children}
    </Text>
  );
};

Typography.H1 = function TypographyH1(props: Omit<TypographyProps, "size">) {
  return <Typography size="h1" {...props} />;
};
Typography.H2 = function TypographyH2(props: Omit<TypographyProps, "size">) {
  return <Typography size="h2" {...props} />;
};
Typography.H3 = function TypographyH3(props: Omit<TypographyProps, "size">) {
  return <Typography size="h3" {...props} />;
};
Typography.H4 = function TypographyH4(props: Omit<TypographyProps, "size">) {
  return <Typography size="h4" {...props} />;
};
Typography.H5 = function TypographyH5(props: Omit<TypographyProps, "size">) {
  return <Typography size="h5" {...props} />;
};
Typography.H6 = function TypographyH6(props: Omit<TypographyProps, "size">) {
  return <Typography size="h6" {...props} />;
};
Typography.Body = function TypographyBody(
  props: Omit<TypographyProps, "size">,
) {
  return <Typography size="normal" {...props} />;
};
