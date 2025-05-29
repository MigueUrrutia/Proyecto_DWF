import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LogoutButton({ navigation }) {
  const handleLogout = () => {
    localStorage.clear();
    navigation.replace('Login');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 6,
  }
});