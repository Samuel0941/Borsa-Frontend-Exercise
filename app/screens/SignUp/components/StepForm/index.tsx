import {
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { MaterialTopTabNavigationConfig } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
  TypedNavigator,
} from "@react-navigation/native";
import React, { FC, useContext } from "react";
import { StyleSheet } from "react-native";

import { SIGN_UP_STEP_ROUTE } from "../../constants";

import { FormikProps } from "formik";
import {
  Form1Type,
  Form2Type,
  Form3Type,
  UseSignUpFormikResponseType,
} from "../../hooks/useSignUpFormik";
import {
  SignupContext,
  StepsCounterType,
} from "../../providers/SignupProvider";
import Step1Component from "./Step1.component";
import Step2Component from "./Step2.component";
import Step3Component from "./Step3.component";

type TabProp = TypedNavigator<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
  ({
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    ...restWithDeprecated
  }: DefaultNavigatorOptions<
    ParamListBase,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap
  > &
    TabRouterOptions &
    MaterialTopTabNavigationConfig) => JSX.Element
>;

const Form1Wrapper: React.FC<{
  formik: FormikProps<Form1Type>;
}> = ({ formik }) => {
  return <Step1Component formik={formik} />;
};

const Form2Wrapper: React.FC<{
  formik: FormikProps<Form2Type>;
}> = ({ formik }) => {
  return <Step2Component formik={formik} />;
};

const Form3Wrapper: React.FC<{
  formik: FormikProps<Form3Type>;
}> = ({ formik }) => {
  return <Step3Component formik={formik} />;
};

const FormComponent: FC<{
  Tab: TabProp;
  formsFormik: UseSignUpFormikResponseType;
}> = ({ Tab, formsFormik }) => {
  const { setStepsCounter } = useContext(SignupContext);

  const { form1Formik, form2Formik, form3Formik } = formsFormik;

  return (
    <Tab.Navigator
      style={styles.formContainer}
      screenOptions={{
        animationEnabled: true,
      }}
      tabBar={(prop: MaterialTopTabBarProps) => {
        setStepsCounter(prop.state.index as StepsCounterType);

        return <></>;
      }}
    >
      <Tab.Screen
        options={{ swipeEnabled: false }}
        name={SIGN_UP_STEP_ROUTE.PERSONAL}
      >
        {() => <Form1Wrapper formik={form1Formik} />}
      </Tab.Screen>

      <Tab.Screen
        options={{ swipeEnabled: false }}
        name={SIGN_UP_STEP_ROUTE.OTHER}
      >
        {() => <Form2Wrapper formik={form2Formik} />}
      </Tab.Screen>

      <Tab.Screen
        options={{ swipeEnabled: false }}
        name={SIGN_UP_STEP_ROUTE.CREDENTIAL}
      >
        {() => <Form3Wrapper formik={form3Formik} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50,
    flex: 1,
    // backgroundColor: "white",
  },
});

export default FormComponent;
