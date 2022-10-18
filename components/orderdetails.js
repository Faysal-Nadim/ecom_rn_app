import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Font from "expo-font";
import { Timelinedata } from "./timeline";

/**
 * @author
 * @function OrderDetails
 **/
export const OrderDetails = ({ route }) => {
  const { container } = styles;
  const order = route.params.order;

  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const timelineData = order.tracking
    .slice()
    .reverse()
    .map((data) => {
      return {
        time: data.status,
        title: data.time,
        description: data.remark,
      };
    });

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={{ margin: 5 }}>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 8,
              margin: 5,
            }}
            key={order._id}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                  }}
                >
                  Order ID #{order.orderID}{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                    backgroundColor:
                      order.invoice.status === "Unpaid"
                        ? "#F77272"
                        : order.invoice.status === "Partially Paid"
                        ? "#FBBC23"
                        : order.invoice.status === "Paid"
                        ? "#37D399"
                        : "#2AA79B",
                    color: "#fff",
                    padding: 2,
                    fontSize: 13,
                    borderRadius: 5,
                  }}
                >
                  {order.invoice.status}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat" : null,
                  fontSize: 10,
                }}
              >
                {order.orderTime}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                  BDT {order.orderTotal}
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                  {order.transaction.method}
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                      order.tracking.slice().reverse()[0].status === "Pending"
                        ? "#FBBC23"
                        : order.tracking.slice().reverse()[0].status ===
                          "Processing"
                        ? "#2AA79B"
                        : order.tracking.slice().reverse()[0].status ===
                          "Shipped"
                        ? "#3ABEF8"
                        : order.tracking.slice().reverse()[0].status ===
                          "In Transit"
                        ? "#2AA79B"
                        : order.tracking.slice().reverse()[0].status ===
                          "Delivered"
                        ? "#37D399"
                        : "#F77272",
                    color: "#fff",
                    padding: 2,
                    fontSize: 13,
                    borderRadius: 5,
                  }}
                >
                  {order.tracking.slice().reverse()[0].status}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat" : null,
                    fontSize: 13,
                    color: "#B1B1B1",
                  }}
                >
                  Shipment By
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                  }}
                >
                  Pathao
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat" : null,
                    fontSize: 13,
                    color: "#B1B1B1",
                  }}
                >
                  Shipment
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    backgroundColor:
                      order.shipping.status !== null
                        ? order.shipping.status === "Picked"
                          ? "#FBBC23"
                          : order.shipping.status === "At Sorting Hub"
                          ? "#2AA79B"
                          : order.shipping.status === "On The Way"
                          ? "#3ABEF8"
                          : order.shipping.status === "In Transit"
                          ? "#2AA79B"
                          : order.shipping.status === "Delivered"
                          ? "#37D399"
                          : order.shipping.status === "Returned" &&
                            order.shipping.status === "On Hold"
                          ? "#F77272"
                          : "#3ABEF8"
                        : null,
                    color: order.shipping.status !== null ? "#fff" : null,
                    padding: 2,
                    fontSize: 13,
                    borderRadius: 5,
                  }}
                >
                  {order.shipping.status !== null
                    ? order.shipping.status
                    : "N/A"}
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat" : null,
                    fontSize: 13,
                    color: "#B1B1B1",
                  }}
                >
                  Consignment
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize:
                      order.shipping.consignment_id !== null ? 10 : null,
                  }}
                >
                  {order.shipping.consignment_id !== null
                    ? order.shipping.consignment_id
                    : "N/A"}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize: 13,
                  }}
                >
                  Delivery Charge
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize: 13,
                  }}
                >
                  BDT{" "}
                  {order.shipping.delivery_fee === null
                    ? "00"
                    : order.shipping.delivery_fee}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize: 13,
                  }}
                >
                  Discount
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize: 13,
                  }}
                >
                  BDT -725
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderStyle: "dashed",
                borderTopWidth: 1,
                borderTopColor: "#B1B1B1",
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat" : null,
                  fontSize: 13,
                  color: "#B1B1B1",
                  marginTop: 10,
                }}
              >
                Order Timeline
              </Text>
              <ScrollView horizontal={true}>
                <Timelinedata data={timelineData} />
              </ScrollView>
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
                  marginTop: 10,
                }}
              >
                Delivery Address
              </Text>
              <View
                style={{
                  //   padding: 5,
                  //   borderStyle: "dashed",
                  //   borderWidth: 1,
                  //   borderColor: "#B1B1B1",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                    fontSize: 12,
                  }}
                >
                  {order.address.recipient_name}
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat" : null,
                    marginTop: 3,
                    fontSize: 12,
                  }}
                >
                  {order.address.recipient_address}
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    marginTop: 3,
                    fontSize: 12,
                  }}
                >
                  {order.address.recipient_phone}
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
              {order.orderItems.map((item) => (
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
