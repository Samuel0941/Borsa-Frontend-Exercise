import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";
import { useAppDispatch, useTypedSelector } from "../../redux/redux-hooks";
import { getUsersAction } from "../../redux/user/slice";
import { User } from "../../redux/user/type";
import UserCardComponent from "./components/UserCard";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon } from "react-native-elements";

const HomeScreen: FC<{
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { users } = useTypedSelector((state) => state.user);

  const [list, setList] = useState<User[]>([]);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Infinity);

  useEffect(() => {
    if (!users.loading && users.successful) {
      setIsFirstPageReceived(false);

      setList([...list, ...users.payload.data]);

      if (maxPage === Infinity) {
        const pages = Math.ceil(users.payload.total / 10);
        setMaxPage(pages);
      }
    }
  }, [users]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    if (!users.loading) dispatch(getUsersAction({ page }));
  };

  const onEndReached = () => {
    if (!users.loading) {
      const nextPage = page + 1;

      if (nextPage <= maxPage) setPage(page + 1);
    }
  };

  const ListEndLoader = () => {
    if (users.loading) {
      return <ActivityIndicator size={"large"} color={Colors.orange} />;
    }
  };

  return (
    <View style={styles.container}>
      {isFirstPageReceived && users.loading ? (
        <ActivityIndicator size={"large"} color={Colors.orange} />
      ) : users.error && list.length === 0 ? (
        <View>
          <Button
            type="clear"
            title={"No Data, try refreshing again"}
            titleStyle={{ color: Colors.placeholder, fontSize: 12 }}
            icon={<Icon name="refresh" />}
            onPress={fetchData}
          />
        </View>
      ) : (
        <SafeAreaView>
          <FlatList
            data={list}
            renderItem={({ item }) => <UserCardComponent data={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={ListEndLoader} // Loader when loading next page.
            onEndReached={onEndReached}
            onEndReachedThreshold={0}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    padding: 10,
  },
  header: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {},
  headerText: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: "bold",
  },
  // listContainer: {
  //   backgroundColor: Colors.lightBackground,
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   margin: 10,
  //   borderRadius: 15,
  // },
});

export default HomeScreen;
