import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Carregando...</Text>
    </View>
  );
}