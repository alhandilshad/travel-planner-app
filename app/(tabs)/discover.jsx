import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import axios from 'axios';
import MapView, { Marker } from "react-native-maps";

export default function Discover() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState();
  const [locationName, setlocationName] = useState();

  const fetchPlaces = async (text) => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=4b1b1c5dee19478d88f2ba0d6d691806`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.results && response.data.results.length > 0) {
        setSuggestions(response.data.results);
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
    setQuery(''); // Clear the input field after selecting a place
    setSuggestions([]);
    const tripPlaceLocation = {
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    };
    setLocation(tripPlaceLocation);
    setlocationName(place.formatted);
  };

  return (
    <View style={{
      height: '100%',
      padding: 20,
      backgroundColor: Colors.WHITE,
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
          style={{
            position: 'absolute',
            top: 100, // Position it just below the input field
            left: 20,
            right: 20,
            maxHeight: 200, // Set max height for scrollable list
            backgroundColor: Colors.WHITE,
            borderRadius: 5,
            elevation: 5, // Add shadow for better visibility
            zIndex: 1,
          }}
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
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
        style={{
          height: '80%',
          width: '100%',
          marginTop: 20,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        region={location ? { // Update region if location is set
          ...location,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
      >
        {location && (
          <Marker
            coordinate={location}
            title={locationName}
          />
        )}
      </MapView>
    </View>
  );
}