import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../configs/FirebaseConfig";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function SignUp() {
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

  const onCreateAccount = async () => {
    const dbSnap = await getDocs(collection(db, "users"));
    const userList = [];
    dbSnap.forEach((doc) => {
      userList.push(doc.data());
    });

    const userExists = userList.some((user) => user.name === name);

    if (userExists) {
      ToastAndroid.show('Username already exists! Please use another one.', ToastAndroid.LONG);
      return;
    }

    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const userData = { fullName, email, uid };
        await setDoc(doc(db, "users", uid), userData);
        router.replace('/mytrip');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput placeholder="Enter full name" style={styles.input} onChangeText={(value) => setfullName(value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter email" style={styles.input} onChangeText={(value) => setEmail(value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity onPress={onCreateAccount} style={styles.createAccountButton}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    paddingTop: height * 0.05,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  headerText: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.08,
    marginTop: height * 0.03,
  },
  inputContainer: {
    marginTop: height * 0.03,
  },
  label: {
    fontFamily: "outfit",
    fontSize: width * 0.04,
  },
  input: {
    padding: height * 0.02,
    borderWidth: 1,
    borderRadius: width * 0.03,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
    fontSize: width * 0.04,
  },
  createAccountButton: {
    padding: height * 0.025,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * 0.04,
    marginTop: height * 0.06,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: width * 0.045,
  },
  signInButton: {
    padding: height * 0.025,
    backgroundColor: Colors.WHITE,
    borderRadius: width * 0.04,
    marginTop: height * 0.02,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  signInButtonText: {
    color: Colors.PRIMARY,
    textAlign: "center",
    fontSize: width * 0.045,
  },
});
