import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function selectdates() {
    const navigation = useNavigation();
    const [startDate, setstartDate] = useState();
    const [endDate, setendDate] = useState();
    const {tripData, settripData}=useContext(CreateTripContext);

    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, [])

    const onDateChange = (date, type) => {
      console.log(date, type);
      if(type == 'START_DATE'){
        setstartDate(moment(date));
      }else{
        setendDate(moment(date));
      }
    }

    const onDateSelectionContinue = () => {
      if(!startDate ||!endDate){
        ToastAndroid.show('Please select start and end dates', ToastAndroid.LONG);
        return;
      }
      const totalDays = endDate.diff(startDate, 'days');
      console.log(totalDays);
      settripData({...tripData, startDate:startDate, endDate:endDate, totalDays:totalDays+1 });
      router.push('/create-trip/select-budget');
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
      }}>Travel Dates</Text>

      <View style={{
        marginTop: 30
      }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY
          }}
          selectedDayTextStyle={{
            fontFamily: 'outfit-medium',
            color: Colors.WHITE,
          }}
        />
      </View>
      <TouchableOpacity onPress={onDateSelectionContinue} style={{
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