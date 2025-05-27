import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, ImageBackground } from 'react-native';

const dummyProducts = [
  { id: '1', name: 'Pan dulce', price: 0.5 },
  { id: '2', name: 'Semita', price: 0.4 }
];

const dummyOrders = [
  { id: 'A01', user: 'juan@example.com', estado: 'Preparando' },
  { id: 'A02', user: 'ana@example.com', estado: 'Listo para entrega' }
];

export default function OperatorDashboardScreen() {
  const [tab, setTab] = useState('inventario');

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.tabBar}>
          <Button title="Inventario" onPress={() => setTab('inventario')} color={tab === 'inventario' ? '#1E90FF' : '#ccc'} />
          <Button title="Pedidos" onPress={() => setTab('pedidos')} color={tab === 'pedidos' ? '#1E90FF' : '#ccc'} />
        </View>

        {tab === 'inventario' && (
          <View style={styles.section}>
            <Text style={styles.title}>Gestión de Productos</Text>
            <FlatList
              data={dummyProducts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text>{item.name} - ${item.price}</Text>
                  <View style={styles.actions}>
                    <Button title="Editar" onPress={() => {}} />
                    <Button title="Eliminar" onPress={() => {}} color="red" />
                  </View>
                </View>
              )}
            />
            <Text style={styles.subtitle}>Agregar nuevo producto</Text>
            <TextInput style={styles.input} placeholder="Nombre" />
            <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" />
            <Button title="Agregar" onPress={() => {}} color="green" />
          </View>
        )}

        {tab === 'pedidos' && (
          <View style={styles.section}>
            <Text style={styles.title}>Seguimiento de Pedidos</Text>
            <FlatList
              data={dummyOrders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text>Pedido {item.id} - {item.user}</Text>
                  <Text>Estado actual: {item.estado}</Text>
                  <Button title="Actualizar Estado" onPress={() => {}} />
                </View>
              )}
            />
          </View>
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
    padding: 16
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  section: { flex: 1 },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333'
  },
  subtitle: { marginTop: 16, fontWeight: '600' },
  card: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#fff'
  }
});
