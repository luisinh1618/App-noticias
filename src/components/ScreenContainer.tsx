import { ReactNode } from "react";
import { ScrollView, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  scroll?: boolean;
};

export default function ScreenContainer({ children, scroll = true }: Props) {
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
     
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)", 
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {scroll ? (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {children}
            </ScrollView>
          ) : (
            <View style={{ flex: 1, padding: 20 }}>
              {children}
            </View>
          )}
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}