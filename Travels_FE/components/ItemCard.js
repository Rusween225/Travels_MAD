import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ItemCard = ({ item, onCardPress }) => (
  <TouchableOpacity style={styles.card} onPress={onCardPress}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.body}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { marginTop: 5 },
});

export default ItemCard;
