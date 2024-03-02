import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function ProductItem({ product, handleAdd }) {
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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          hitSlop={10}
          title="添加到购物车"
          onPress={() => handleAdd(product)}
        />
      </View>
    </View>
  );
}
