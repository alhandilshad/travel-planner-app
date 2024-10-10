import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { selectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext';

export default function selectbudget() {
    const navigation = useNavigation();
    const [selectedOption, setselectedOption] = useState();
    const {tripData, settripData}=useContext(CreateTripContext);

    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, []);

    useEffect(() => {
        selectedOption && settripData({
            ...tripData,
            budget: selectedOption?.title,
        })
    }, [selectedOption]);

    const onClickContinue = () => {
        if(!selectedOption){
            ToastAndroid.show('Please select your budget', ToastAndroid.LONG);
            return;
        }
        router.push('/create-trip/review-trip')
    }
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20,
      }}>Budget</Text>

      <View style={{
        marginTop: 20,
      }}>
        <Text style={{
            fontSize: 18,
            fontFamily: 'outfit-bold',
        }}>Choose spending habits for your trip.</Text>

        <FlatList
          data={selectBudgetOptions}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setselectedOption(item)} style={{marginVertical: 10}}>
                <OptionCard option={item} selected={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity onPress={() => onClickContinue()} style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 35,
      }}>
        <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 18,
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}