import { View, Text, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

export default function seeplan() {
  const item = useLocalSearchParams();
  console.log(item.latestTrip, "item");

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
  }, []);

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
        tripPlaceLatitude: latestTrip?.locationInfo?.coordinates?.lat,
        tripPlaceLongitude: latestTrip?.locationInfo?.coordinates?.lng,
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
        {latestTrip?.locationInfo?.photoRef ? (
            <Image style={{width: '100%', height: 240}} source={{uri:'https://maps.gomaps.pro/maps/api/place/photo?photo_reference='+latestTrip?.locationInfo?.photoRef+'&maxwidth=400&key=AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY'}}></Image>
        ):(
            <Image source={require('@/assets/images/login.webp')} style={{
                width:'100%',
                height: 450,
              }}></Image>
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