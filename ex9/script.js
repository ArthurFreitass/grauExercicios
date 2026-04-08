import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function TelaPerfil() {
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');

  // PASSO 4: useEffect para carregar o nome ao abrir o app
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const valor = await AsyncStorage.getItem('@meu_nome');
      if (valor !== null) {
        setNomeSalvo(valor);
      }
    } catch (e) {
      console.log("Erro ao carregar:", e);
    }
  };

  // PASSO 3: Salvar no AsyncStorage
  const salvarNome = async () => {
    if (nome.trim() === '') return;
    try {
      await AsyncStorage.setItem('@meu_nome', nome);
      setNomeSalvo(nome);
      setNome('');
      Alert.alert('Sucesso', 'Nome salvo com sucesso!');
    } catch (e) {
      console.log("Erro ao salvar:", e);
    }
  };

  // PASSO 5: Remover do AsyncStorage
  const apagarNome = async () => {
    try {
      await AsyncStorage.removeItem('@meu_nome');
      setNomeSalvo('');
      Alert.alert('Limpo', 'Dados removidos!');
    } catch (e) {
      console.log("Erro ao apagar:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>
          {nomeSalvo ? `Bem-vindo de volta, ${nomeSalvo}!` : 'Olá! Qual o seu nome?'}
        </Text>

        {/* PASSO 2: TextInput e Botões */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome aqui..."
          value={nome}
          onChangeText={setNome}
        />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvarNome}>
          <Text style={styles.btnText}>Salvar Nome</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApagar} onPress={apagarNome}>
          <Text style={styles.btnText}>Apagar Registro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// PASSO 1: Configuração do Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Perfil" 
          component={TelaPerfil} 
          options={{ title: 'Meu Perfil' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1E21',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  btnSalvar: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnApagar: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
