import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Tu Carrito</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>
                {item.name} (x{item.quantity || 1}) - ${parseFloat(item.price * (item.quantity || 1)).toFixed(2)}
              </Text>
              <Button title="ELIMINAR" color="#FF6B6B" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Button title="Continuar al Pago" onPress={() => navigation.navigate('Pago')} color="#1E90FF" />
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
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333'
  },
  item: {
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    elevation: 2
  },
  text: {
    fontSize: 16,
    marginBottom: 8
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  }
});
