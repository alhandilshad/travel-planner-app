import React from "react";
import { View, Dimensions, Text, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function SeePlan() {
  const item = useLocalSearchParams();

  const trip = JSON.parse(item?.tripPlace)
  
  const navigation = useNavigation();

  const tripPlaceLocation = {
    latitude: parseFloat(trip?.locationInfo?.coordinates?.latitude),
    longitude: parseFloat(trip?.locationInfo?.coordinates?.longitude),
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Show Map centered at the Trip Place location */}
      <MapView
        style={{ width, height }}
        initialRegion={{
          latitude: tripPlaceLocation.latitude,
          longitude: tripPlaceLocation.longitude,
          latitudeDelta: 0.05, // Adjust zoom level
          longitudeDelta: 0.05, // Adjust zoom level
        }}
      >
        <Marker
          coordinate={tripPlaceLocation}
          title={trip?.locationInfo?.name}
        />
      </MapView>
    </View>
  );
}