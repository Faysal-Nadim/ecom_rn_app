import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions";
import { useNavigation } from "@react-navigation/native";

/**
 * @author
 * @function Profile
 **/

const Width = Dimensions.get("window").width;
export const Profile = (props) => {
  const [info, setInfo] = useState("N");
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
    navigation.navigate("Home");
  };

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

  useEffect(() => {
    AsyncStorage.getItem("user", (err, result) => {
      setInfo(JSON.parse(result));
    });
  }, []);

  // if (!auth.authenticate) {
  //   navigation.navigate("Login");
  // }
  const { container } = styles;
  return (
    <SafeAreaView style={container}>
      <View style={styles.info}>
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: `${info !== "N" && info.profilePicture.img}`,
              }}
              style={styles.avatarImage}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: loaded ? "Montserrat-SemiBold" : null }}>
              {info.fullName}
            </Text>
            <Text style={{ fontFamily: loaded ? "Montserrat-Medium" : null }}>
              {info.email}
            </Text>
            <Text style={{ fontFamily: loaded ? "Montserrat-Medium" : null }}>
              +88{info.phone}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.settings}>
              <Image
                resizeMode="contain"
                source={require("../assets/settings.png")}
                style={styles.settingsImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.order}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
            marginTop: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 17,
              }}
            >
              My Orders
            </Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => navigation.navigate("Orders", { status: "All" })}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                  color: "#1461AC",
                  right: 5,
                }}
              >
                View All
              </Text>
            </View>
            <View>
              <Image
                resizeMode="contain"
                source={require("../assets/play.png")}
                style={{
                  height: 15,
                  width: 15,
                  top: 3,
                  tintColor: "#1461AC",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Orders", { status: "Unpaid" })}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/unpaid.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Unpaid
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Orders", { status: "Paid" })}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/order.png")}
                style={{
                  height: 30,
                  width: 45,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Paid
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Orders", { status: "In Transit" })
            }
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../assets/transit.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                In Transit
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/delivered.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Delivered
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                right: 20,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/cancel.png")}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,

                  left: 5,
                }}
              >
                My Cancellation
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                left: 20,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/parcel.png")}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,

                  left: 5,
                }}
              >
                My Parcel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.other}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/address.jpeg")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Address
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/campaign.png")}
                style={{
                  height: 30,
                  width: 45,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Campaign
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/coupon.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Coupon
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/notification.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Notification
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 25,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/request.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Request
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/store.png")}
                style={{
                  height: 30,
                  width: 45,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Stores
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/wishlist.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Wishlist
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/help.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 12,
                }}
              >
                Help Desk
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.other}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 17,
              }}
            >
              Our Policy
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/privacy.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 10,
                }}
              >
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/refund.png")}
                style={{
                  height: 30,
                  width: 45,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 10,
                }}
              >
                Refund Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/about.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 10,
                }}
              >
                About Us
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/shipping.png")}
                style={{
                  height: 30,
                  width: 40,
                  tintColor: "#1461AC",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  color: "#1461AC",
                  fontSize: 10,
                }}
              >
                Shipping Policy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button onPress={logout} title="Logout Now" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 35,
    top: 20,
    left: 10,
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    width: Width - 40,
    padding: 10,
    borderRadius: 10,
  },
  profileTop: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#1461AC",
  },
  settings: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // right: 15,
  },
  settingsImage: {
    height: 30,
    width: 30,
    tintColor: "#1461AC",
  },
  order: {
    backgroundColor: "#fff",
    width: Width - 40,
    borderRadius: 10,
    padding: 10,
  },
  other: {
    backgroundColor: "#fff",
    width: Width - 40,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
});
