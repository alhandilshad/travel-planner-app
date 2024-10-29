import { Text, View } from "react-native";
import Login from '@/components/Login'
import { auth } from '../configs/FirebaseConfig'
import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
      }}
    > 
     {currentUser ? <Redirect href={"/mytrip"} /> : <Login /> }
     <Login />
    </View>
  );
}