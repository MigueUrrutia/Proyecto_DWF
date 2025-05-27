import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const estados = ['Recibido', 'Preparando', 'Listo para entrega', 'Entregado'];

export default function TrackingScreen() {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPaso((prev) => (prev < estados.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <ImageBackground source={require('../../assets/bg_pan_dulce.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Seguimiento del Pedido</Text>
        {estados.map((estado, i) => (
          <Text key={i} style={i === paso ? styles.active : styles.inactive}>
            {i <= paso ? '🟢' : '⚪'} {estado}
          </Text>
        ))}
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
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333'
  },
  active: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 12
  },
  inactive: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 12
  }
});
