import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import axios from "axios";

export default function UserTripCard({ trip, key }) {
  const [placeImage, setPlaceImage] = useState(null);
  const tripData = JSON.parse(trip?.tripData);
  console.log(trip?.createdAt);
  
  useEffect(() => {
    const fetchPlaceImage = async () => {
      if (tripData?.locationInfo?.name) {
        const placeName = tripData.locationInfo.name;
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
  }, [trip]);

  const router = useRouter();
  return (
    <>
    <View
      key={key}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      {placeImage ? (
          <Image
            style={{ width: 100, height: 100, borderRadius: 20 }}
            source={{ uri: placeImage }}
          />
        ) : (
          <Image
            source={require("@/assets/images/login.webp")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
            }}
          />
        )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
            flexWrap: "wrap",
          }}
        >
          {tripData?.locationInfo?.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ fontFamily: "outfit" }}>
            {moment(tripData?.startDate).format("DD MMM") +
              " To " +
              moment(tripData?.endDate).format("DD MMM")}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
            {tripData?.traveler?.icon} {tripData?.traveler?.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/see-trip/see-plan",
              params: {
                latestTrip: JSON.stringify(tripData),
                date: trip?.createdAt
              },
            })
          }
          style={{
            backgroundColor: Colors.PRIMARY,
            width: 200,
            padding: 7,
            borderRadius: 20,
            marginTop: 8,
          }}
        >
          <Text style={{ color: Colors.WHITE, textAlign: "center", fontFamily: 'outfit-medium' }}>
            See your Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View
    style={{
      width: "100%",
      height: 1,
      backgroundColor: "#e0e0e0", // Light gray color for the line
      marginVertical: 20, // Vertical spacing for the line
    }}
  ></View>
  </>
  );
}
