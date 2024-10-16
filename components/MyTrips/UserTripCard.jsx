import { View, Text } from 'react-native'
import React from 'react'

export default function UserTripCard({ trip, key }) {
    const tripData = JSON.parse(trip?.tripData)
  return (
    <View>
      <Text>{tripData?.locationInfo?.name}</Text>
    </View>
  )
}