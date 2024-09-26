import { View, Text, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function signIn() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={{
        padding: 25,
        paddingTop: 80,
        backgroundColor: Colors.WHITE,
        height: '100%',
    }}>
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold'
      }}>Let's Sign You In</Text>
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit',
        color: Colors.GRAY,
        marginTop: 20
      }}>Welcome Back</Text>
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit',
        color: Colors.GRAY,
        marginTop: 20
      }}>You've been missed</Text>

      <View>
        <Text>Email</Text>
        <TextInput placeholder='Enter email' />
      </View>
    </View>
  )
}