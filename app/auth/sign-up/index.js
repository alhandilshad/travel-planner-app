import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

export default function signUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setfullName] = useState();
  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = () => {
    if (!email ||!password ||!fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG)
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Create New Account
      </Text>

      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Full Name</Text>
        <TextInput placeholder="Enter full name" style={styles.input} onChangeText={(value) => setfullName(value)} />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput placeholder="Enter email" style={styles.input} onChangeText={(value) => setEmail(value)} />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity onPress={onCreateAccount} style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        borderRadius: 15,
        marginTop: 50,
      }}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
        }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={{
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
        }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  }
});
