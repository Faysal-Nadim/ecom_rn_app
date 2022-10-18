import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Cart } from "./cart";
import { Home } from "./home";
import { Profile } from "./profile";
import { Category } from "./category";
import { Company } from "./company";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Login } from "./login";
import { Verify } from "./verify";

const Tab = createBottomTabNavigator();

const CompanyTab = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#1461AC",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export const MyTabs = () => {
  const [loaded, setLoaded] = useState(false);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);

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
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          // bottom: 15,
          // left: 15,
          // right: 15,
          // elevation: 0,
          // backgroundColor: "#f2f2f2",
          // borderRadius: 10,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#1461AC" : "#748c94",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  color: focused ? "#1461AC" : "#748c94",
                  fontSize: 10,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/category.webp")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#1461AC" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#1461AC" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                }}
              >
                CATEGORY
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Comopany"
        component={Company}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/aleeha-tech.png")}
              resizeMode="contain"
              style={{
                width: 45,
                height: 45,
                left: 3,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <CompanyTab {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={auth.authenticate ? Cart : Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/cart.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#1461AC" : "#748c94",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  left: 14,
                  backgroundColor: "#1461ac",
                  height: 25,
                  width: 25,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#fff",
                  borderWidth: 2,
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
              <Text
                style={{
                  color: focused ? "#1461AC" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                }}
              >
                CART
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={auth.authenticate ? Profile : Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#1461AC" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#1461AC" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                }}
              >
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "7F5DF0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
