import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions";

/**
 * @author
 * @function Order
 **/
export const Order = ({ route }) => {
  const { container } = styles;
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(route.params.status);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

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

  const order = useSelector((state) => state.order);

  const orders =
    status === "Unpaid"
      ? order.orders.length > 0 &&
        order.orders.filter((c) => c.invoice.status === "Unpaid")
      : status === "Paid"
      ? order.orders.length > 0 &&
        order.orders.filter((c) => c.invoice.status === "Paid")
      : status === "In Transit"
      ? order.orders.length > 0 &&
        order.orders.filter((c) => c.shipping.status === "In Transit")
      : status === "Delivered"
      ? order.orders.length > 0 &&
        order.orders.filter((c) => c.shipping.status === "Delivered")
      : order.orders;

  return (
    <SafeAreaView style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
            marginRight: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: status === "All" ? "#303640" : "#fff",
              borderRadius: 5,
              height: 25,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStatus("All")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                color: status === "All" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: status === "Unpaid" ? "#303640" : "#fff",
              borderRadius: 5,
              height: 25,
              width: 65,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStatus("Unpaid")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                color: status === "Unpaid" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              Unpaid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: status === "Paid" ? "#303640" : "#fff",
              borderRadius: 5,
              height: 25,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStatus("Paid")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                color: status === "Paid" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              Paid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: status === "In Transit" ? "#303640" : "#fff",
              borderRadius: 5,
              height: 25,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStatus("In Transit")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                color: status === "In Transit" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              In Transit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: status === "Delivered" ? "#303640" : "#fff",
              borderRadius: 5,
              height: 25,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStatus("Delivered")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                color: status === "Delivered" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              Delivered
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 5 }}>
          {orders.length > 0 &&
            orders
              .slice()
              .reverse()
              .map((data) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 8,
                    margin: 5,
                  }}
                  key={data._id}
                  onPress={() =>
                    navigation.navigate("Order Details", { order: data })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-Medium" : null,
                        }}
                      >
                        Order ID #{data.orderID}{" "}
                      </Text>
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                          backgroundColor:
                            data.invoice.status === "Unpaid"
                              ? "#F77272"
                              : data.invoice.status === "Partially Paid"
                              ? "#FBBC23"
                              : data.invoice.status === "Paid"
                              ? "#37D399"
                              : "#2AA79B",
                          color: "#fff",
                          padding: 2,
                          fontSize: 13,
                          borderRadius: 5,
                        }}
                      >
                        {data.invoice.status}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat" : null,
                        fontSize: 10,
                      }}
                    >
                      {data.orderTime}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat" : null,
                          fontSize: 13,
                          color: "#B1B1B1",
                        }}
                      >
                        Order Total
                      </Text>
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-Medium" : null,
                        }}
                      >
                        BDT {data.orderTotal}
                      </Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat" : null,
                          fontSize: 13,
                          color: "#B1B1B1",
                        }}
                      >
                        Payment
                      </Text>
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-Medium" : null,
                        }}
                      >
                        {data.transaction.method}
                      </Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat" : null,
                          fontSize: 13,
                          color: "#B1B1B1",
                        }}
                      >
                        Order Status
                      </Text>
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-Medium" : null,
                          backgroundColor:
                            data.tracking.slice().reverse()[0].status ===
                            "Pending"
                              ? "#FBBC23"
                              : data.tracking.slice().reverse()[0].status ===
                                "Processing"
                              ? "#2AA79B"
                              : data.tracking.slice().reverse()[0].status ===
                                "Shipped"
                              ? "#3ABEF8"
                              : data.tracking.slice().reverse()[0].status ===
                                "In Transit"
                              ? "#2AA79B"
                              : data.tracking.slice().reverse()[0].status ===
                                "Delivered"
                              ? "#37D399"
                              : "#F77272",
                          color: "#fff",
                          padding: 2,
                          fontSize: 13,
                          borderRadius: 5,
                        }}
                      >
                        {data.tracking.slice().reverse()[0].status}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat" : null,
                        fontSize: 13,
                        color: "#B1B1B1",
                      }}
                    >
                      Order Items
                    </Text>
                    {data.orderItems.map((item) => (
                      <View
                        key={item._id}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 10,
                          flexDirection: "row",
                          //   marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            padding: 5,
                          }}
                        >
                          <Image
                            resizeMode="contain"
                            source={{ uri: item.img }}
                            style={{
                              height: 70,
                              width: 70,
                            }}
                          />
                        </View>
                        <View style={{ justifyContent: "center" }}>
                          <Text
                            style={{
                              fontFamily: loaded ? "Montserrat-Medium" : null,
                              fontSize: 14,
                            }}
                          >
                            {item.title.slice(0, 35)}...
                          </Text>
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
                            <Text
                              style={{
                                fontFamily: loaded ? "Montserrat-Medium" : null,
                              }}
                            >
                              BDT {item.price} × {item.qty}
                            </Text>

                            <Text
                              style={{
                                fontFamily: loaded ? "Montserrat-Medium" : null,
                              }}
                            >
                              Item Total: BDT {item.price * item.qty}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 5,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
