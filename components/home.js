import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import SearchBar from "react-native-platform-searchbar";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../actions";

/**
 * @author
 * @function Home
 **/

const images = [
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-4187.jpg",
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-0427.jpg",
  "https://media.cnn.com/api/v1/images/stellar/prod/220328104210-allbirds-nautral-white-sneakers.jpg?c=original",
];

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const Home = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCart());
    }
  }, [auth.authenticate]);

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

  // useEffect(async () => {
  //   const token = "Nadim";
  //   const storeData = async () => {
  //     try {
  //       await AsyncStorage.setItem("token", token);
  //     } catch (e) {
  //       // saving error
  //     }
  //   };
  // }, []);

  const [value, setValue] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(false);
  const { container } = styles;

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== activeImg) {
        setActiveImg(slide);
      }
    }
  };

  return (
    <SafeAreaView style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <View>
            <TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/aleeha-tech.png")}
                  style={styles.logoImage}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.topHead}>
            <TouchableOpacity>
              <View style={styles.wishlist}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/wishlist.png")}
                  style={styles.wishlistImage}
                />
              </View>
            </TouchableOpacity>
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
        <View style={styles.searchBar}>
          <SearchBar
            value={value}
            onChangeText={setValue}
            placeholder="Search"
            theme="light"
            platform="ios"
            style={styles.searchBar}
          >
            {loading ? (
              <ActivityIndicator style={{ marginRight: 10 }} />
            ) : undefined}
          </SearchBar>
        </View>
        <View style={styles.slider}>
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {images.map((e, index) => (
              <Image
                key={e}
                resizeMode="stretch"
                source={{ uri: e }}
                style={styles.wrapIamge}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={activeImg == index ? styles.activeDot : styles.dot}
            >
              -
            </Text>
          ))}
        </View>
        {/* Category component */}
        <View style={styles.categoryBar}>
          <TouchableOpacity>
            <View style={styles.category}>
              <Image
                style={styles.categoryIamge}
                source={require("../assets/sneaker.png")}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  paddingLeft: 3,
                }}
              >
                Sneakers
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.category}>
              <Image
                style={styles.categoryIamge}
                source={require("../assets/glasses.jpeg")}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  paddingLeft: 3,
                }}
              >
                Glasses
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.category}>
              <Image
                style={styles.categoryIamge}
                source={require("../assets/watch.png")}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  paddingLeft: 2,
                }}
              >
                Watches
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.productBar}>
          <View style={styles.product}>
            <View style={styles.label}>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat" : null,
                  fontSize: 10,
                  backgroundColor: "#1461AC",
                  color: "#fff",
                  padding: 5,
                  width: 60,
                  borderRadius: 15,
                  textAlign: "center",
                }}
              >
                30% OFF
              </Text>
            </View>
            <TouchableOpacity>
              <View style={styles.wishlistIcon}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: "#fff",
                    height: 20,
                    width: 20,
                  }}
                  source={require("../assets/wishlist.png")}
                />
              </View>
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.productImage}
              source={require("../assets/sneaker.png")}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Product")}>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  textAlign: "center",
                }}
              >
                Best Selling High Quality Sneakers
              </Text>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  textAlign: "center",
                }}
              >
                BDT 1550
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.product}>
            <View style={styles.label}>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat" : null,
                  fontSize: 10,
                  backgroundColor: "#1461AC",
                  color: "#fff",
                  padding: 5,
                  width: 60,
                  borderRadius: 15,
                  textAlign: "center",
                }}
              >
                30% OFF
              </Text>
            </View>
            <TouchableOpacity>
              <View style={styles.wishlistIcon}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: "#fff",
                    height: 20,
                    width: 20,
                  }}
                  source={require("../assets/wishlist.png")}
                />
              </View>
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.productImage}
              source={require("../assets/sneaker.png")}
            />
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  textAlign: "center",
                }}
              >
                Best Selling High Quality Sneakers
              </Text>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  textAlign: "center",
                }}
              >
                BDT 1550
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 35,
  },
  logo: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logoImage: {
    height: 60,
    width: 60,
    top: 0,
    left: 5,
  },
  topHead: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wishlist: {
    top: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  settings: {
    top: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  settingsImage: {
    height: 30,
    width: 30,
    tintColor: "#1461AC",
  },
  wishlistImage: {
    height: 30,
    width: 30,
    tintColor: "#1461AC",
  },
  slider: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    paddingBottom: 5,
  },
  wrap: {
    height: Height * 0.25,
    width: Width - 20,
  },
  wrapIamge: {
    flex: 1,
    alignItems: "center",
    height: Height * 0.25,
    width: Width - 20,
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  wrapDot: {
    marginTop: 5,
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  activeDot: {
    margin: 3,
    height: 3,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  dot: {
    margin: 3,
    height: 3,
    width: 5,
    borderRadius: 2,
    backgroundColor: "black",
  },
  categoryBar: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "row",
  },
  category: {
    marginRight: 5,
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: Width / 3 - 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  categoryIamge: {
    height: 25,
    width: 30,
    left: 0,
    right: 0,
    padding: 2,
    // transform: [{ rotateY: "180deg" }],
  },
  productBar: {
    flexDirection: "row",
  },
  product: {
    backgroundColor: "#fff",
    width: Width / 2 - 15,
    marginRight: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    height: 180,
    width: 180,
    overflow: "hidden",
  },
  label: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 0,
    bottom: 0,
  },
  wishlistIcon: {
    position: "relative",
    top: 0,
    left: 70,
    right: 0,
    bottom: 0,
    height: 25,
    width: 25,
    backgroundColor: "#B3B7C4",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
