import { Text } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  children: string;
};

export default function AppTitle({ children }: Props) {
  return (
    <Text
      style={{
        fontSize: 26,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 20,
      }}
    >
      {children}
    </Text>
  );
}