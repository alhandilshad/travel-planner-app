import { View, Text, Image } from "react-native";
import React from "react";
import UserTripCard from "./UserTripCard";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const sortedTrips = [...userTrips].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestTrip = JSON.parse(sortedTrips[0]?.tripData);
  
  console.log(sortedTrips[0]?.createdAt, 'date');

  const router = useRouter();
  return (
    <View>
      <View
        style={{
          paddingTop: 20,
          flex: 1,
        }}
      >
        {latestTrip?.locationInfo?.photoRef ? (
          <Image
            style={{ width: "100%", height: 240, borderRadius: 20 }}
            source={{
              uri:
                "https://maps.gomaps.pro/maps/api/place/photo?photo_reference=" +
                latestTrip?.locationInfo.photoRef +
                "&maxwidth=400&key=AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY",
            }}
          ></Image>
        ) : (
          <Image
            source={require("@/assets/images/login.webp")}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 20,
            }}
          ></Image>
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
                date: sortedTrips[0]?.createdAt
              },
            })
          }
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 13,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ color: Colors.WHITE, textAlign: "center" }}>
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
