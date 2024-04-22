import { NavigationContainer } from "@react-navigation/native";
import SnackBar from "react-native-snackbar-component";

import React, { FC, useContext, useEffect } from "react";
import {
  NotificationColors,
  NotificationContext,
} from "../providers/NotificationProvider";
import StackNavigator from "./stack";

const Router: FC<{
  navigation?: any;
}> = ({}) => {
  const { state: notificationState, setState: setNotificationState } =
    useContext(NotificationContext);

  const { message, background } = NotificationColors(
    notificationState.severity
  );

  useEffect(() => {
    if (notificationState.open) {
      setTimeout(() => {
        setNotificationState({
          ...notificationState,
          open: false,
        });
      }, 3000);
    }
  }, [notificationState]);

  return (
    <NavigationContainer>
      <SnackBar
        position={notificationState.position}
        containerStyle={{
          height: 50,
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
        backgroundColor={background}
        messageStyle={{
          fontWeight: "bold",
          alignSelf: "center",
        }}
        messageColor={message}
        visible={notificationState.open}
        textMessage={notificationState.message}
      />

      <StackNavigator />
    </NavigationContainer>
  );
};

export default Router;
