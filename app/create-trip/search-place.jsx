import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import axios from 'axios';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const { tripData, settripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, [navigation]);

  const fetchPlaces = async (text) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${text}&format=json&addressdetails=1&limit=5&accept-language=en`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'travel-planner-app/1.0 (dilshadalhan@gmail.com)',
        },
      });
      if (response.data) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaceDetails = (place) => {
    settripData({
      locationInfo: {
        name: place.display_name,
        coordinates: {
          latitude: parseFloat(place.lat),
          longitude: parseFloat(place.lon),
        },
        address: place.address,
      },
    });
    router.push('/create-trip/select-traveler');
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (place) => {
    fetchPlaceDetails(place);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.GRAY,
          padding: 10,
          borderRadius: 5,
          marginTop: 30,
        }}
        placeholder="Search places..."
        value={query}
        onChangeText={handleSearch}
      />
      
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()} // Ensure key is a string
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionPress(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Colors.LIGHT_GRAY,
              }}
            >
              <Text>{item.display_name || 'Unknown Place'}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}