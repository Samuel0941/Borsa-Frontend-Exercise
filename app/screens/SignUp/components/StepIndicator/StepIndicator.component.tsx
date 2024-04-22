import { FC, useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../../../constants/colors";
import { SignupContext } from "../../providers/SignupProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StepIndicatorComponent: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const { stepsCounter } = useContext(SignupContext);

  const isSelected = (index: number) => {
    return index <= stepsCounter
      ? {
          item: styles.stepItemSelected,
          text: styles.stepItemTextSelected,
        }
      : {
          item: styles.stepItem,
          text: styles.stepItemText,
        };
  };

  return (
    <View style={styles.stepsBox}>
      <View
        style={isSelected(0).item}
        // onPress={() => navigation.navigate(SIGN_UP_STEP_ROUTE.PERSONAL)}
      >
        <Text style={isSelected(0).text}>1</Text>
      </View>

      <View
        style={isSelected(1).item}
        // onPress={() => navigation.navigate(SIGN_UP_STEP_ROUTE.OTHER)}
      >
        <Text style={isSelected(1).text}>2</Text>
      </View>

      <View
        style={isSelected(2).item}
        // onPress={() => navigation.navigate(SIGN_UP_STEP_ROUTE.CREDENTIAL)}
      >
        <Text style={isSelected(2).text}>3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 15,
    position: "absolute",
    zIndex: 1,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    top: -25,
  },
  stepItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightBackground,
    borderRadius: 25,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderTopColor: Colors.orange,
    borderBottomColor: Colors.orange,
  },
  stepItemText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  stepItemSelected: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    color: Colors.white,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  stepItemTextSelected: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StepIndicatorComponent;
