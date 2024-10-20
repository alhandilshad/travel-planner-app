import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function UserTripCard({ trip, key }) {
  const tripData = JSON.parse(trip?.tripData);
  console.log(trip?.createdAt);
  

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
      {tripData?.locationInfo?.photoRef ? (
        <Image
          style={{ width: 100, height: 100, borderRadius: 10 }}
          source={{
            uri:
              "https://maps.gomaps.pro/maps/api/place/photo?photo_reference=" +
              tripData?.locationInfo.photoRef +
              "&maxwidth=400&key=AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY",
          }}
        ></Image>
      ) : (
        <Image
          source={require("@/assets/images/login.webp")}
          style={{
            width: "100%",
            height: 450,
          }}
        ></Image>
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
              params: { latestTrip: JSON.stringify(tripData) },
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
          <Text style={{ color: Colors.WHITE, textAlign: "center" }}>
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
