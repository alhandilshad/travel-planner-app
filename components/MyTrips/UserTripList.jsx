import { View, Text, Image } from 'react-native'
import React from 'react'
import UserTripCard from './UserTripCard';

export default function UserTripList({ userTrips }) {
  console.log(userTrips.length, 'usertrips');
  const latestTrip = JSON.parse(userTrips[0].tripData);
  return (
    <View>
      <View>
        <Image style={{width: '100%', height: 240, borderRadius: 30}} source={{uri:'https://maps.gomaps.pro/maps/api/place/photo?photo_reference='+latestTrip?.locationInfo.photoRef+'&maxwidth=400&key=AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY'}}></Image>
      </View>
      <View>
        {userTrips?.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  )
}