import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        margin: 30,
      }}
    >
      <View>
        <Text style={styles.title}>欢迎光临</Text>
        <Text style={styles.title}>巴布小店</Text>
      </View>
      <View style={styles.btn}>
        <Button
          color="#BDB76B"
          title="由此进店"
          onPress={() => navigation.navigate("BabuStore")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#DAA520",
    fontFamily: "华文彩云",
    margin: 10,
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  btn: {
    width: 100,
    margin: 30,
  },
});
