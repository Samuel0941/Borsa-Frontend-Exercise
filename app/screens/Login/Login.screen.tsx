import { useFormik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import * as Yup from "yup";

import InputComponent from "../../components/Input/Input";
import { Colors } from "../../constants/colors";
import { ROUTE } from "../../constants/constants";
import { NotificationContext } from "../../providers/NotificationProvider";
import { useTypedSelector, useAppDispatch } from "../../redux/redux-hooks";
import { loginAction } from "../../redux/user/slice";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type FormType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const { setState: setNotificationState } = useContext(NotificationContext);

  const dispatch = useAppDispatch();
  const { login } = useTypedSelector((state) => state.user);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik<FormType>({
    initialValues: { password: "", email: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
  });

  useEffect(() => {
    if (login.successful) {
      setNotificationState({
        open: true,
        message: "Login Successful",
        severity: "success",
        position: "bottom",
      });

      navigation.replace(ROUTE.HOME);
    }

    if (login.error) {
      setNotificationState({
        open: true,
        message: login.error,
        severity: "error",
        position: "bottom",
      });
    }
  }, [login]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="luggage"
          color={Colors.white}
          size={65}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Login</Text>
      </View>

      <View style={styles.contentContainer}>
        <InputComponent
          label="Email"
          placeholder="email"
          keyboardType="email-address"
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          value={formik.values.email}
          errorMessage={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />

        <Input
          label="Password"
          placeholder="password"
          secureTextEntry={!passwordVisible}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
          errorMessage={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          rightIcon={{
            type: "font-awesome",
            name: passwordVisible ? "eye-slash" : "eye",
            color: "gray",
            backgroundColor: "lightgray",
            onPress: () => setPasswordVisible((e) => !e),
          }}
          style={{
            minWidth: "40%",
            height: 50,
            color: Colors.primary,
            paddingHorizontal: 10,
            fontSize: 15,
          }}
          labelStyle={{
            color: Colors.primary,
            fontSize: 16,
            marginBottom: 5,
          }}
          inputContainerStyle={{
            borderColor: Colors.primary,
            borderWidth: 1,
            borderRadius: 5,
          }}
          containerStyle={{
            backgroundColor: Colors.white,
          }}
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            title={"LOGIN"}
            type="clear"
            containerStyle={{
              backgroundColor: Colors.primary,
              width: SCREEN_WIDTH * 0.9,
              borderRadius: 10,
              paddingVertical: 5,
            }}
            titleStyle={{
              color: Colors.white,
            }}
            onPress={() => formik.submitForm()}
            loading={login.loading}
          />
        </View>

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
            Don't have an account?
          </Text>
          <Button
            type="clear"
            title={"Sign Up"}
            onPress={() => navigation.replace(ROUTE.SIGN_UP)}
            titleStyle={{
              textDecorationLine: "underline",
              color: Colors.primary,
            }}
          />
        </View>
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
    fontSize: 50,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 30,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 50,
    flex: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default LoginScreen;
