import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Espaçador invisível à esquerda para equilibrar o ícone da direita e manter a logo no centro */}
      <View style={{ width: 40 }} /> 
      
      <Image 
        source={{ uri: 'https://via.placeholder.com/130x45.png?text=Marketplace' }} // Substitua pela sua logo local se preferir
        style={styles.headerLogo} 
        resizeMode="contain" 
      />
      
      <TouchableOpacity 
        style={styles.headerIconBtn} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-circle-outline" size={32} color="#2c3e50" />
      </TouchableOpacity>
    </View>
  );
}