import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// PASSO 2 e 3: Tela de Listagem com botões dinâmicos
function ListaProdutos({ navigation }) {
  const produtos = [
    { id: 1, nome: 'Notebook Pro', preco: 'R$ 5.500,00' },
    { id: 2, nome: 'Smartphone S24', preco: 'R$ 4.200,00' },
    { id: 3, nome: 'Fone Noise Cancelling', preco: 'R$ 1.200,00' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Produtos</Text>
      {produtos.map((produto) => (
        <TouchableOpacity
          key={produto.id}
          style={styles.card}
          onPress={() => navigation.navigate('DetalhesProduto', { 
            nome: produto.nome, 
            preco: produto.preco 
          })}
        >
          <Text style={styles.cardText}>Ver {produto.nome.split(' ')[0]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// PASSO 4 e 5: Tela de Detalhes recebendo os parâmetros
function DetalhesProduto({ route }) {
  // Recebendo os dados via route.params
  const { nome, preco } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.productName}>{nome}</Text>
      <Text style={styles.productPrice}>{preco}</Text>
    </View>
  );
}

// PASSO 1 e 6: Configuração do Stack e Título customizado
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ListaProdutos" 
          component={ListaProdutos} 
          options={{ title: 'Loja Tech' }} 
        />
        <Stack.Screen 
          name="DetalhesProduto" 
          component={DetalhesProduto} 
          options={{ title: 'Informações' }} // PASSO 6
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F2F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  productName: {
    fontSize: 32,
    fontWeight: 'bold', // PASSO 5
    color: '#222',
  },
  productPrice: {
    fontSize: 24,
    color: '#007BFF', // PASSO 5
    marginTop: 10,
    fontWeight: '500'
  },
});
