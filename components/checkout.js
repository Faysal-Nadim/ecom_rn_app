import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, pathaoFee } from "../actions";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../helpers/axios";

/**
 * @author
 * @function Checkout
 **/

const Width = Dimensions.get("window").width;

export const Checkout = ({ route }) => {
  const { container } = styles;

  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("");
  const [discount, setDiscount] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = route.params.cart;
  const cartTotal = route.params.cartTotal;
  const totalItem = route.params.totalItem;

  const weight =
    cart.cartItems &&
    Object.keys(cart.cartItems).reduce(function (weight, key) {
      const { qty } = cart.cartItems[key];
      return weight + cart.cartItems[key].product.weight.value * qty;
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

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  useEffect(() => {
    if (selected !== null) {
      const data = { ...selected, weight: weight.toFixed(2) };
      dispatch(pathaoFee(data));
    }
  }, [selected]);

  const address = useSelector((state) => state.address.address);
  const courier = useSelector((state) => state.courier);

  const delivery = courier.pathao !== null ? courier.pathao.data.price : 0;

  const orderTotal = cartTotal + +delivery - discount;

  const handlePlaceOrder = async () => {
    const data = {
      invoice: {
        amount: orderTotal,
      },
      payment: payment,
      orderItems: cart.cartItems.map((item) => ({
        productID: item.product.productID,
        title: item.product.title,
        img: item.product.image,
        props: {
          name: item.props.name,
          value: item.props.value,
          sku: item.props.sku,
        },
        price: item.product.price.discounted
          ? item.product.price.discount
          : item.product.price.original,
        qty: item.qty,
        itemTotal: item.product.price.discounted
          ? item.product.price.discount * item.qty
          : item.product.price.original * item.qty,
      })),
      orderTotal: orderTotal,
      totalProduct: totalItem,
      address: selected._id,
      weight: {
        value: weight,
      },
      shipping: {
        delivery_fee: delivery,
      },
    };
    if (payment === "COD") {
      const res = await axiosInstance
        .post(`/user/order/place`, data)
        .then((res) => {
          if (res.status === 201) {
            navigation.navigate("Orderplaced", {
              payment: "complete",
              invoice: res.data.order.orderID,
            });
          }
        })
        .catch((error) => {
          const { data } = error.response;
          Toast.show({
            type: "error",
            text1: `${data.msg}`,
            text2: `Status ${error.response.status}`,
          });
        });
    }
    if (payment === "bKash") {
      const res = await axiosInstance
        .post(`/user/order/place`, data)
        .then((res) => {
          if (res.status === 201) {
            navigation.navigate("Payment", {
              payment: payment,
              amount: res.data.order.orderTotal,
              invoice: res.data.order.orderID,
            });
          }
        })
        .catch((error) => {
          const { data } = error.response;
          Toast.show({
            type: "error",
            text1: `${data.msg}`,
            text2: `Status ${error.response.status}`,
          });
        });
    }
  };

  return (
    <SafeAreaView style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
              marginTop: 3,
            }}
          >
            Delivery Address
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 3,
              borderRadius: 3,
              borderWidth: 1,
              borderStyle: "dashed",
              backgroundColor: "#fff",
              borderColor: "#53D451",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
            onPress={() => navigation.navigate("Address")}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 12,
              }}
            >
              {" "}
              Add New{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 5, flexDirection: "row", flexWrap: "wrap" }}>
          {address.length > 0 &&
            address.map((info) => (
              <TouchableOpacity
                key={info._id}
                style={{
                  height: 100,
                  width: Width / 2 - 11,
                  backgroundColor: selected === info ? "#EDFBEE" : "#fff",
                  margin: 3,
                  borderRadius: 8,
                  padding: 8,
                  borderColor: selected === info ? "#EDFBEE" : null,
                  borderWidth: selected === info ? 0.5 : 0,

                  //   borderBottomWidth:
                  justifyContent: "center",
                  alignItems: "center",
                  //   shadowColor: "#000",
                  //   shadowOffset: { width: 0, height: 1 },
                  //   shadowOpacity: 1,
                  //   shadowRadius: 2,
                  //   elevation: 5,
                }}
                onPress={() => setSelected(info)}
              >
                {selected === info ? (
                  <View
                    style={{
                      height: 100,
                      width: 5,
                      backgroundColor: "#53D451",
                      opacity: 1,
                      position: "absolute",
                      left: 0,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  />
                ) : null}
                <View>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-SemiBold" : null,
                      fontSize: 12,
                    }}
                  >
                    {info.recipient_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat" : null,
                      marginTop: 3,
                      fontSize: 12,
                    }}
                  >
                    {info.recipient_address}
                  </Text>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      marginTop: 3,
                      fontSize: 12,
                    }}
                  >
                    {info.recipient_phone}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
            }}
          >
            Products ({cart.cartItems.length})
          </Text>
        </View>
        <View
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {cart.cartItems &&
            cart.cartItems.map((item) => (
              <View
                key={item._id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  flexDirection: "row",
                  width: Width - 16,
                  marginTop: 5,
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
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 14,
                    }}
                  >
                    {item.product.title.slice(0, 35)}...
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
                      {item.product.currency}{" "}
                      {item.product.price.discounted
                        ? item.product.price.discount
                        : item.product.price.original}{" "}
                      × {item.qty}
                    </Text>

                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-Medium" : null,
                      }}
                    >
                      Item Total: BDT{" "}
                      {item.product.price.discounted
                        ? item.product.price.discount * item.qty
                        : item.product.price.original * item.qty}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
        <View
          style={{
            margin: 8,
            backgroundColor: "#fff",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                fontSize: 13,
              }}
            >
              Total Item Price ({totalItem} {totalItem > 1 ? "Items" : "Item"})
            </Text>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                fontSize: 13,
              }}
            >
              BDT {cartTotal}
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
              Delivery Charge
            </Text>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-Medium" : null,
                fontSize: 13,
              }}
            >
              BDT {delivery ? delivery : 0}
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
              Discount (- 10%)
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
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value={coupon}
              placeholder="Enter Coupon Code (If Any)"
              onChangeText={setCoupon}
              style={{
                fontFamily: loaded ? "Montserrat" : null,
                // height: 38,
                width: 250,
                borderRadius: 5,
                borderColor: "#FB6A43",
                borderWidth: 1,
                padding: 3,
                // backgroundColor: "#fff",
              }}
            />
            <TouchableOpacity
              style={{
                width: 100,
                backgroundColor: "#FB6A43",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 8, marginRight: 8 }}>
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
              marginBottom: 5,
            }}
          >
            Payment Method
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "COD" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => setPayment("COD")}
          >
            {payment === "COD" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/cod.png")}
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                Cash On Delivery
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "bKash" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => setPayment("bKash")}
          >
            {payment === "bKash" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                // resizeMode="contain"
                source={require("../assets/bkash.png")}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                }}
              >
                bKash Checkout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "SSL" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
              marginBottom: 100,
            }}
            onPress={() => setPayment("SSL")}
          >
            {payment === "SSL" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/ssl.png")}
                style={{
                  height: 30,
                  width: 150,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                }}
              >
                VISA/Mastercard
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          width: Width,
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 15,
            }}
          >
            Payable: BDT {orderTotal}
          </Text>
          <Text
            style={{
              fontFamily: loaded ? "Montserrat" : null,
            }}
          >
            (VAT Included)
          </Text>
        </View>
        <TouchableOpacity onPress={handlePlaceOrder}>
          <View
            style={{
              backgroundColor: "#1461AC",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 15,
                color: "#fff",
              }}
            >
              Place Order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
