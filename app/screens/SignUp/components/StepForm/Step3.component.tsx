import { View } from "react-native";
import InputComponent from "../../../../components/Input/Input";
import { FormikProps } from "formik";
import { Form3Type } from "../../hooks/useSignUpFormik";
import { Colors } from "../../../../constants/colors";

const Step3Component: React.FC<{ formik: FormikProps<Form3Type> }> = ({
  formik,
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flexGrow: 1,
      }}
    >
      <InputComponent
        label="Password"
        placeholder="password"
        keyboardType="visible-password"
        secureTextEntry={true}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        errorMessage={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""
        }
      />

      <InputComponent
        label="Confirm Password"
        placeholder="confirm password"
        keyboardType="visible-password"
        secureTextEntry={true}
        onChangeText={formik.handleChange("confirmPassword")}
        onBlur={formik.handleBlur("confirmPassword")}
        value={formik.values.confirmPassword}
        errorMessage={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : ""
        }
      />
    </View>
  );
};

export default Step3Component;
