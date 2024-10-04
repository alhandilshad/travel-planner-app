import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function signIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    const navigation = useNavigation();

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const storeUserData = async (userData) => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log('User data stored');
      } catch (error) {
        console.log('Error storing user data:', error);
      }
    };

    const onSignIn = () => {
      if (!email ||!password) {
        ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          storeUserData(userCredential.user);
          router.replace('/mytrip')
        })
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          console.log('Error signing in with email and password:', errorCode);
          if(errorCode == 'auth/invalid-credential'){
            ToastAndroid.show('Invalid email or password', ToastAndroid.LONG);
          }
        });
    }

  return (
    <View style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: '100%',
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold',
        marginTop: 30,
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
        marginTop: 10
      }}>You've been missed</Text>

      <View style={{
        marginTop: 50,
      }}>
        <Text style={{fontFamily: 'outfit'}}>Email</Text>
        <TextInput placeholder='Enter email' style={styles.input} onChangeText={(value) => setEmail(value)} />
      </View>

      <View style={{
        marginTop: 20,
      }}>
        <Text style={{fontFamily: 'outfit'}}>Password</Text>
        <TextInput placeholder='Enter password' secureTextEntry={true} style={styles.input} onChangeText={(value) => setPassword(value)} />
      </View>

      <TouchableOpacity onPress={onSignIn} style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        borderRadius: 15,
        marginTop: 50,
      }}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
        }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        color: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
      }}>
        <Text style={{
          color: Colors.PRIMARY,
          textAlign: 'center',
        }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  }
})