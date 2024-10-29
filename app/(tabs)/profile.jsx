import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../configs/FirebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function Profile() {
  const router = useRouter();
  const [profileData, setprofileData] = useState();
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
    if (currentUser) {
      const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));

      const unsubscribeTrips = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setprofileData(doc.data());
        });
      });

      return () => unsubscribeTrips();
    }
  }, [currentUser]);

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

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out!');
    });
    router.replace('/auth/sign-in')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HM0aXEO33ftrbKz4-tr5hs_6SOF179NkMA&s' }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.username}>{profileData?.fullName}</Text>
        <Text>{profileData?.email}</Text>
        <Text style={styles.bio}>Travel enthusiast, exploring the world one place at a time!</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userTrips.length}</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>128</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>76</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/mytrip')}>
          <Text style={styles.buttonText}>My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.DARK,
  },
  bio: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
