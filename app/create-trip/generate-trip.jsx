import { View, Text, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Colors } from '../../constants/Colors'
import { CreateTripContext } from '../../context/CreateTripContext';

export default function generateTrip() {
    const {tripData, settripData}=useContext(CreateTripContext);
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        textAlign: 'center'
      }}>Please Wait...</Text>

      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
      }}>We are working to generate your trip.</Text>

      <Image style={{
        width: '100%',
        height: 300,
      }} source={require('../../assets/images/plane.gif')} />

      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 20,
        textAlign: 'center',
      }}>Do not go back</Text>
    </View>
  )
}