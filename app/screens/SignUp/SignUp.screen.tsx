import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import { Colors } from "../../constants/colors";

import { useAppDispatch } from "../../redux/redux-hooks";
import { registerUserAction } from "../../redux/user/slice";
import StepButtonComponent from "./components/StepButton/StepButton.component";
import StepFormComponent from "./components/StepForm";
import StepIndicatorComponent from "./components/StepIndicator/StepIndicator.component";
import { SIGN_UP_STEP_ROUTE } from "./constants";
import useSignUpFormik from "./hooks/useSignUpFormik";
import { SignupContext } from "./providers/SignupProvider";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Tab = createMaterialTopTabNavigator();

const SignUpScreen: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const { formData, setFormData } = useContext(SignupContext);

  const dispatch = useAppDispatch();

  const formsFormik = useSignUpFormik({
    onForm1Submit: ({ fullName, ...rest }) => {
      const [firstName, lastName] = fullName.split(" ");
      navigation.navigate(SIGN_UP_STEP_ROUTE.OTHER);

      setTimeout(() => {
        setFormData({ ...formData, firstName, lastName, ...rest });
      }, 2000);
    },
    onForm2Submit: (values) => {
      navigation.navigate(SIGN_UP_STEP_ROUTE.CREDENTIAL);

      setTimeout(() => {
        setFormData({ ...formData, ...values });
      }, 2000);
    },
    onForm3Submit: (values) => {
      const payload = { ...formData, ...values };
      setTimeout(() => {
        setFormData(payload);
      }, 2000);

      dispatch(registerUserAction(payload));
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="luggage"
          color={Colors.white}
          size={65}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <View style={styles.contentContainer}>
        <StepIndicatorComponent navigation={navigation} />

        <StepFormComponent Tab={Tab} formsFormik={formsFormik} />

        <HideWithKeyboard>
          <StepButtonComponent
            navigation={navigation}
            formsFormik={formsFormik}
          />
        </HideWithKeyboard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerIcon: { marginLeft: 10, marginTop: 30 },
  headerText: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 30,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    flex: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignUpScreen;
