import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

/**
 * @author
 * @function ProductHeader
 **/
export const ProductHeader = () => {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);

  const totalItem =
    cart.cartItems &&
    Object.keys(cart.cartItems).reduce(function (qty, key) {
      return qty + cart.cartItems[key].qty;
    }, 0);

  const { container, image } = styles;
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
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 18,
            }}
          >
            Product Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{
              backgroundColor: "#fff",
              borderRadius: 30,
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../assets/cart.png")}
              style={{
                height: 25,
                width: 25,
                tintColor: "#000",
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor: "#1461ac",
                height: 20,
                width: 20,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  color: "#fff",
                }}
              >
                {auth.authenticate ? totalItem : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 30,
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../assets/wishlist.png")}
              style={{
                height: 30,
                width: 30,
                tintColor: "#000",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "F2F2F2",
  },
  image: {
    height: 40,
    width: 60,
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
  },
});
