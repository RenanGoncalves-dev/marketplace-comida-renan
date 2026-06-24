import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import styles, { colors } from '../styles';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // NOVA STATE: Para mostrar o erro direto no meio da tela
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    Keyboard.dismiss();
    setErrorMessage(''); // Limpa erros anteriores
    setSuccessMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage("Por favor, preencha todos os campos.");
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
        setSuccessMessage("Conta criada com sucesso! Mude para o Login.");
      }
    } catch (error) {
      console.log("ERRO NO TERMINAL:", error.code); // Só por garantia

      // Tradução dos erros direto na variável que aparece na tela
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage("Este e-mail já está cadastrado.");
          break;
        case 'auth/invalid-email':
          setErrorMessage("O formato do e-mail é inválido.");
          break;
        case 'auth/weak-password':
          setErrorMessage("A senha precisa ter pelo menos 6 caracteres.");
          break;
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          setErrorMessage("E-mail ou senha incorretos.");
          break;
        default:
          setErrorMessage("Erro na autenticação: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSuccessMessage('');
    setErrorMessage('');
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>{isLogin ? 'Entrar' : 'Cadastrar-se'}</Text>
          
          {/* SE HOUVER ERRO, MOSTRA ESSA CAIXA VERMELHA NA TELA */}
          {errorMessage ? (
            <View style={{ backgroundColor: '#fde8e8', padding: 12, borderRadius: 6, marginBottom: 16, borderWidth: 1, borderColor: '#f8b4b4' }}>
              <Text style={{ color: '#e74c3c', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* SE HOUVER SUCESSO, MOSTRA ESSA CAIXA VERDE NA TELA */}
          {successMessage ? (
            <View style={{ backgroundColor: '#def7ec', padding: 12, borderRadius: 6, marginBottom: 16, borderWidth: 1, borderColor: '#b3f5d4' }}>
              <Text style={{ color: '#2ecc71', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>{successMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
          </View>

          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>{isLogin ? 'Acessar' : 'Criar Conta'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setErrorMessage(''); setSuccessMessage(''); }} style={{ marginTop: 16 }}>
            <Text style={styles.switchAuthText}>
              {isLogin ? "Não tem conta? " : "Já tem uma conta? "}
              <Text style={styles.switchAuthLink}>{isLogin ? "Cadastre-se" : "Faça Login"}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={80} color={colors.primary} />
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      <View style={styles.profileMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('NewAd')}>
          <Ionicons name="add-circle-outline" size={24} color={colors.textDark} />
          <Text style={styles.menuButtonText}>Anunciar novo item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, styles.logoutButton]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.primary} />
          <Text style={[styles.menuButtonText, styles.logoutButtonText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}