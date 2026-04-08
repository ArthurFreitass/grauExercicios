import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

function TelaInfoAuth() {
  const passos = [
    {
      id: 1,
      titulo: 'Credenciais',
      desc: 'O usuário envia e-mail/senha para o servidor (Supabase).',
      icon: 'log-in-outline'
    },
    {
      id: 2,
      titulo: 'Geração do Token',
      desc: 'O servidor valida e devolve um JWT assinado digitalmente.',
      icon: 'key-outline'
    },
    {
      id: 3,
      titulo: 'Acesso Seguro',
      desc: 'O App armazena o token e o envia no Header de cada requisição.',
      icon: 'shield-checkmark-outline'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* PASSO 3: Card Centralizado */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fluxo de Login JWT</Text>
          <View style={styles.divider} />

          {passos.map((passo) => (
            <View key={passo.id} style={styles.stepRow}>
              <View style={styles.iconCircle}>
                <Ionicons name={passo.icon} size={24} color="#00C897" />
              </View>
              <View style={styles.stepTextContent}>
                <Text style={styles.stepTitle}>{passo.id}. {passo.titulo}</Text>
                <Text style={styles.stepDesc}>{passo.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* PASSO 4: Rodapé sobre Supabase */}
        <View style={styles.footer}>
          <Ionicons name="flash" size={18} color="#3ECF8E" />
          <Text style={styles.footerText}>
            Powered by <Text style={{fontWeight: 'bold'}}>Supabase Auth</Text>
          </Text>
          <Text style={styles.subFooter}>PostgreSQL + GoTrue Authentication</Text>
        </View>

      </ScrollView>
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
          name="InfoAuth" 
          component={TelaInfoAuth} 
          options={{ 
            title: 'Arquitetura de Segurança',
            headerStyle: { backgroundColor: '#1C1C1C' },
            headerTintColor: '#FFF'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode profissional
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#00C897',
    width: '40%',
    alignSelf: 'center',
    marginBottom: 25,
    borderRadius: 1,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0, 200, 151, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EEE',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#AAA',
    lineHeight: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    opacity: 0.8,
  },
  footerText: {
    color: '#3ECF8E',
    fontSize: 16,
    marginTop: 5,
  },
  subFooter: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  }
});
