import { FormikProps } from "formik";
import React from "react";
import { View } from "react-native";

import InputComponent from "../../../../components/Input/Input";
import { Form1Type } from "../../hooks/useSignUpFormik";

const Step1Component: React.FC<{ formik: FormikProps<Form1Type> }> = ({
  formik,
}) => {
  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      <InputComponent
        label="Full Name"
        placeholder="full name"
        keyboardType="ascii-capable"
        onChangeText={formik.handleChange("fullName")}
        onBlur={formik.handleBlur("fullName")}
        value={formik.values.fullName}
        errorMessage={
          formik.touched.fullName && formik.errors.fullName
            ? formik.errors.fullName
            : ""
        }
      />

      <InputComponent
        label="Email"
        placeholder="email"
        keyboardType="email-address"
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        errorMessage={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
      />

      <InputComponent
        label="User Name"
        placeholder="user name"
        keyboardType="ascii-capable"
        onChangeText={formik.handleChange("userName")}
        onBlur={formik.handleBlur("userName")}
        value={formik.values.userName}
        errorMessage={
          formik.touched.userName && formik.errors.userName
            ? formik.errors.userName
            : ""
        }
      />
    </View>
  );
};

export default Step1Component;
