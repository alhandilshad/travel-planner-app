import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { getDocs, collection, where, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function myTrip() {
  const [userTrips, setuserTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }else{
        console.log("User is signed out");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'trips'), where('userId', '==', currentUser.uid));

      const unsubscribeTrips = onSnapshot(q, (querySnapshot) => {
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        setuserTrips(trips);
      });

      return () => unsubscribeTrips();
    }
  }, [currentUser]);

  return (
    <ScrollView style={{
      backgroundColor: Colors.WHITE,
    }} contentContainerStyle={{flexGrow: 1, padding: 25, paddingTop: 55}}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
        }}>myTrips</Text>
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      {userTrips?.length === 0 ? 
        <StartNewTripCard /> : 
        <UserTripList userTrips={userTrips} />
      }
    </ScrollView>
  )
}