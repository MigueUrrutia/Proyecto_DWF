import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function OperatorDashboardScreen() {
  const [tab, setTab] = useState('inventario');
  const [productos] = useState([
    { id: '1', name: 'Pan dulce', price: 0.5 },
    { id: '2', name: 'Semita', price: 0.4 }
  ]);
  const [pedidos, setPedidos] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({});

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    axios.get('http://localhost:8080/api/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => console.error(error));
  };

  const actualizarEstado = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/pedidos/${id}/estado`, {
        estado: estadoSeleccionado[id] || 'Preparando'
      });
      Alert.alert('Éxito', 'Estado actualizado');
      cargarPedidos();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el estado');
    }
  };

  const renderPedido = ({ item }) => {
    let estadoColor = '#ccc';
    switch (item.estado) {
      case 'Preparando': estadoColor = '#f0ad4e'; break;
      case 'Listo para entrega': estadoColor = '#5bc0de'; break;
      case 'Entregado': estadoColor = '#5cb85c'; break;
    }

    return (
      <View style={[styles.card, { borderLeftWidth: 6, borderLeftColor: estadoColor }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Pedido #{item.id}</Text>
        <Text>Cliente: {item.nombreCliente}</Text>
        <Text>Estado actual: <Text style={{ color: estadoColor }}>{item.estado}</Text></Text>

        <Picker
          selectedValue={estadoSeleccionado[item.id] || item.estado}
          onValueChange={(value) =>
            setEstadoSeleccionado((prev) => ({ ...prev, [item.id]: value }))
          }>
          <Picker.Item label="Preparando" value="Preparando" />
          <Picker.Item label="Listo para entrega" value="Listo para entrega" />
          <Picker.Item label="Entregado" value="Entregado" />
        </Picker>

        <Button title="Actualizar Estado" onPress={() => actualizarEstado(item.id)} />
      </View>
    );
  };

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
              data={productos}
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
              data={pedidos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPedido}
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