import { Stack } from "expo-router";
import ControlsHeader from "./components/ControlsHeader";


export default function RootLayout() {
  return <Stack 
  >
    <Stack.Screen name="index" 
    options={{
      headerShown : false
    }}
    />
    <Stack.Screen name="tabs/ControlsPage" 
    options={{
        headerShown : false,
      }} />
    <Stack.Screen name="tabs/devices-page" 
    options={{
      headerTitle : "Devices"
    }}
    />
    </Stack>;
}
