import { View, Text, FlatList, TouchableOpacity, ToastAndroid, ScrollView, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { selectTravelerList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {
    const [selectedTraveler, setselectedTraveler] = useState();
    const navigation = useNavigation();
    const { tripData, settripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    useEffect(() => {
        settripData({ ...tripData, traveler: selectedTraveler });
    }, [selectedTraveler]);

    const onClickContinue = () => {
        if (!selectedTraveler) {
            ToastAndroid.show('Please select the traveler', ToastAndroid.LONG);
            return;
        }
        router.push('/create-trip/select-dates');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.WHITE }}>
            <View style={{
                padding: 25,
                paddingTop: 75,
                backgroundColor: Colors.WHITE,
                height: '100%',
            }}>
                <Text style={{
                    fontSize: 35,
                    fontFamily: 'outfit-bold',
                    marginTop: 20,
                }}>Who's Traveling</Text>

                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 23,
                    }}>Choose your travelers</Text>

                    <FlatList
                        data={selectTravelerList}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setselectedTraveler(item)} style={{
                                marginVertical: 10,
                            }}>
                                <OptionCard option={item} selected={selectedTraveler} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                <TouchableOpacity onPress={onClickContinue} style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 10,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.WHITE,
                        fontFamily: 'outfit-medium',
                        fontSize: 18,
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}