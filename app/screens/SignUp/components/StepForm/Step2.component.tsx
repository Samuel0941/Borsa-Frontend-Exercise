import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormikProps } from "formik";
import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import { Icon, Switch } from "react-native-elements";

import GooglePlaceAutocomplete from "../../../../components/GooglePlaceAutocomplete/GooglePlaceAutocomplete";
import { Colors } from "../../../../constants/colors";
import { Form2Type } from "../../hooks/useSignUpFormik";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Step2Component: React.FC<{ formik: FormikProps<Form2Type> }> = ({
  formik,
}) => {
  const [locationSearchVisible, setLocationSearchVisible] = useState(false);

  const onAddressSelect = (value: string) => {
    formik.setFieldValue("address", value);
    setLocationSearchVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flexGrow: 1,
      }}
    >
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

      {formik.touched.address && formik.errors.address && (
        <Text
          style={{
            color: "red",
            fontSize: 12,
            marginLeft: 15,
          }}
        >
          {formik.errors.address}
        </Text>
      )}

      <View style={{ marginBottom: 20 }}></View>

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

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
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

        <View
          style={{
            backgroundColor: Colors.lightBackground,
            width: 100,
            height: 100,
            borderRadius: 5,
            borderColor: Colors.placeholder,
            borderWidth: 1,
          }}
        >
          <Text style={{ color: Colors.primary, margin: 6 }}>Profile</Text>
          <Icon
            name="addfile"
            type="antdesign"
            color={Colors.placeholder}
            size={40}
          />
        </View>
      </View>

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
  );
};

export default Step2Component;
