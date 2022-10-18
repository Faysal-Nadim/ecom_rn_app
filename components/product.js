import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions";

/**
 * @author
 * @function Product
 **/

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
export const Product = ({ navigation }) => {
  // console.log(props);
  const product = require("../product.json");
  const dispath = useDispatch();

  const [modal, setModal] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [available, setAvailable] = useState(product.stock.qty);
  const [variation, setVariation] = useState(product.variations.skus[0].value);
  const [sku, setSku] = useState(product.variations.skus[0].sku);

  const avgRate =
    Object.keys(product.ratings).reduce((rating, key) => {
      return rating + +product.ratings[key].rating;
    }, 0) / product.ratings.length;

  const offer =
    product.discounted !== false &&
    100 - ((100 * product.price.discount) / product.price.original).toFixed(0);

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

  const addProductToCart = () => {
    const qty = 1;
    const item = {
      product: product,
      props: {
        name: product.variations.var_name,
        value: variation,
        sku: sku,
      },
    };
    dispath(addToCart(item, qty));
  };

  const { container } = styles;
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={container}>
        <View style={{ marginBottom: 30 }}>
          <View style={styles.slider}>
            <ScrollView
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}
            >
              {product.gallery.map((e, index) => (
                <Image
                  key={index}
                  source={{ uri: e.img }}
                  style={styles.wrapIamge}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.wrapDot}>
            {product.gallery.map((e, index) => (
              <Text
                key={e._id}
                style={activeImg == index ? styles.activeDot : styles.dot}
              >
                -
              </Text>
            ))}
          </View>
          <View
            style={{
              backgroundColor: "#F2F2F2",
              // borderColor: "#1461AC",
              // borderWidth: 1,
              borderRadius: 15,
              position: "relative",
              bottom: 20,
              padding: 10,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
                // backgroundColor: "#fff",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                    fontSize: 20,
                  }}
                >
                  BDT{" "}
                  {product.price.discounted
                    ? product.price.discount.toFixed(2)
                    : product.price.original.toFixed(2)}
                </Text>
                {product.price.discounted ? (
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat" : null,
                        left: 5,
                        fontSize: 12,
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        color: "#999999",
                      }}
                    >
                      BDT {product.price.original.toFixed(2)}
                    </Text>
                  </View>
                ) : null}
                {product.price.discounted ? (
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        left: 15,
                        fontSize: 14,
                        color: "#FE4646",
                        backgroundColor: "#FFF0F1",
                        padding: 3,
                        borderRadius: 5,
                        // borderWidth: 2,
                      }}
                    >
                      {offer}% OFF
                    </Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{
                      tintColor: "#1461AC",
                      height: 25,
                      width: 25,
                    }}
                    source={require("../assets/wishlist.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                }}
              >
                {product.title}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 5,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-SemiBold" : null,
                      // fontSize: 13,
                      color: "#000",
                    }}
                  >
                    {product.order_count}{" "}
                    {product.order_count <= 1 ? "Order" : "Orders"} |{" "}
                  </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={avgRate}
                    starSize={15}
                    fullStarColor={"#000"}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-SemiBold" : null,
                      fontSize: 13,
                      color: "#000",
                    }}
                  >
                    {" "}
                    {avgRate.toFixed(1)} ({product.ratings.length})
                  </Text>
                </View>
              </View>
              <View>
                {available > 0 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        marginTop: 5,
                        color: "#1461ac",
                      }}
                    >
                      {available} {product.stock.type} In Stock
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        marginTop: 5,
                        color: "#FE4646",
                      }}
                    >
                      Out Of Stock
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  fontSize: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                {product.variations.var_name}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingBottom: 5,
                }}
              >
                {product.variations.skus.map((skuData) => (
                  <TouchableOpacity
                    key={skuData._id}
                    onPress={() => {
                      setSku(skuData.sku);
                      setAvailable(skuData.stock);
                      setVariation(skuData.value);
                    }}
                  >
                    {skuData.img !== null ? (
                      <Image
                        resizeMode="contain"
                        source={{ uri: skuData.img }}
                        style={{
                          marginTop: 5,
                          marginRight: 8,
                          borderRadius: 3,
                          height: 60,
                          width: 70,
                          borderWidth: sku === skuData.sku ? 1.5 : 0.3,
                          borderColor:
                            sku === skuData.sku ? "#1461AC" : "black",
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          marginTop: 5,
                          marginRight: 8,
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 5,
                          borderRadius: 5,
                          height: 40,
                          width: 50,
                          backgroundColor: "#f2f2f2",
                          borderWidth: sku === skuData.sku ? 1 : 0,
                          borderColor: "#1461AC",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: loaded ? "Montserrat-Medium" : null,
                            fontSize: 15,
                            textAlign: "center",
                          }}
                        >
                          {skuData.value}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                Discounts & Coupons
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#f2f2f2",
                      borderRadius: 5,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      width: Width / 2 - 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        color: "#FE4646",
                      }}
                    >
                      BDT 250 OFF
                    </Text>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        color: "#FE4646",
                      }}
                    >
                      New User Only
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#f2f2f2",
                      borderRadius: 5,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      width: Width / 2 - 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        color: "#FE4646",
                      }}
                    >
                      Flat 5% OFF
                    </Text>
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-SemiBold" : null,
                        fontSize: 13,
                        color: "#FE4646",
                      }}
                    >
                      Orders Over BDT 5000
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // marginTop: 5,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    fontSize: 15,
                  }}
                >
                  Specifications
                </Text>
                <Image
                  resizeMode="contain"
                  source={require("../assets/right-arrow.png")}
                  style={{
                    height: 15,
                    width: 15,
                    opacity: 0.3,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#909090",
                  opacity: 0.5,
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 15,
                    }}
                  >
                    Shipping Methods
                  </Text>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 12,
                      opacity: 0.5,
                      marginLeft: 10,
                    }}
                  >
                    COD Available
                  </Text>
                </View>
                <Image
                  resizeMode="contain"
                  source={require("../assets/right-arrow.png")}
                  style={{
                    height: 15,
                    width: 15,
                    opacity: 0.3,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#909090",
                  opacity: 0.5,
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 15,
                    }}
                  >
                    Service
                  </Text>
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-Medium" : null,
                      fontSize: 12,
                      opacity: 0.5,
                      marginLeft: 10,
                    }}
                  >
                    7 Days Return & Exchange T&C*
                  </Text>
                </View>
                <Image
                  resizeMode="contain"
                  source={require("../assets/right-arrow.png")}
                  style={{
                    height: 15,
                    width: 15,
                    opacity: 0.3,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                    fontSize: 15,
                  }}
                >
                  Reviews ({product.ratings.length})
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={avgRate}
                    starSize={15}
                    fullStarColor={"#FE4646"}
                  />
                  <Text
                    style={{
                      fontFamily: loaded ? "Montserrat-SemiBold" : null,
                      fontSize: 13,
                      color: "#FE4646",
                    }}
                  >
                    {" "}
                    {avgRate.toFixed(1)}{" "}
                  </Text>
                  <Image
                    resizeMode="contain"
                    source={require("../assets/right-arrow.png")}
                    style={{
                      height: 12,
                      width: 15,
                      opacity: 0.5,
                      marginLeft: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {product.ratings.map((rateInfo) => (
                <View
                  key={rateInfo._id}
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Image
                        resizeMode="contain"
                        source={{ uri: rateInfo.img }}
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        paddingLeft: 20,
                        flex: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                          fontSize: 12,
                          opacity: 0.5,
                        }}
                      >
                        {rateInfo.user} - {rateInfo.date}
                      </Text>
                      <Text
                        style={{
                          fontFamily: loaded ? "Montserrat-SemiBold" : null,
                          fontSize: 12,
                          // opacity: 0.5,
                        }}
                      >
                        {rateInfo.feedBack}
                      </Text>
                      {/* <Text>User: {rateInfo.feedback}</Text> */}
                    </View>
                  </View>
                  <View style={{ right: 0, position: "absolute" }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rateInfo.rating}
                      starSize={10}
                      fullStarColor={"#000"}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View>
          <Modal
            isVisible={modal}
            style={styles.view}
            animationInTiming={500}
            animationOutTiming={500}
            onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
          >
            <View>
              <Text>Hello!</Text>
              <Text>Hello!</Text>
              <Text>Hello!</Text>
              <Text>Hello!</Text>
              <Button title="Hide modal" onPress={() => setModal(false)} />
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: Width,
          bottom: 0,
          left: 0,
          flexDirection: "row",
          height: 55,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            // justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 35,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../assets/help.png")}
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Text
              style={{
                fontFamily: loaded ? "Montserrat" : null,
                fontSize: 12,
                marginTop: 3,
              }}
            >
              Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 20,
              height: 25,
              width: 35,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../assets/chat.png")}
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Text
              style={{
                fontFamily: loaded ? "Montserrat" : null,
                fontSize: 12,
                marginTop: 3,
                // opacity: 0.5,
              }}
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#1461AC",
                height: 40,
                width: Width / 3,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Buy Now
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={addProductToCart}>
            <View
              style={{
                backgroundColor: "#F29200",
                height: 40,
                width: Width / 3,
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Add To Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    height: Height * 0.4,
    width: Width,
  },
  wrapIamge: {
    flex: 1,
    alignItems: "center",
    height: Height * 0.4,
    width: Width,
    // alignSelf: "flex-end",
  },
  wrapDot: {
    position: "relative",
    bottom: 30,
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
  btnNormal: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: "blue",
    borderWidth: 1,
    height: 30,
    width: 100,
  },
  view: {
    margin: 0,
    // justifyContent: "flex-end",
    marginTop: Height / 2,
    // marginBottom: 0,
    // marginRight: 0,
    // marginLeft: 0,
    height: 150,
    // width: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
