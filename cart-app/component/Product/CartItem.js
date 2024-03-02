import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function CartItem({
  product,
  handleIncrement,
  handleDecrement,
  handleSetZero,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Image
        source={{ uri: product.url }}
        style={{ width: 100, height: 100, flex: 1 }}
      />
      <Text style={{ flex: 1, textAlign: "center" }}>{product.name}</Text>
      <Text style={{ flex: 1, textAlign: "center" }}>{product.price}元/个</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Button
          hitSlop={10}
          title="-"
          onPress={() => handleDecrement(product)}
        />
        <Text style={{ width: 30, textAlign: "center" }}>{product.count}</Text>
        <Button
          hitSlop={10}
          title="+"
          onPress={() => handleIncrement(product)}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Button
          hitSlop={10}
          color={"red"}
          title="移除商品"
          onPress={() => handleSetZero(product)}
        />
      </View>
    </View>
  );
}
