import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  style?: ViewStyle;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  style,
}: Props) {
  const backgroundColor = {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        padding: 14,
        borderRadius: 10,
        ...style,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}