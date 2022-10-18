import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../actions";

/**
 * @author
 * @function Category
 **/

const Width = Dimensions.get("window").width;
export const Category = (props) => {
  const { container } = styles;

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategory());
  }, [auth]);

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

  const category = useSelector((state) => state.category);

  return (
    <SafeAreaView style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 35 }}>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
              }}
            >
              Categories
            </Text>
          </View>
          <View style={{ margin: 10, flexDirection: "row", flexWrap: "wrap" }}>
            {category.categories.length > 0 &&
              category.categories.map((cat) => (
                <TouchableOpacity
                  key={cat._id}
                  style={{
                    height: Width / 4 - 15,
                    width: Width / 4 - 15,
                    backgroundColor: "#fff",
                    margin: 5,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 5,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={{ uri: cat.categoryImg.img }}
                    style={{
                      height: Width / 4 - 50,
                      width: Width / 4 - 40,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat" : null,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {cat.category}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      {category.loading && (
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
    justifyContent: "center",
    alignItems: "center",
  },
});
