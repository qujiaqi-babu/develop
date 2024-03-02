import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import CartItem from "./CartItem";

const RequestStatus = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const DisplayStatus = {
  PRODUCT: "PRODUCT",
  CART: "CART",
};

export default function ProductList({ productInfo }) {
  const [products, setProducts] = useState([]);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.IDLE);
  const [displayStatus, setDisplayStatus] = useState(DisplayStatus.PRODUCT);

  // 计算购物车中商品总件数
  const totalNum = products.reduce((sum, product) => {
    return sum + product.count;
  }, 0);

  // 计算购物车中商品总价
  const totalPrice = products.reduce((sum, product) => {
    return sum + product.price * product.count;
  }, 0);

  // 通过 fetch 走本地 json 数据获取商品列表
  const forkFetch = () => {
    return new Promise((resolve) => {
      const data = productInfo;
      // 模拟网络延时
      setTimeout(() => {
        resolve(data);
      }, 2 * 1000);
    });
  };

  // 依赖项置为空, 只执行一次
  useEffect(() => {
    // 等待容器加载数据
    setRequestStatus(RequestStatus.PENDING);
    forkFetch()
      .then((products) => {
        if (displayStatus === DisplayStatus.PRODUCT) setProducts(products);
        // 数据加载成功
        setRequestStatus(RequestStatus.SUCCESS);
      })
      .catch(() => {
        // 数据加载失败
        setRequestStatus(RequestStatus.ERROR);
      });
  }, [displayStatus]);

  // 更新商品列表,在商品对应索引位置进行替换
  const getUpdatedProducts = (product) => {
    const newProducts = [...products];
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        newProducts[i] = product;
        break;
      }
    }
    return newProducts;
  };

  // 添加到购物车,商品数量+1
  const handleAdd = (product) => {
    const newProduct = { ...product, count: product.count + 1 };
    const newProducts = getUpdatedProducts(newProduct);
    setProducts(newProducts);
    alert("添加了一件商品");
  };

  // 商品数量+1
  const handleIncrement = (product) => {
    const newProduct = { ...product, count: product.count + 1 };
    const newProducts = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  // 商品数量-1
  const handleDecrement = (product) => {
    const newCount = product.count - 1 >= 0 ? product.count - 1 : 0;
    const newProduct = { ...product, count: newCount };
    const newProducts = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  // 商品数量置为0
  const handleSetZero = (product) => {
    const newCount = 0;
    const newProduct = { ...product, count: newCount };
    const newProducts = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  if (requestStatus === RequestStatus.ERROR) {
    return <Text style={styles.loading}>网络出错了 orz</Text>;
  }
  if (requestStatus === RequestStatus.PENDING) {
    return <Text style={styles.loading}>商品加载中... ^o^</Text>;
  }

  // 显示商品列表
  if (
    requestStatus === RequestStatus.SUCCESS &&
    displayStatus === DisplayStatus.PRODUCT
  ) {
    return (
      <View>
        {/* 表头 */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            商品
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            名称
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            价格
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            操作
          </Text>
        </View>

        {/* 商品列表以滚动视图展示 */}
        <ScrollView>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              handleAdd={handleAdd}
            />
          ))}
        </ScrollView>

        {/* 购物车中商品总件数 */}
        <View
          style={{ marginTop: 30, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            购物车现含 {totalNum} 件商品
          </Text>
          <View style={{ flex: 1 }}>
            <Button
              title="查看购物车"
              onPress={() => {
                setRequestStatus(RequestStatus.IDLE);
                setDisplayStatus(DisplayStatus.CART);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  // 显示购物车
  if (
    requestStatus === RequestStatus.SUCCESS &&
    displayStatus === DisplayStatus.CART
  ) {
    return (
      <View>
        {/* 表头 */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            商品
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            名称
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            单价
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            数量
          </Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            删除
          </Text>
        </View>

        {/* 购物车列表以滚动视图展示 */}
        <ScrollView>
          {products.map((product) => {
            if (product.count)
              return (
                <CartItem
                  key={product.id}
                  product={product}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleSetZero={handleSetZero}
                />
              );
          })}
        </ScrollView>

        {/* 购物车中商品总价 */}
        <View
          style={{ marginTop: 30, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            总价：{totalPrice}
          </Text>
          <View style={{ flex: 1 }}>
            <Button
              title="结账"
              onPress={() => {
                setRequestStatus(RequestStatus.IDLE);
                if (!totalNum) {
                  alert("您尚未添加商品！正在返回商品列表");
                  setDisplayStatus(DisplayStatus.PRODUCT);
                } else {
                  products.forEach((product) => {
                    handleSetZero(product);
                  });
                  alert("支付成功！正在返回商品列表");
                }
                setDisplayStatus(DisplayStatus.PRODUCT);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    fontFamily: "华文新魏",
    margin: 10,
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
});
