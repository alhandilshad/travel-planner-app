import { View, Text, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import axios from "axios";

export default function seeplan() {
  const [placeImage, setPlaceImage] = useState(null);
  const item = useLocalSearchParams();

  const navigation = useNavigation();
  const router = useRouter();

  const latestTrip = item?.latestTrip ? JSON.parse(item.latestTrip) : {};

  const formattedDate = item?.date
  ? moment(parseInt(item.date)).format("DD MMM YYYY, hh:mm A")
  : "Date not available";

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.WHITE
    });
    const fetchPlaceImage = async () => {
      if (latestTrip?.locationInfo?.name) {
        const placeName = latestTrip.locationInfo.name;
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${placeName}&client_id=oZV24h3YrF-N6bvc1YPbrkw9L2dasbOs91LCIOlb5kY`
          );
          if (response.data.results.length > 0) {
            setPlaceImage(response.data.results[0].urls.regular);
          }
        } catch (error) {
          console.error("Error fetching image from Unsplash:", error);
        }
      }
    };

    fetchPlaceImage();
  }, [latestTrip]);

  const handleDeleteTrip = () => {}

  const handleSeeMap = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Unable to access location');
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({});
    router.push({
      pathname: "/see-trip/see-map",
      params: {
        tripPlace: JSON.stringify(latestTrip),
        currentLatitude: userLocation.coords.latitude,
        currentLongitude: userLocation.coords.longitude,
      },
    })
  };

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
        {placeImage ? (
          <Image
            style={{ width: '100%', height: 240 }}
            source={{ uri: placeImage }}
          />
        ) : (
          <Image
            source={require("@/assets/images/login.webp")}
            style={{
              width: '100%',
              height: 240,
            }}
          />
        )}
      <View
        style={{
          backgroundColor: Colors.WHITE,
          marginTop: -20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: "100%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {latestTrip?.locationInfo?.name}
        </Text>
        <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 18,
                    color: Colors.GRAY,
                }}>{moment(latestTrip?.startDate).format('DD MMM')+' To '+moment(latestTrip?.endDate).format('DD MMM')+'  '}({ latestTrip?.totalDays } days)</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {latestTrip?.traveler?.people}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {latestTrip?.traveler?.icon} {latestTrip?.traveler?.title}
          </Text>
        </View>
        <Text style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 10,
        }}>{latestTrip?.traveler?.desc}</Text>
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            marginTop: 10,
        }}>Budget : {latestTrip?.budget?.title} {latestTrip?.budget?.icon}</Text>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop: 10,
        }}>{latestTrip?.budget?.desc}</Text>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
          marginTop: 15,
          color: Colors.GRAY,
        }}>Trip placed at : {formattedDate}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}
        >
          <TouchableOpacity onPress={() => handleDeleteTrip} style={{
            backgroundColor: 'red',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 22,
            alignItems: 'center',
          }}>
            <Text style={{
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>Delete Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSeeMap} style={{
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 22,
            alignItems: 'center',
          }}>
            <Text style={{
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>See Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}