import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // PASSO 4

// PASSO 2: Componentes Simples de Tela
const Dashboard = () => (
  <View style={styles.screen}><Text style={styles.text}>Gráficos e Estatísticas 📊</Text></View>
);
const Notificacoes = () => (
  <View style={styles.screen}><Text style={styles.text}>Central de Avisos 🔔</Text></View>
);
const Configuracoes = () => (
  <View style={styles.screen}><Text style={styles.text}>Ajustes do Perfil ⚙️</Text></View>
);

// PASSO 1: Criando o Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // PASSO 5: Lógica de ícones (Focused vs Outline)
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            } else if (route.name === 'Notificacoes') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Configuracoes') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // PASSO 6: Configuração de Cores (Verde no exemplo)
          tabBarActiveTintColor: '#4caf50',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#4caf50' },
          headerTintColor: '#fff',
        })}
      >
        {/* PASSO 3: Adicionando as telas */}
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Notificacoes" component={Notificacoes} />
        <Tab.Screen name="Configuracoes" component={Configuracoes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
