import { Link } from "expo-router";
import { Text, View, StatusBar   } from "react-native";
import ControlsPage from "./tabs/ControlsPage";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          hidden={true}
        />
      
      <ControlsPage />
    </View>
  );
}
