import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FloatingButton = ({ count }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Clicks: {count}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default FloatingButton;
