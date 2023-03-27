/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  //const [error, setError] = useState();

  const getWeather = async () => {
    const apikey = '50624817e10e8155cefbe3bcfc92ab6b';
    try {
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
      );
      setWeather(data);
      setCity('');
    } catch (err) {
      //setError(err);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Weather {weather?.name}</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.button} onPress={getWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        {weather && (
          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Weather</Text>
              <Text style={styles.label}>Rain Condition</Text>
              <Text style={styles.label}>Temperature</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{weather.weather[0].main}</Text>
               <Text style={styles.value}>{weather?.weather[0].description}</Text>
              <Text style={styles.value}>{weather?.main?.temp_max}°C</Text> 
            </View>
          </View>

        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    backgroundColor: '#f87171',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  //card
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 3,
    padding: 12,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingRight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
