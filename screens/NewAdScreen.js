import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import styles from '../styles';

export default function NewAdScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // States para exibir mensagens direto na tela sem travar o app com Alert
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateAd = async () => {
    Keyboard.dismiss();
    setErrorMessage('');
    setSuccessMessage('');

    // Validação de campos vazios
    if (!title.trim() || !description.trim() || !price.trim()) {
      return setErrorMessage("Por favor, preencha todos os campos.");
    }

    // Validação extra de segurança: o usuário precisa estar logado para anunciar
    if (!auth.currentUser) {
      return setErrorMessage("Você precisa estar logado no seu perfil para anunciar.");
    }

    try {
      // Envia os dados para a coleção "announcements" no Firestore
      await addDoc(collection(db, "announcements"), {
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price.replace(',', '.')), // Corrige vírgula para ponto decimal
        userId: auth.currentUser.uid,
        userName: auth.currentUser.email.split('@')[0], 
        createdAt: serverTimestamp()
      });

      setSuccessMessage("Alimento anunciado com sucesso! Redirecionando...");
      
      // Limpa os campos após o sucesso (CORRIGIDO AQUI)
      setTitle('');
      setDescription('');
      setPrice(''); // <--- Corrigido de price('') para setPrice('')

      // Espera 2 segundos para o usuário ver a mensagem verde e volta para a Home
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);

    } catch (error) {
      console.log("Erro no Firestore:", error.message);
      setErrorMessage("Erro ao publicar anúncio: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <Text style={styles.authTitle}>O que você vai vender hoje?</Text>

      {/* Caixa de aviso de erro */}
      {errorMessage ? (
        <View style={{ backgroundColor: '#fde8e8', padding: 12, borderRadius: 6, marginBottom: 16, borderWidth: 1, borderColor: '#f8b4b4' }}>
          <Text style={{ color: '#e74c3c', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Caixa de aviso de sucesso */}
      {successMessage ? (
        <View style={{ backgroundColor: '#def7ec', padding: 12, borderRadius: 6, marginBottom: 16, borderWidth: 1, borderColor: '#b3f5d4' }}>
          <Text style={{ color: '#2ecc71', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Título do Alimento/Refeição</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Lasanha de Carne 500g" 
          value={title} 
          onChangeText={setTitle} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Descrição Detalhada</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Descreva os ingredientes, se serve bem, etc..." 
          value={description} 
          onChangeText={setDescription} 
          multiline 
          numberOfLines={4} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Preço (R$)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="0.00" 
          value={price} 
          onChangeText={setPrice} 
          keyboardType="numeric" 
        />
      </View>

      <TouchableOpacity style={styles.authButton} onPress={handleCreateAd}>
        <Text style={styles.authButtonText}>Publicar Anúncio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}