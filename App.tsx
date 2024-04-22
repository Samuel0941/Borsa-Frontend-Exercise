import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { useEffect } from "react";
import { Colors } from "./app/constants/colors";
import Router from "./app/router";

import useLocationPermission from "./app/hooks/useLocationPermission";
import store from "./app/redux/Store";

import { NotificationProvider } from "./app/providers/NotificationProvider";

export default function App() {
  const askPermission = useLocationPermission();

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor={Colors.primary}
        style={"light"}
        hideTransitionAnimation={"fade"}
      />

      <ReduxProvider store={store}>
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
