import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Colors } from "../constants/colors";
import { ROUTE } from "../constants/constants";
import { SignupProvider } from "../screens/SignUp/providers/SignupProvider";

import HomeScreen from "../screens/Home/Home.screen";
import LoginScreen from "../screens/Login/Login.screen";
import ProfileScreen from "../screens/Profile/Profile.screen";
import SignUpScreen from "../screens/SignUp/SignUp.screen";

import { ParamListBase } from "@react-navigation/native";
import HeaderSetting from "../components/HeaderSetting/HeaderSetting";

const SignUpWrapper: React.FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  return (
    <SignupProvider>
      <SignUpScreen navigation={navigation} />
    </SignupProvider>
  );
};

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen
        name={ROUTE.PROFILE}
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTitleStyle: {
            color: Colors.primary,
          },
          headerTitle: () => <></>,
        }}
      />

      <Stack.Screen
        name={ROUTE.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTE.SIGN_UP}
        component={SignUpWrapper}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTE.HOME}
        component={HomeScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.lightBackground,
          },
          headerTitleStyle: {
            color: Colors.primary,
          },
          header: () => <HeaderSetting navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
