import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard,
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

function ListaCompras() {
  const [item, setItem] = useState('');
  const [lista, setLista] = useState([]);

  // PASSO 6: Carregar lista ao abrir o app
  useEffect(() => {
    const carregarDados = async () => {
      const dadosSalvos = await AsyncStorage.getItem('@minha_lista');
      if (dadosSalvos) {
        setLista(JSON.parse(dadosSalvos)); // Converte string de volta para Array
      }
    };
    carregarDados();
  }, []);

  // PASSO 3: Salvar no estado e no AsyncStorage
  const adicionarItem = async () => {
    if (item.trim() === '') return;

    const novoItem = {
      id: Date.now().toString(),
      nome: item
    };

    const novaLista = [...lista, novoItem];
    setLista(novaLista);
    setItem('');
    Keyboard.dismiss();

    await AsyncStorage.setItem('@minha_lista', JSON.stringify(novaLista));
  };

  // PASSO 5: Remover item e atualizar disco
  const removerItem = async (id) => {
    const listaFiltrada = lista.filter(i => i.id !== id);
    setLista(listaFiltrada);
    await AsyncStorage.setItem('@minha_lista', JSON.stringify(listaFiltrada));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* PASSO 2: Input e Botão de Adicionar */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Novo item (ex: Arroz)"
          value={item}
          onChangeText={setItem}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={adicionarItem}>
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* PASSO 4: Renderização com FlatList */}
      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <TouchableOpacity onPress={() => removerItem(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#FF5252" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// PASSO 1: Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ListaCompras" 
          component={ListaCompras} 
          options={{ title: 'Minha Lista de Compras' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#EEE',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  btnAdd: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
});
