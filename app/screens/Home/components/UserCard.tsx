import { FC, memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { User } from "../../../redux/user/type";

const UserCardComponent: FC<{ data: User }> = ({ data }) => {
  const {
    _id,
    address,
    email,
    firstName,
    lastName,
    isBuyer,
    userName,
    profilePic,
  } = data;

  const fullName = firstName + " " + lastName;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 4,
          backgroundColor: "gree",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 20,
          }}
        >
          {fullName}
        </Text>

        <Text
          style={{
            color: Colors.placeholder,
          }}
        >
          {email}
        </Text>

        <Text
          style={{
            color: Colors.placeholder,
          }}
        >
          {address}
        </Text>

        {isBuyer ? (
          <Text
            style={{
              color: Colors.orange,
            }}
          >
            Buyer
          </Text>
        ) : null}
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={{
            uri: profilePic,
          }}
          style={{
            width: 100,
            height: 120,
            borderRadius: 10,
            backgroundColor: Colors.placeholder,
          }}
        />

        <Text>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    marginBottom: 20,
    height: 200,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.7,
  },
  contentContainer: {
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: 50,
    flex: 7,
    margin: 10,
    borderRadius: 15,
  },
});

export default memo(UserCardComponent);
