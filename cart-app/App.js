import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./component/home";
import ProductDemo from "./component/Product";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* 页面声明 */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BabuStore" component={ProductDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
