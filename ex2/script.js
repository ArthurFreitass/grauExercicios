import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

export default function App() {
  // PASSO 1: Estado começando vazio
  const [contatos, setContatos] = useState([]);

  // PASSO 5: Função para carregar contatos fictícios
  const carregarContatos = () => {
    const novosContatos = [
      { id: '1', nome: 'Ana Silva', email: 'ana.silva@email.com' },
      { id: '2', nome: 'Bruno Souza', email: 'bruno.souza@email.com' },
      { id: '3', nome: 'Carla Oliveira', email: 'carla.oli@email.com' },
      { id: '4', nome: 'Diego Santos', email: 'diego.santos@email.com' },
    ];
    setContatos(novosContatos);
  };

  // PASSO 3: Componente de Lista Vazia
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyText}>Sem contatos. Sua lista está vazia.</Text>
    </View>
  );

  // PASSO 4: Componente de Cabeçalho
  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Minha Agenda</Text>
    </View>
  );

  // PASSO 6: Separador de Itens
  const ItemSeparatorComponent = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* PASSO 2: Configuração da FlatList */}
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemEmail}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={contatos.length === 0 ? { flex: 1 } : null}
      />

      {/* PASSO 5: Botão fora da lista */}
      <TouchableOpacity style={styles.button} onPress={carregarContatos}>
        <Text style={styles.buttonText}>Carregar Contatos</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  itemCard: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  itemEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
