import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

/**
 * @author
 * @function Orderplaced
 **/

const Width = Dimensions.get("window").width;

export const Orderplaced = ({ route }) => {
  const { container } = styles;

  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../assets/fonts/Montserrat.ttf"),
      "Montserrat-SemiBold": {
        uri: require("../assets/fonts/Montserrat.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Montserrat-Medium": {
        uri: require("../assets/fonts/Montserrat-Medium.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Montserrat-SemiBold": {
        uri: require("../assets/fonts/Montserrat-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <View style={container}>
      <View
        style={{
          height: 200,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {route.params.payment === "complete" ? (
          <Image
            resizeMode="contain"
            source={require("../assets/orderplaced.png")}
            style={{
              width: 200,
              height: 200,
            }}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require("../assets/failed.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        )}
      </View>
      <Text
        style={{
          fontFamily: loaded ? "Montserrat-SemiBold" : null,
          fontSize: 22,
          color: "#3B577C",
          textAlign: "center",
        }}
      >
        {route.params.payment === "complete"
          ? `Your Order Has${"\n"}Been Placed`
          : `Payment Failed!${"\n"}Please Pay Again.`}
      </Text>

      <Text
        style={{
          fontFamily: loaded ? "Montserrat-Medium" : null,
          margin: 25,
          backgroundColor: "#93BBD2",
          fontSize: 15,
          padding: 5,
          borderRadius: 10,
        }}
      >
        Order ID #{route.params.invoice}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#3B577C",
          padding: 10,
          width: Width / 3,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text
          style={{
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
            fontSize: 20,
            color: "#fff",
          }}
        >
          OK
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
