import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Font from "expo-font";
import Checkbox from "expo-checkbox";
import { addToCart, getCart, removeCartItem } from "../actions";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

/**
 * @author
 * @function Cart
 **/
const Width = Dimensions.get("window").width;
export const Cart = (props) => {
  const { container } = styles;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(true);

  const cart = useSelector((state) => state.cart.cart);
  const cartState = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cartTotal =
    cart.cartItems &&
    Object.keys(cart.cartItems).reduce((cartTotal, key) => {
      const { qty } = cart.cartItems[key];
      const price = cart.cartItems[key].product.price.discounted
        ? cart.cartItems[key].product.price.discount
        : cart.cartItems[key].product.price.original;
      return cartTotal + price * qty;
    }, 0);

  const totalItem =
    cart.cartItems &&
    Object.keys(cart.cartItems).reduce(function (qty, key) {
      return qty + cart.cartItems[key].qty;
    }, 0);

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
    <SafeAreaView style={container}>
      <View
        style={{
          marginTop: 40,
          //   justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
            fontSize: 20,
          }}
        >
          Cart ({totalItem} {totalItem <= 1 ? "Item" : "Items"})
        </Text>
      </View>
      <View>
        {cart.cartItems &&
          cart.cartItems.map((item) => (
            <View
              key={item._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  padding: 5,
                }}
              >
                <Image
                  resizeMode="contain"
                  source={{ uri: item.product.image }}
                  style={{
                    height: 70,
                    width: 70,
                  }}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <View>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 14,
                    }}
                  >
                    {item.product.title.slice(0, 32)}...
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat" : null,
                      fontSize: 12,
                    }}
                  >
                    {item.props.name} - {item.props.value}, SKU -{" "}
                    {item.props.sku}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 15,
                      }}
                    >
                      Price: {item.product.currency}{" "}
                      {item.product.price.discounted
                        ? item.product.price.discount
                        : item.product.price.original}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      //   alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      disabled={item.qty <= 1 ? true : false}
                      style={{
                        backgroundColor: "#E9E9E9",
                        width: 25,
                        height: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                        marginRight: 5,
                      }}
                      onPress={() => {
                        const qty = -1;
                        dispatch(addToCart(item, qty));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#E9E9E9",
                        width: 25,
                        height: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                        marginRight: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        }}
                      >
                        {item.qty}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E9E9E9",
                        width: 25,
                        height: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                      }}
                      onPress={() => {
                        const qty = 1;
                        dispatch(addToCart(item, qty));
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 20,
                }}
                onPress={() => dispatch(removeCartItem(item))}
              >
                <Image
                  resizeMode="contain"
                  source={require("../assets/trash.png")}
                  style={{
                    height: 18,
                    width: 18,
                    tintColor: "#1461AC",
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 60,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "#1461AC",
            height: 50,
            width: Width / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Checkbox
            style={{ borderRadius: 5 }}
            value={checked}
            onValueChange={setChecked}
            color={checked ? "#1461AC" : undefined}
          /> */}
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
              color: "#fff",
            }}
          >
            BDT {cartTotal === 0 ? "00" : cartTotal}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#F29200",
            height: 50,
            width: Width / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Checkout", {
              cart: cart,
              totalItem: totalItem,
              cartTotal: cartTotal,
            })
          }
        >
          {/* <Checkbox
            style={{ borderRadius: 5 }}
            value={checked}
            onValueChange={setChecked}
            color={checked ? "#1461AC" : undefined}
          /> */}
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
      {cartState.loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f3f3f3",
            opacity: 0.5,
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 10,
  },
  dot: {
    margin: 5,
    height: 5,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
});
