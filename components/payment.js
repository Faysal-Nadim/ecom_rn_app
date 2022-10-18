import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
/**
 * @author
 * @function Payment
 **/
export const Payment = ({ route }) => {
  const { container } = styles;
  const navigation = useNavigation();
  return (
    <WebView
      source={{
        uri:
          route.params.payment === "bKash"
            ? `https://payment.alistore-bd.com/api/bkash/payment.php?amount=${route.params.amount}&invoiceID=${route.params.invoice}`
            : null,
      }}
      onNavigationStateChange={(state) => {
        if (
          state.url === "https://payment.alistore-bd.com/api/bkash/success.html"
        ) {
          navigation.navigate("Orderplaced", {
            payment: "complete",
            invoice: route.params.invoice,
          });
        } else if (
          state.url === "https://payment.alistore-bd.com/api/bkash/error.php"
        ) {
          navigation.navigate("Orderplaced", {
            payment: "failed",
            invoice: route.params.invoice,
          });
        }
      }}
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
