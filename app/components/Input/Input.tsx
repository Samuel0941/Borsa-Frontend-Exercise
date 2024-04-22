import { FC } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { InputPropType } from "./Input.util";
import { Colors } from "../../constants/colors";

const InputComponent: FC<InputPropType> = ({ ...rest }) => {
  return (
    <Input
      labelStyle={styles.labelStyle}
      style={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={styles.containerStyle}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: Colors.primary,
    minWidth: "40%",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
  },
  labelStyle: {
    color: Colors.primary,
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  containerStyle: {
    backgroundColor: Colors.white,
  },
});

export default InputComponent;
