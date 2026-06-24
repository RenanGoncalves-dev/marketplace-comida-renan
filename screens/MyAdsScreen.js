import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import ProductCard from '../components/ProductCard';
import styles from '../styles';

export default function MyAdsScreen() {
  const [myAds, setMyAds] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Filtra no próprio Firestore trazendo apenas os anúncios do ID do usuário ativo
    const q = query(
      collection(db, "announcements"), 
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const adsList = [];
      snapshot.forEach((doc) => {
        adsList.push({ id: doc.id, ...doc.data() });
      });
      setMyAds(adsList);
    });

    return () => unsubscribe();
  }, []);

  const handleBuy = () => {
    Alert.alert("Aviso", "Você não pode comprar seu próprio produto. Tente novamente mais tarde.");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.authTitle, { marginTop: 15 }]}>Meus Itens Cadastrados</Text>
      
      {myAds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não cadastrou nenhum alimento.</Text>
        </View>
      ) : (
        <FlatList
          data={myAds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} onBuy={handleBuy} />}
        />
      )}
    </View>
  );
}