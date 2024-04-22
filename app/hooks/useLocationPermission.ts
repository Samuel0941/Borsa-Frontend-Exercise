import * as Location from "expo-location";

const useLocationPermission = () => {
  const askPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const backPerm = await Location.requestBackgroundPermissionsAsync();

      if (backPerm.status !== "granted") {
        return;
      }
    })();
  };

  return askPermission;
};

export default useLocationPermission;
