import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function SeePlan() {
  const item = useLocalSearchParams(); // Get the current location and trip place details from item
  const navigation = useNavigation();

  const currentLocation = {
    latitude: parseFloat(item?.currentLatitude), // Ensure latitude is a float
    longitude: parseFloat(item?.currentLongitude),
  };

  const tripPlaceLocation = {
    latitude: parseFloat(item?.tripPlaceLatitude), // Ensure trip location latitude is a float
    longitude: parseFloat(item?.tripPlaceLongitude),
  };

  const [routeCoords, setRouteCoords] = useState([]);


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    getRouteDirections();
  }, []);

  const getRouteDirections = async () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${tripPlaceLocation.latitude},${tripPlaceLocation.longitude}`;
    const apiKey = "AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY"; // Replace with your Google Maps API Key

    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${apiKey}`
      );

      if (response.data.routes.length) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoords(points);
      }
    } catch (error) {
      console.error("Error fetching directions: ", error);
    }
  };

  // Function to decode polyline
  const decodePolyline = (t, e = 5) => {
    let points = [];
    let lat = 0, lng = 0;
    let factor = Math.pow(10, e);

    for (let index = 0, len = t.length; index < len;) {
      let shift = 0, result = 0, byte = null;
      do {
        byte = t.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0, result = 0;
      do {
        byte = t.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({
        latitude: lat / factor,
        longitude: lng / factor,
      });
    }

    return points;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Show Map */}
      <MapView
        style={{ width, height: height * 0.6 }}
        initialRegion={{
          latitude: (currentLocation.latitude + tripPlaceLocation.latitude) / 2,
          longitude: (currentLocation.longitude + tripPlaceLocation.longitude) / 2,
          latitudeDelta: Math.abs(currentLocation.latitude - tripPlaceLocation.latitude) * 2,
          longitudeDelta: Math.abs(currentLocation.longitude - tripPlaceLocation.longitude) * 2,
        }}
      >
        {/* Marker for Current Location */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
        />

        {/* Marker for Trip Place */}
        <Marker
          coordinate={tripPlaceLocation}
          title="Trip Place"
        />

        {/* Draw Polyline between the two locations */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={Colors.PRIMARY}
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
}
