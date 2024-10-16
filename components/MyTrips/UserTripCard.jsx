import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors';

export default function UserTripCard({ trip, key }) {
    const tripData = JSON.parse(trip?.tripData)
  return (
    <View style={{
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }}>
      <Image style={{width: 100, height: 100, borderRadius: 10}} source={{uri:'https://maps.gomaps.pro/maps/api/place/photo?photo_reference='+tripData?.locationInfo.photoRef+'&maxwidth=400&key=AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY'}}></Image>
      <View>
        <Text style={{fontFamily: 'outfit-medium', fontSize: 18}}>{tripData?.locationInfo?.name}</Text>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center'
        }}>
            <Text style={{fontFamily: 'outfit'}}>{moment(tripData?.startDate).format('DD MMM')+' To '+moment(tripData?.endDate).format('DD MMM')}</Text>
            <Text style={{fontFamily: 'outfit', fontSize: 17}}>{tripData?.traveler?.icon} {tripData?.traveler?.title}</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.PRIMARY, width: 200, padding: 7, borderRadius: 20, marginTop: 8}}>
          <Text style={{color: Colors.WHITE, textAlign: 'center'}}>See your Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}