import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleConfirm = () => {
    Alert.alert('Compra realizada', 'Gracias por tu pedido');
    clearCart();
    navigation.navigate('Main', { screen: 'Recibo' });
  };

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Confirmar Pedido</Text>
        {cart.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item.name} (x{item.quantity || 1}) - ${parseFloat(item.price * (item.quantity || 1)).toFixed(2)}
          </Text>
        ))}
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Button title="CONFIRMAR COMPRA" onPress={handleConfirm} color="#28A745" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 24,
    textAlign: 'center'
  }
});
