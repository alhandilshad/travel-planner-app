import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';

export default function reviewtrip() {
    const navigation = useNavigation();
    const {tripData, settripData}=useContext(CreateTripContext);
    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, []);

    const onClickContinue = () => {
        router.replace('create-trip/generate-trip');
    }

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 20,
      }}>Review your trip</Text>

      <View style={{
        marginTop: 20,
      }}>
        <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
        }}>Before generating your trip, Please review your selection</Text>

        <View style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <Text style={{fontSize: 30}}>📍</Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.GRAY,
                }}>Destination</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{tripData?.locationInfo?.name}</Text>
            </View>
        </View>

        <View style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <Text style={{fontSize: 30}}>📅</Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.GRAY,
                }}>Travel Date</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{moment(tripData?.startDate).format('DD MMM')+' To '+moment(tripData?.endDate).format('DD MMM')+'  '}({ tripData?.totalDays } days)</Text>
            </View>
        </View>

        <View style={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <Text style={{fontSize: 30}}>🚌</Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.GRAY,
                }}>Who is Traveling</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{tripData?.traveler?.title}</Text>
            </View>
        </View>

        <View style={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <Text style={{fontSize: 30}}>💰</Text>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.GRAY,
                }}>Budget</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{tripData?.budget}</Text>
            </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => onClickContinue()} style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 80,
      }}>
        <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 20,
        }}>Build My trip</Text>
      </TouchableOpacity>
    </View>
  )
}