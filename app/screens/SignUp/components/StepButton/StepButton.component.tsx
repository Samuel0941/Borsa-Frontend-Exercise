import { FC, useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Button, FAB, Icon } from "react-native-elements";
import { Colors } from "../../../../constants/colors";
import { useTypedSelector } from "../../../../redux/redux-hooks";
import { SIGN_UP_STEP_ROUTE } from "../../constants";
import { UseSignUpFormikResponseType } from "../../hooks/useSignUpFormik";
import { SignupContext } from "../../providers/SignupProvider";
import { ROUTE } from "../../../../constants/constants";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StepButtonComponent: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
  formsFormik: UseSignUpFormikResponseType;
}> = ({ navigation, formsFormik }) => {
  const { stepsCounter } = useContext(SignupContext);

  const { form1Formik, form2Formik, form3Formik } = formsFormik;

  const { registerUser } = useTypedSelector((state) => state.user);

  const AlreadyHaveAccount = () => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 20,
      }}
    >
      <Text
        style={{
          marginTop: 10,
        }}
      >
        Already have an account?
      </Text>
      <Button
        type="clear"
        title={"Sign In"}
        onPress={() => navigation.replace(ROUTE.LOGIN)}
        titleStyle={{
          textDecorationLine: "underline",
          color: Colors.primary,
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {
        {
          [0]: (
            <>
              <AlreadyHaveAccount />

              <FAB
                placement="right"
                color={Colors.primary}
                icon={
                  <Icon
                    name="arrow-right"
                    type="feather"
                    color={Colors.white}
                  />
                }
                onPress={() => form1Formik.submitForm()}
              />
            </>
          ),
          [1]: (
            <>
              <AlreadyHaveAccount />

              <FAB
                placement="left"
                color={Colors.white}
                icon={
                  <Icon
                    name="chevron-left"
                    type="feather"
                    color={Colors.white}
                  />
                }
                onPress={() => navigation.navigate(SIGN_UP_STEP_ROUTE.PERSONAL)}
                buttonStyle={{
                  backgroundColor: Colors.orange,
                }}
              />

              <FAB
                placement="right"
                color={Colors.primary}
                icon={
                  <Icon
                    name="arrow-right"
                    type="feather"
                    color={Colors.white}
                  />
                }
                onPress={() => form2Formik.submitForm()}
              />
            </>
          ),
          [2]: (
            <>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Button
                  title={"SIGN UP"}
                  type="clear"
                  containerStyle={{
                    backgroundColor: Colors.primary,
                    width: SCREEN_WIDTH * 0.8,
                    borderRadius: 10,
                    paddingVertical: 5,
                  }}
                  titleStyle={{
                    color: Colors.white,
                  }}
                  onPress={() => form3Formik.submitForm()}
                  loading={registerUser.loading}
                />
              </View>

              <AlreadyHaveAccount />

              <FAB
                placement="left"
                color={Colors.white}
                icon={
                  <Icon
                    name="chevron-left"
                    type="feather"
                    color={Colors.white}
                  />
                }
                buttonStyle={{
                  backgroundColor: Colors.orange,
                }}
                onPress={() => navigation.navigate(SIGN_UP_STEP_ROUTE.OTHER)}
              />
            </>
          ),
        }[stepsCounter]
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 150,
    // justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default StepButtonComponent;
