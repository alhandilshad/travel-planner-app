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
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=4b1b1c5dee19478d88f2ba0d6d691806`;
  
    try {
      const response = await axios.get(url);
  
      // Access the 'results' array instead of 'features'
      if (response.data && response.data.results && response.data.results.length > 0) {
        console.log('Suggestions:', response.data.results); // Log suggestions if available
        setSuggestions(response.data.results); // Update suggestions with the correct array
      } else {
        console.log('No results found in the response.');
      }
    } catch (error) {
      console.error('Error fetching places:', error.response ? error.response.data : error.message);
    }
  };
  
  const fetchPlaceDetails = (place) => {
    settripData({
      locationInfo: {
        name: place.formatted || 'Unknown Place', // Access formatted directly
        coordinates: {
          latitude: place.lat, // Access lat directly
          longitude: place.lon, // Access lon directly
        },
        address: place.address_line1,
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
    setQuery(place.formatted);
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
              <Text>{item.formatted || 'Unknown Place'}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}