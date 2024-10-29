import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import UserTripCard from "./UserTripCard";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { useRouter } from "expo-router";
import axios from "axios";

export default function UserTripList({ userTrips }) {
  const [placeImage, setPlaceImage] = useState(null);
  const sortedTrips = [...userTrips].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestTrip = JSON.parse(sortedTrips[0]?.tripData);

  useEffect(() => {
    const fetchPlaceImage = async () => {
      if (latestTrip?.locationInfo?.name) {
        const placeName = latestTrip.locationInfo.name;
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${placeName}&client_id=oZV24h3YrF-N6bvc1YPbrkw9L2dasbOs91LCIOlb5kY`
          );
          if (response.data.results.length > 0) {
            setPlaceImage(response.data.results[1].urls.regular);
          }
        } catch (error) {
          console.error("Error fetching image from Unsplash:", error);
        }
      }
    };

    fetchPlaceImage();
  }, [latestTrip]);

  const router = useRouter();
  return (
    <View>
      <View
        style={{
          paddingTop: 20,
          flex: 1,
        }}
      >
        {placeImage ? (
          <Image
            style={{ width: "100%", height: 240, borderRadius: 20 }}
            source={{ uri: placeImage }}
          />
        ) : (
          <Image
            source={require("@/assets/images/login.webp")}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 20,
            }}
          />
        )}
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            paddingTop: 5,
            paddingBottom: 5,
            flexWrap: "wrap",
          }}
        >
          {latestTrip?.locationInfo?.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "outfit" }}>
            {moment(latestTrip?.startDate).format("DD MMM") +
              " To " +
              moment(latestTrip?.endDate).format("DD MMM")}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
            {latestTrip?.traveler?.icon} {latestTrip?.traveler?.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/see-trip/see-plan",
              params: {
                latestTrip: JSON.stringify(latestTrip),
                date: sortedTrips[0]?.createdAt,
                id: sortedTrips[0]?.id
              },
            })
          }
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 13,
            borderRadius: 25,
            marginTop: 10,
          }}
        >
          <Text style={{ color: Colors.WHITE, textAlign: "center", fontFamily: 'outfit-medium' }}>
            See your Plan
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 20 }}>
        {sortedTrips?.slice(1).map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
