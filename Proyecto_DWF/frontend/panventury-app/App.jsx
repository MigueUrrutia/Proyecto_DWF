import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import TrackingScreen from './src/screens/TrackingScreen';
import OperatorDashboardScreen from './src/screens/OperatorDashboardScreen';
import { CartProvider } from './src/context/CartContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Inicio': iconName = 'home-outline'; break;
            case 'Productos': iconName = 'cafe-outline'; break;
            case 'Carrito': iconName = 'cart-outline'; break;
            case 'Recibo': iconName = 'document-outline'; break;
            case 'Seguimiento': iconName = 'navigate-outline'; break;
            case 'Operador': iconName = 'settings-outline'; break;
            default: iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Recibo" component={ReceiptScreen} />
      <Tab.Screen name="Seguimiento" component={TrackingScreen} />
      <Tab.Screen name="Operador" component={OperatorDashboardScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Pago" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}