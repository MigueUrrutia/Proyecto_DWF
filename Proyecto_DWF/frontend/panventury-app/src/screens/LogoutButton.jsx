import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.text}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});