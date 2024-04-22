import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-virtualized-view";

import { Colors } from "../../constants/colors";
import { GOOGLE_API_KEY } from "../../constants/constants";

type Props = {
  onSelect: (value: string) => void;
};

const GooglePlacesInput: React.FC<Props> = ({ onSelect }) => {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <GooglePlacesAutocomplete
        placeholder="search location..."
        minLength={2}
        onPress={(data, details = null) => {
          onSelect(data.description);
        }}
        onFail={(error) => console.log("ERROR ", error)}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          types: ["(regions)"],
        }}
        renderDescription={(row) => {
          // Customize the suggestion format (state, country)
          return `${row.structured_formatting.main_text}, ${row.structured_formatting.secondary_text}`;
        }}
        styles={{
          textInputContainer: {
            height: 40,
          },
          textInput: {
            fontSize: 15,
            color: Colors.primary,
          },
        }}
        // currentLocation={true}
        // currentLocationLabel="Current Location Label"
      />
    </ScrollView>
  );
};

export default GooglePlacesInput;
