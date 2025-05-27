import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';

const products = [
  { id: '1', name: 'Salpor arroz', price: 0.5 },
  { id: '2', name: 'Pastel de chocolate', price: 1.5 },
  { id: '3', name: 'Galleta', price: 0.3 },
  { id: '4', name: 'Pan francés', price: 0.25 },
  { id: '5', name: 'Semita', price: 0.4 },
  { id: '6', name: 'Marquesote', price: 0.6 },
  { id: '7', name: 'Quesadilla salvadoreña', price: 1.0 },
  { id: '8', name: 'Pan de yema', price: 0.35 },
  { id: '9', name: 'Rollo de canela', price: 0.75 },
  { id: '10', name: 'Empanada de leche', price: 0.5 },
  { id: '11', name: 'Pan con crema', price: 1.2 }
];

export default function ProductsScreen() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const handleAdd = (item) => {
    const quantity = parseInt(quantities[item.id]) || 1;
    addToCart(item, quantity);
    Alert.alert('Agregado', `${item.name} x${quantity} agregado al carrito`);
    setQuantities({ ...quantities, [item.id]: '' });
  };

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name} - ${item.price}</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={quantities[item.id]}
                onChangeText={(value) => setQuantities({ ...quantities, [item.id]: value })}
              />
              <Button title="AGREGAR" color="#1E90FF" onPress={() => handleAdd(item)} />
            </View>
          )}
        />
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
  card: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2
  },
  name: {
    fontSize: 16,
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9'
  }
});
