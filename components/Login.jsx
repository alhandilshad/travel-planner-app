import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {
    const router  = useRouter()
  return (
    <View>
      <Image source={require('@/assets/images/login.webp')} style={{
        width:'100%',
        height: 450,
      }}></Image>
      <View style={styles.container}>
        <Text style={{
            fontSize: 28,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            marginTop: 10,
        }}>AI Travel Planner</Text>
        <Text style={{
            fontSize: 16,
            fontFamily: 'outfit',
            textAlign: 'center',
            color: Colors.GRAY,
            marginTop: 10,
        }}>Discover your next adventure effortlessly.Personalized itenories of your fingertips. travel smarter with AI driven insights</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('auth/sign-in')}>
            <Text style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit',
                fontSize: 18,
            }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        padding: 25,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50,
        marginTop: '20%'
    }
})