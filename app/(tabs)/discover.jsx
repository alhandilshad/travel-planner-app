import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import axios from 'axios'
import MapView, { Marker } from "react-native-maps";

export default function discover() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState();

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

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchPlaces(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (place) => {
    handleSearchButton(place);
    setQuery(place.formatted);
    setSuggestions([]);
  };

  const handleSearchButton = (place) => {
    const tripPlaceLocation = {
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon)
    };
    setLocation(tripPlaceLocation);
  }

  return (
    <View style={{
      height: '100%',
      padding: 20,
      backgroundColor: Colors.WHITE
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
      <TouchableOpacity onPress={handleSearchButton} style={{
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
      }}>
        <Text style={{
          color: Colors.WHITE,
          marginTop: 20,
        }}>Search</Text>
      </TouchableOpacity>
      
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
      <MapView
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.05, // Adjust zoom level
          longitudeDelta: 0.05, // Adjust zoom level
        }}
      >
        <Marker
          coordinate={location}
          title='alhan'
        />
      </MapView>
    </View>
  )
}