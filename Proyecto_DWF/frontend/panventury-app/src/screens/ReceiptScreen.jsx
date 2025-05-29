import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ReceiptScreen() {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const date = new Date().toLocaleString();

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Recibo de Compra</Text>
        <Text style={styles.date}>{date}</Text>
        {cart.length === 0 ? (
          <Text style={styles.empty}>No hay productos en el carrito</Text>
        ) : (
          <>
            {cart.map((item, i) => (
              <Text key={i} style={styles.item}>
                {item.name} (x{item.quantity || 1}) - ${parseFloat(item.price * (item.quantity || 1)).toFixed(2)}
              </Text>
            ))}
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          </>
        )}
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
    marginBottom: 12,
    textAlign: 'center',
    color: '#333'
  },
  date: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888'
  }
});
