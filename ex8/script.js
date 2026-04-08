import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

// PASSO 2 e 6: Telas com textos explicativos
function Inicio({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Bem-vindo à Loja! 🏠</Text>
      {/* PASSO 4 e 5: Botão para abrir o Drawer */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>Abrir Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

function MeusPedidos() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Histórico de Pedidos 📦</Text>
      <Text style={styles.subtitle}>Aqui você acompanha suas compras recentes.</Text>
    </View>
  );
}

function Suporte() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Central de Ajuda 🎧</Text>
      <Text style={styles.subtitle}>Precisa de auxílio? Fale conosco agora.</Text>
    </View>
  );
}

// PASSO 1: Criando o Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* PASSO 3: Configurando o Navigator */}
      <Drawer.Navigator 
        screenOptions={{
          drawerActiveTintColor: '#e91e63',
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen name="Inicio" component={Inicio} options={{ title: 'Início' }} />
        <Drawer.Screen name="MeusPedidos" component={MeusPedidos} options={{ title: 'Meus Pedidos' }} />
        <Drawer.Screen name="Suporte" component={Suporte} options={{ title: 'Suporte' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
