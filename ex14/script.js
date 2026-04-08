import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  SafeAreaView 
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO DO SUPABASE ---
// Substitua pelas suas credenciais que estão em Settings > API no painel do Supabase
const SUPABASE_URL = 'https://SUA_URL_AQUI.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_AQUI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // PASSO 4: Função de Login
  const fazerLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      Alert.alert('Falha no Login', error.message);
    } else {
      // PASSO 5: Sucesso
      Alert.alert('Boas-vindas!', `Olá, ${data.user.email}!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Acesse sua Conta</Text>
        
        {/* PASSO 3: Inputs de E-mail e Senha */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={fazerLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Certifique-se de desativar a 'Confirmação de E-mail' no Supabase para testar agora.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerNote: {
    marginTop: 20,
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
