import { ReactNode } from "react";
import { View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
};

export default function AppCard({ children }: Props) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
      }}
    >
      {children}
    </View>
  );
}