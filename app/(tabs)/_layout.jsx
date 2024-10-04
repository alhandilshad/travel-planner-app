import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function Tablayout() {
  return (
    <Tabs>
        <Tabs.Screen name='mytrip' />
        <Tabs.Screen name='discover' />
        <Tabs.Screen name='profile' />
    </Tabs>
  )
}