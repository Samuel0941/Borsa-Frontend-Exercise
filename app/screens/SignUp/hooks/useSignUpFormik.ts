import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

export type Form1Type = {
  email: string;
  fullName: string;
  userName: string;
};

export type Form2Type = {
  address: string;
  isBuyer: boolean;
  profilePic: string;
};

export type Form3Type = {
  password: string;
  confirmPassword: string;
};

const form1ValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .test(
      "fullName",
      "Please enter valid full name with first and last names",
      (value: any) => {
        if (!value) return false;

        const names = value.trim().split(" ");

        if (names.length < 2 || names.length > 2) return false;

        return true;
      }
    )
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  userName: Yup.string().required("Required"),
});

const form2ValidationSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  isBuyer: Yup.boolean(),
  profilePic: Yup.string().required("Required"),
});

const form3ValidationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .when("password", (value, schema) =>
      value[0]
        ? schema
            .required("Required")
            .oneOf([Yup.ref("password")], "Passwords must match")
        : schema.required("Required")
    ),
});

export type UseSignUpFormikProp = {
  onForm1Submit: (values: Form1Type) => void;
  onForm2Submit: (values: Form2Type) => void;
  onForm3Submit: (values: Form3Type) => void;
};

export type UseSignUpFormikResponseType = {
  form1Formik: FormikProps<Form1Type>;
  form2Formik: FormikProps<Form2Type>;
  form3Formik: FormikProps<Form3Type>;
};

const useSignUpFormik = ({
  onForm1Submit,
  onForm2Submit,
  onForm3Submit,
}: UseSignUpFormikProp): UseSignUpFormikResponseType => {
  const form1Formik = useFormik<Form1Type>({
    initialValues: {
      email: "email@gmail.com",
      fullName: "full name",
      userName: "user name",
    },
    validationSchema: form1ValidationSchema,
    onSubmit: (values) => onForm1Submit(values),
  });

  const form2Formik = useFormik<Form2Type>({
    initialValues: {
      address: "",
      isBuyer: false,
      profilePic:
        "https://miro.medium.com/v2/resize:fit:1400/0*0fClPmIScV5pTLoE.jpg",
    },
    validationSchema: form2ValidationSchema,
    onSubmit: (values) => onForm2Submit(values),
  });

  const form3Formik = useFormik<Form3Type>({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: form3ValidationSchema,
    onSubmit: (values) => onForm3Submit(values),
  });

  return { form1Formik, form2Formik, form3Formik };
};

export default useSignUpFormik;
