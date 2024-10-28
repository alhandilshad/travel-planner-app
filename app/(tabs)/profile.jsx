import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function profile() {
  const router = useRouter() // Assuming useRouter hook is imported from 'expo-router'
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={() => router.replace('/auth/sign-in')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}