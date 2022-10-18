import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getArea, getCity, getZone } from "../actions";
import { Picker } from "@react-native-picker/picker";

/**
 * @author
 * @function Address
 **/

const Width = Dimensions.get("window").width;
export const Address = (props) => {
  const { container } = styles;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState({ city_name: "", city_id: 0 });
  const [zone, setZone] = useState({ zone_name: "", zone_id: 0 });
  const [area, setArea] = useState({ area_name: "", area_id: 0 });
  const [phone, setPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");

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
    dispatch(getCity());
  }, []);

  useEffect(() => {
    const data = { city_id: city.city_id };
    dispatch(getZone(data));
  }, [city]);

  useEffect(() => {
    const data = { zone_id: zone.zone_id };
    dispatch(getArea(data));
  }, [zone]);

  const courier = useSelector((state) => state.courier);
  const address = useSelector((state) => state.address.address);

  const saveAddress = () => {
    const data = {
      recipient_name: fullName,
      recipient_phone: phone,
      recipient_city: city,
      recipient_zone: zone,
      recipient_area: area,
      recipient_address: userAddress,
    };
  };

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 15,
              }}
            >
              Add New Address
            </Text>
          </View>
          <View>
            <TextInput
              value={fullName}
              placeholder="Enter Full Name"
              onChangeText={setFullName}
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                height: 40,
                borderRadius: 5,
                padding: 10,
                backgroundColor: "#fff",
              }}
              keyboardType="default"
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                height: 40,
                width: Width / 2 - 25,
                backgroundColor: "#fff",
                justifyContent: "center",
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={city}
                onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
              >
                <Picker.Item label="Select District" value={0} />
                {courier.city !== null &&
                  courier.city.map((info) => (
                    <Picker.Item
                      key={info.city_id}
                      label={info.city_name}
                      value={info}
                    />
                  ))}
              </Picker>
            </View>

            <View
              style={{
                height: 40,
                width: Width / 2,
                backgroundColor: "#fff",
                justifyContent: "center",
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={zone}
                onValueChange={(itemValue, itemIndex) => setZone(itemValue)}
              >
                <Picker.Item label="Select Zone" value={0} />
                {courier.zone !== null &&
                  courier.zone.map((info) => (
                    <Picker.Item
                      key={info.zone_id}
                      label={info.zone_name}
                      value={info}
                    />
                  ))}
              </Picker>
            </View>
          </View>
          <View
            style={{
              height: 40,
              width: Width - 20,
              backgroundColor: "#fff",
              justifyContent: "center",
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
            }}
          >
            <Picker
              selectedValue={area}
              onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
            >
              <Picker.Item label="Select Area" value={0} />
              {courier.area !== null &&
                courier.area.map((info) => (
                  <Picker.Item
                    key={info.area_id}
                    label={info.area_name}
                    value={info}
                  />
                ))}
            </Picker>
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              value={phone}
              placeholder="Enter Phone Number"
              onChangeText={setPhone}
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                height: 40,
                borderRadius: 5,
                padding: 10,
                backgroundColor: "#fff",
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              value={userAddress}
              placeholder="Enter Street Address"
              onChangeText={setUserAddress}
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                height: 80,
                borderRadius: 5,
                padding: 10,
                backgroundColor: "#fff",
              }}
              keyboardType="default"
              multiline={true}
            />
          </View>
        </View>
        <TouchableOpacity style={{ margin: 20 }}>
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
                color: "#fff",
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
              }}
            >
              Save Address
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ margin: 5 }}>
          {address.length > 0 &&
            address.map((info) => (
              <View
                key={info._id}
                style={{
                  margin: 5,
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                    fontSize: 14,
                  }}
                >
                  {info.recipient_name}
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat" : null,
                    marginTop: 3,
                    fontSize: 14,
                  }}
                >
                  {info.recipient_address}
                </Text>
                <Text
                  style={{
                    fontFamily: loaded ? "Montserrat-Medium" : null,
                    marginTop: 3,
                    fontSize: 14,
                  }}
                >
                  {info.recipient_phone}
                </Text>
                {info.isDefault ? (
                  <View
                    style={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      borderWidth: 1,
                      borderColor: "#017F6B",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: loaded ? "Montserrat-Medium" : null,
                        color: "#017F6B",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      Default
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
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
