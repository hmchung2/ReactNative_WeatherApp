import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

//const { height, width } = Dimensions.get("window");
//console.log(width);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "983cb6d51f61f3d1e9e313b9cf085e7c";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

console.log(SCREEN_WIDTH);

export default function App() {
  const [ok, setOk] = useState(null);
  const [city, setCity] = useState("Loading ...");
  const [days, setDays] = useState([]);

  const mapWeather = (x) => {
    const weatherMapping = {
      Clear: "맑음",
      Clouds: "흐림",
      Rain: "비",
      Snow: "눈",
      Drizzle: "약간 비",
      Thunderstorm: "번개",
    };
    return weatherMapping[x] === undefined ? x : weatherMapping[x];
  };

  const getWeather = async () => {
    //const permission = await Location.requestPermissionsAsync();
    //console.log(permission);
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    //const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    console.log("Latitude : " + latitude);
    console.log("Longitude : " + longitude);

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    console.log(location[0].region);
    setCity(location[0].region);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    // // <View style={ { flexDirection: "column" }  } >
    // <View>
    //   <View
    //     style={{ width: 200, height: 200, backgroundColor: "tomato" }}
    //   ></View>
    //   <View style={{ width: 200, height: 200, backgroundColor: "teal" }}></View>
    //   <View
    //     style={{ width: 200, height: 200, backgroundColor: "orange" }}
    //   ></View>
    // </View>

    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        // indicatorStyle="white" <-- only ios
        persistentScrollbar // <- only android
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {/* // {...styles.day  , newstyle }  <- implement style */}
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>
              <Text style={styles.description}>
                {mapWeather(day.weather[0].main)}
              </Text>
              <Text style={styles.tinyText}>
                {" "}
                {day.weather[0].description}{" "}
              </Text>
            </View>
          ))
        )}

        {/* <View style={styles.day}>
          <Text style={styles.temp}>2</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>3</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>4</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>9</Text>
          <Text style={styles.description}>Sunny</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 68,
    fontWeight: "500",
  },

  weather: {},
  day: {
    //backgroundColor: "teal",
    //justifyContent: "center",
    width: SCREEN_WIDTH,
    //alignItems: "flex-start",
    padding: 30,
  },
  temp: {
    marginTop: 50,
    fontSize: 110,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    marginTop: -20,
    fontSize: 60,
    color: "white",
  },
  tinyText: {
    fontSize: 20,
    color: "white",
  },
});
