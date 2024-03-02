import React from "react";
import { SafeAreaView } from "react-native";
import ProductList from "./ProductList";
import { ProductInfo } from "./productInfo";

export default function ProductDemo() {
  return (
    <SafeAreaView style={{ flex: 1, margin: 30 }}>
      <ProductList productInfo={ProductInfo} />
    </SafeAreaView>
  );
}
