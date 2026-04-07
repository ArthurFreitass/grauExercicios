import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// PASSO 2: Componente TelaHome
function TelaHome({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>Bem-vindo ao App de Navegação!</Text>
      {/* PASSO 5: Navegação para 'Sobre' */}
      <Button 
        title="Ver Sobre" 
        onPress={() => navigation.navigate('Sobre')} 
      />
    </View>
  );
}

// PASSO 3: Componente TelaSobre
function TelaSobre({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.infoText}>Este app demonstra como funciona o Native Stack Navigator.</Text>
      {/* PASSO 6: Voltar para a tela anterior */}
      <Button 
        title="Voltar" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

// PASSO 4: Configuração do Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2196F3' }, // Cabeçalho Azul
          headerTintColor: '#fff', // Texto e Setinha Brancos
        }}
      >
        <Stack.Screen name="Home" component={TelaHome} options={{ title: 'Início' }} />
        <Stack.Screen name="Sobre" component={TelaSobre} options={{ title: 'Sobre o App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666'
  }
});
