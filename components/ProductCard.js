import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function ProductCard({ item, onBuy }) {
  // Formata o timestamp do Firebase para String legível
  const formattedDate = item.createdAt?.toDate 
    ? item.createdAt.toDate().toLocaleString('pt-BR') 
    : new Date().toLocaleString('pt-BR');

  return (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>R$ {parseFloat(item.price).toFixed(2)}</Text>
      </View>
      
      <Text style={styles.metaText}>Vendedor: {item.userName}</Text>
      <Text style={styles.metaText}>Publicado em: {formattedDate}</Text>
      
      <Text style={styles.productDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}