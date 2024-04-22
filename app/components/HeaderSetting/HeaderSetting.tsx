import { Picker } from "@react-native-picker/picker";
import { Pressable, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { FC, useRef } from "react";

import { Colors } from "../../constants/colors";
import { ROUTE } from "../../constants/constants";
import { resetLocalizedData } from "../../utils/global.util";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { resetLoginAction } from "../../redux/user/slice";
import { useAppDispatch } from "../../redux/redux-hooks";

const HeaderSettingComponent: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const ref = useRef<any>();

  const dispatch = useAppDispatch();

  const openPicker = () => {
    ref.current.focus();
  };

  const closePicker = () => {
    ref.current.blur();
  };

  const onSelect = (value: any, index: number) => {
    if (value === "Profile") {
      navigation.navigate(ROUTE.PROFILE);
    } else if (value === "Logout") {
      dispatch(resetLoginAction());
      resetLocalizedData();

      navigation.replace(ROUTE.LOGIN);
    }
  };

  return (
    <View
      style={{
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 5,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          color: Colors.primary,
          fontWeight: "700",
        }}
      >
        Home
      </Text>

      <View>
        <Picker
          mode="dropdown"
          style={{
            width: 0,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            top: 10,
            left: 10,
          }}
          ref={ref}
          onValueChange={(value, index) => onSelect(value, index)}
        >
          <Picker.Item
            label=""
            value=""
            style={{
              color: Colors.placeholder,
            }}
          />

          <Picker.Item label="Profile" value="Profile" />

          <Picker.Item label="Logout" value="Logout" />
        </Picker>

        <View
          style={{
            position: "absolute",
            top: 23,
            right: 0,
            backgroundColor: Colors.white,
          }}
        >
          <Pressable onPress={openPicker}>
            <Icon name="settings" size={20} color={Colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HeaderSettingComponent;
