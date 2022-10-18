import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import * as Font from "expo-font";

/**
 * @author
 * @function Timeline
 **/
export const Timelinedata = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

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
    <Timeline
      //..other props
      style={{ marginTop: 5 }}
      data={data}
      showTime={false}
      titleStyle={{
        fontFamily: loaded ? "Montserrat" : null,
        fontSize: 13,
      }}
      descriptionStyle={{ fontFamily: loaded ? "Montserrat" : null }}
      detailContainerStyle={{
        justifyContent: "center",
        marginTop: -12,
      }}
      isUsingFlatlist={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
