import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import axios from 'axios'
import { CreateTripContext } from '../../context/CreateTripContext'

export default function SearchPlace() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([]);

  const {tripData, settripData}=useContext(CreateTripContext);

  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    })
  }, [navigation])

  useEffect(() => {
    console.log(tripData)
  }, [tripData])

  const API_KEY = 'AlzaSyUauYMxlkYgk0g0uPpX7b1m2jxpslpvOQY'

  const fetchPlaces = async (text) => {
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${text}&key=${API_KEY}`

    try {
      const response = await axios.get(url)
      if (response.data.predictions) {
        setSuggestions(response.data.predictions)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPlaceDetails = async (placeId, name) => {
    const detailsUrl = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`

    try {
      const response = await axios.get(detailsUrl);
      const placeDetails = response.data.result;
      settripData({
        locationInfo: {
          name,
          coordinates: placeDetails?.geometry.location,
          photoRef: placeDetails?.photos[0]?.photo_reference,
          url: placeDetails?.url
        }
      });
      router.push('/create-trip/select-traveler')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = (text) => {
    setQuery(text)
    if (text.length > 2) {
      fetchPlaces(text)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionPress = (place) => {
    fetchPlaceDetails(place.place_id, place.description)
    setQuery(place.description)
    setSuggestions([])
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <View></View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.GRAY,
          padding: 10,
          borderRadius: 5,
          marginTop: 30
        }}
        placeholder="Search places..."
        value={query}
        onChangeText={handleSearch}
      />
      
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionPress(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Colors.LIGHT_GRAY,
              }}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}
