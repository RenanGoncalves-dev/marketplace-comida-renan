import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de ter instalado ou use o Picker nativo se der erro
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles, { colors } from '../styles';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('Todos');
  const [buyMessage, setBuyMessage] = useState(''); // Substitito seguro para o Alert que trava

  useEffect(() => {
    // Busca os anúncios no Firestore ordenados do mais novo para o mais antigo
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ads = [];
      const users = new Set(); // Set não permite nomes duplicados
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ads.push({ id: doc.id, ...data });
        if (data.userName) {
          users.add(data.userName);
        }
      });
      
      setAnnouncements(ads);
      setFilteredAnnouncements(ads);
      setUsersList(['Todos', ...Array.from(users)]);
      setLoading(false);
    }, (error) => {
      console.log("Erro ao buscar anúncios:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Controla o Filtro (Desafio)
  const handleFilterUser = (user) => {
    setSelectedUser(user);
    if (user === 'Todos') {
      setFilteredAnnouncements(announcements);
    } else {
      const filtered = announcements.filter(ad => ad.userName === user);
      setFilteredAnnouncements(filtered);
    }
  };

  const handleBuyPress = () => {
    setBuyMessage("Tente novamente mais tarde");
    setTimeout(() => setBuyMessage(''), 3000); // Some após 3 segundos
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* DESAFIO: FILTRO NO TOPO */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por Vendedor:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedUser}
            onValueChange={(itemValue) => handleFilterUser(itemValue)}
            style={styles.picker}
          >
            {usersList.map((user, index) => (
              <Picker.Item key={index} label={user} value={user} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Mensagem de erro temporária do botão Comprar */}
      {buyMessage ? (
        <View style={{ backgroundColor: colors.primary, padding: 10, margin: 10, borderRadius: 6 }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{buyMessage}</Text>
        </View>
      ) : null}

      {/* LISTA DE ANÚNCIOS */}
      <FlatList
        data={filteredAnnouncements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Formata a data de criação do Firestore
          const date = item.createdAt?.toDate() ? item.createdAt.toDate().toLocaleDateString('pt-BR') : '';
          const time = item.createdAt?.toDate() ? item.createdAt.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';

          return (
            <View style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>R$ {item.price?.toFixed(2)}</Text>
              </View>
              
              <Text style={styles.metaText}>Publicado por: @{item.userName}</Text>
              <Text style={styles.metaText}>Em: {date} às {time}</Text>
              
              {/* Descrição limitada a no máximo 3 linhas conforme o guia */}
              <Text style={styles.productDescription} numberOfLines={3}>
                {item.description}
              </Text>

              <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
                <Text style={styles.buyButtonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        // Caso não haja anúncios (Requisito do Desafio)
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>Nenhum anúncio encontrado</Text>
          </View>
        }
      />
    </View>
  );
}