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

  const API_KEY = 'fsq3RtyN5Es53dNzSX0kKTh/30O60A9Xve7up1HcQM2Pa9Y=';

  const fetchPlaces = async (text) => {
    const url = `https://api.foursquare.com/v3/places/search?query=${text}`;
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: API_KEY,
      },
    };

    try {
      const response = await axios.get(url, options);
      if (response.data.results) {
        setSuggestions(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaceDetails = async (placeId, name) => {
    const detailsUrl = `https://api.foursquare.com/v3/places/${placeId}`;
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: API_KEY,
      },
    };

    try {
      const response = await axios.get(detailsUrl, options);
      const placeDetails = response.data;
      settripData({
        locationInfo: {
          name,
          coordinates: placeDetails.location, // Use correct structure
          photoRef: placeDetails.photos[0]?.photo_reference,
          url: placeDetails.url,
        },
      });
      router.push('/create-trip/select-traveler');
    } catch (error) {
      console.error(error);
    }
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
    fetchPlaceDetails(place.id, place.name); // Use correct structure
    setQuery(place.name);
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
          keyExtractor={(item) => item.id} // Ensure key is a string
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionPress(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Colors.LIGHT_GRAY,
              }}
            >
              {/* Wrap the place name in a Text component */}
              <Text>{item.name || 'Unknown Place'}</Text> {/* Fallback if name is undefined */}
              {/* You can also render other details if necessary */}
              {item.categories && item.categories.length > 0 && (
                <Text style={{ fontSize: 12, color: Colors.GRAY }}>
                  {item.categories[0].name} {/* Assuming the first category */}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}