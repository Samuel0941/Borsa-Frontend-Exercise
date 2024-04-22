import { useFormik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import * as Yup from "yup";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import GooglePlaceAutocomplete from "../../components/GooglePlaceAutocomplete/GooglePlaceAutocomplete";
import InputComponent from "../../components/Input/Input";
import { Colors } from "../../constants/colors";
import { ROUTE } from "../../constants/constants";
import { NotificationContext } from "../../providers/NotificationProvider";
import { useAppDispatch, useTypedSelector } from "../../redux/redux-hooks";
import {
  resetUpdateProfileAction,
  updateProfileAction,
} from "../../redux/user/slice";
import { getUserData } from "../../utils/global.util";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

type FormType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  isBuyer: boolean;
  address: string;
  profilePic: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  isBuyer: Yup.boolean(),
  address: Yup.string().required("Required"),
  profilePic: Yup.string().required("Required"),
});

const ProfileScreen: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const { setState: setNotificationState } = useContext(NotificationContext);

  const dispatch = useAppDispatch();
  const { updateProfile } = useTypedSelector((state) => state.user);

  const [locationSearchVisible, setLocationSearchVisible] = useState(false);

  const onAddressSelect = (value: string) => {
    formik.setFieldValue("address", value);
    setLocationSearchVisible(false);
  };

  const formik = useFormik<FormType>({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      isBuyer: false,
      address: "",
      profilePic: "",
    },
    validationSchema,
    onSubmit: (values) => {
      getUserData().then(({ _id }: any) => {
        if (_id)
          dispatch(
            updateProfileAction({
              id: _id,
              body: values,
            })
          );
      });
    },
  });

  useEffect(() => {
    getUserData()
      .then((result) => {
        formik.setFieldValue("firstName", result?.firstName);
        formik.setFieldValue("lastName", result?.lastName);
        formik.setFieldValue("userName", result?.userName);
        formik.setFieldValue("email", result?.email);
        formik.setFieldValue("isBuyer", result?.isBuyer);
        formik.setFieldValue("address", result?.address);
        formik.setFieldValue("profilePic", result?.profilePic);
      })
      .catch((error) => {
        console.log("[GET ERROR] ", error);
      });
  }, []);

  useEffect(() => {
    if (updateProfile.successful) {
      setNotificationState({
        open: true,
        message: "Update Successful",
        severity: "success",
        position: "bottom",
      });

      dispatch(resetUpdateProfileAction());
    }

    if (updateProfile.error) {
      setNotificationState({
        open: true,
        message: updateProfile.error,
        severity: "error",
        position: "bottom",
      });
    }
  }, [updateProfile]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="notebook-edit-outline"
          color={Colors.white}
          size={40}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Update your profile</Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView>
          <InputComponent
            label="First Name"
            placeholder="firstName"
            onChangeText={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            value={formik.values.firstName}
            errorMessage={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ""
            }
          />

          <InputComponent
            label="Last Name"
            placeholder="lastName"
            onChangeText={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            value={formik.values.lastName}
            errorMessage={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ""
            }
          />

          <InputComponent
            label="User Name"
            placeholder="userName"
            onChangeText={formik.handleChange("userName")}
            onBlur={formik.handleBlur("userName")}
            value={formik.values.userName}
            errorMessage={
              formik.touched.userName && formik.errors.userName
                ? formik.errors.userName
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
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          {/* IS BUYER */}
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              marginBottom: 5,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Is Buyer
          </Text>

          <View style={{ alignSelf: "flex-start", marginLeft: 20 }}>
            <Switch
              value={formik.values.isBuyer}
              onTouchEnd={(e) => {
                formik.setFieldValue("isBuyer", !formik.values.isBuyer);
              }}
              style={{
                borderColor: Colors.orange,
              }}
            />
          </View>

          {/* ADDRESS */}
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              marginBottom: 5,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Address
          </Text>

          <Pressable
            onPress={() => setLocationSearchVisible(true)}
            style={{
              height: 50,
              paddingHorizontal: 10,
              marginHorizontal: 10,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.primary,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color:
                  formik.values.address !== ""
                    ? Colors.primary
                    : Colors.placeholder,
              }}
            >
              {formik.values.address || "address"}
            </Text>
          </Pressable>

          {/* PROFILE PIC */}
          {formik.values.profilePic !== "" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 20,
              }}
            >
              <Image
                source={{
                  uri: formik.values.profilePic,
                }}
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 10,
                  marginHorizontal: 20,
                }}
              />
            </View>
          )}

          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Button
              title={"UPDATE"}
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
              loading={updateProfile.loading}
            />
          </View>
        </ScrollView>

        <Modal visible={locationSearchVisible} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
            <View
              style={{
                zIndex: 2000,
                width: SCREEN_WIDTH * 0.85,
                padding: 5,
                minHeight: 100,
                maxHeight: SCREEN_HEIGHT * 0.7,
                borderRadius: 5,
                backgroundColor: Colors.white,
              }}
            >
              <View>
                <Pressable
                  onPress={() => setLocationSearchVisible(false)}
                  style={{ alignSelf: "flex-end" }}
                >
                  <MaterialCommunityIcons name="close-circle" size={25} />
                </Pressable>
              </View>
              <GooglePlaceAutocomplete
                onSelect={(value) => onAddressSelect(value)}
              />
            </View>
          </View>
        </Modal>
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
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerIcon: { marginLeft: 10 },
  headerText: {
    color: Colors.white,
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 20,
  },
  contentContainer: {
    flex: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 15,
  },
});

export default ProfileScreen;
