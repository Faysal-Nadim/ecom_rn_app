import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Company
 **/
export const Company = (props) => {
  const { container } = styles;
  return (
    // <WebView source={{ uri: "http://localhost:4000/api/v1/user/google" }} />

    <View style={container}>
      <Text>Company</Text>
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
