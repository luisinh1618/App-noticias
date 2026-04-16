import { Text, TextInput, View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
};

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false,
}: Props) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? (
        <Text
          style={{
            marginBottom: 6,
            fontWeight: "600",
            color: colors.text,
          }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          padding: 12,
          backgroundColor: colors.surface,
          minHeight: multiline ? 120 : undefined,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );
}