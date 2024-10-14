import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import UserTripList from '../../components/MyTrips/UserTripList';

export default function myTrip() {
  const [userTrips, setuserTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
    getMyTrips();
  }, [currentUser])

  const getMyTrips = async () => {
    const q = query(collection(db, 'trips'), where('userId', '==', currentUser.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      setuserTrips(prevState => [...prevState, doc.data()]);
    })
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
        }}>myTrip</Text>
        <Ionicons name="add-circle" size={50} color="black" />
      </View>

      {userTrips?.length === 0 ? 
        <StartNewTripCard /> : 
        <UserTripList userTrips={userTrips} />
      }
    </View>
  )
}