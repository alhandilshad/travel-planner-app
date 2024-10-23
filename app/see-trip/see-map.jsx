import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function SeePlan() {
  const item = useLocalSearchParams();
  const navigation = useNavigation();

  const currentLocation = {
    latitude: parseFloat(item?.currentLatitude),
    longitude: parseFloat(item?.currentLongitude),
  };

  const tripPlaceLocation = {
    latitude: parseFloat(item?.tripPlaceLatitude),
    longitude: parseFloat(item?.tripPlaceLongitude),
  };

  const [routeCoords, setRouteCoords] = useState([]);
  const [distanceInfo, setDistanceInfo] = useState([]); // Store distances for all modes

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    getRouteDirections(); // Fetch the route and distance data when the component mounts
  }, []);

  const getRouteDirections = async () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${tripPlaceLocation.latitude},${tripPlaceLocation.longitude}`;
    const apiKey = "AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY"; // Replace with your Google Maps API key
  
    try {
      // Fetching distance for different modes of transportation
      const [carResponse, motorcycleResponse, walkResponse] = await Promise.all([
        axios.get(
          `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&mode=driving&key=${apiKey}`
        ),
        axios.get(
          `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&mode=bicycling&key=${apiKey}`
        ),
        axios.get(
          `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&mode=walking&key=${apiKey}`
        ),
      ]);
  
      // Initialize distances
      const distances = {
        car: null,
        bike: null,
        walk: null,
      };
  
      // Check and set distances for each mode
      if (carResponse.data.routes && carResponse.data.routes.length > 0) {
        distances.car = carResponse.data.routes[0].legs[0].distance.text;
        const points = decodePolyline(carResponse.data.routes[0].overview_polyline.points);
        setRouteCoords(points);
      }
  
      if (motorcycleResponse.data.routes && motorcycleResponse.data.routes.length > 0) {
        distances.bike = motorcycleResponse.data.routes[0].legs[0].distance.text;
      }
  
      if (walkResponse.data.routes && walkResponse.data.routes.length > 0) {
        distances.walk = walkResponse.data.routes[0].legs[0].distance.text;
      }
  
      setDistanceInfo(distances);
    } catch (error) {
      console.error("Error fetching directions: ", error);
      // Optionally, you can set a message for the user if there's an error
      setDistanceInfo({ car: "Error fetching data", bike: "Error fetching data", walk: "Error fetching data" });
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
      {/* Map View */}
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
        <Marker coordinate={currentLocation} title="Your Location" />

        {/* Marker for Trip Place */}
        <Marker coordinate={tripPlaceLocation} title="Trip Place" />

        {/* Polyline between the two locations */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor={Colors.PRIMARY} strokeWidth={5} />
        )}
      </MapView>

      {/* Distance Information */}
      <View style={{ padding: 20 }}>
        {distanceInfo.car && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Distance by car: {distanceInfo.car}
          </Text>
        )}
        {distanceInfo.bike && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Distance by bike: {distanceInfo.bike}
          </Text>
        )}
        {distanceInfo.walk && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Distance walking: {distanceInfo.walk}
          </Text>
        )}
        {Object.keys(distanceInfo).length === 0 && (
          <Text>No distance available</Text>
        )}
      </View>
    </View>
  );
}