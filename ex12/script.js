import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// PASSO 2 ao 5: Lógica da Tela de Configurações
function TelaConfig() {
  const [notificacoes, setNotificacoes] = useState(false);
  const [som, setSom] = useState(false);
  const [biometria, setBiometria] = useState(false);

  // PASSO 5: Carregar valores do disco ao montar a tela
  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const pNotif = await AsyncStorage.getItem('@notificacoes');
        const pSom = await AsyncStorage.getItem('@som');
        const pBio = await AsyncStorage.getItem('@biometria');

        if (pNotif !== null) setNotificacoes(JSON.parse(pNotif));
        if (pSom !== null) setSom(JSON.parse(pSom));
        if (pBio !== null) setBiometria(JSON.parse(pBio));
      } catch (e) {
        console.error("Erro ao carregar configs", e);
      }
    };
    carregarConfiguracoes();
  }, []);

  // PASSO 4: Funções Toggle com persistência
  const toggleNotificacoes = async (valor) => {
    setNotificacoes(valor);
    await AsyncStorage.setItem('@notificacoes', JSON.stringify(valor));
  };

  const toggleSom = async (valor) => {
    setSom(valor);
    await AsyncStorage.setItem('@som', JSON.stringify(valor));
  };

  const toggleBiometria = async (valor) => {
    setBiometria(valor);
    await AsyncStorage.setItem('@biometria', JSON.stringify(valor));
  };

  const ConfigItem = ({ label, valor, onToggle, icon }) => (
    <View style={styles.item}>
      <View style={styles.labelArea}>
        <Ionicons name={icon} size={24} color="#555" style={{ marginRight: 10 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      {/* PASSO 3: Renderizar Switches */}
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={valor ? "#2196F3" : "#f4f3f4"}
        onValueChange={onToggle}
        value={valor}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Preferências</Text>
        
        <ConfigItem 
          label="Notificações" 
          valor={notificacoes} 
          onToggle={toggleNotificacoes}
          icon="notifications-outline"
        />
        <ConfigItem 
          label="Som" 
          valor={som} 
          onToggle={toggleSom}
          icon="volume-high-outline"
        />
        <ConfigItem 
          label="Biometria" 
          valor={biometria} 
          onToggle={toggleBiometria}
          icon="finger-print-outline"
        />
      </View>
    </SafeAreaView>
  );
}

// PASSO 1: Configuração do Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen 
          name="Config" 
          component={TelaConfig} 
          options={{ 
            title: 'Configurações',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    paddingLeft: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  labelArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
});
