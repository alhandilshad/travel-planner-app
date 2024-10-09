import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function OptionCard({option, selected}) {
  return (
    <View style={[{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 15,
    },selected?.id==option?.id&&{borderWidth:2}]}>
      <View>
        <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold'
        }}>{option?.title}</Text>
        <Text style={{
            fontSize: 17,
            fontFamily: 'outfit',
            color: Colors.GRAY
        }}>{option?.desc}</Text>
      </View>
      <Text style={{
        fontSize: 40
      }}>{option?.icon}</Text>
    </View>
  )
}