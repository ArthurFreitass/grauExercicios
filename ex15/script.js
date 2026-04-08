import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO SUPABASE ---
const SUPABASE_URL = 'https://SUA_URL.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- TELA PROTEGIDA (HOME) ---
function TelaHome({ sessao }) {
  // PASSO 4: Função de Logout
  const fazerLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Usuário Autenticado:</Text>
      {/* PASSO 3: Exibindo e-mail do usuário */}
      <Text style={styles.emailText}>{sessao?.user?.email}</Text>
      
      <TouchableOpacity style={styles.btnLogout} onPress={fazerLogout}>
        <Text style={styles.btnText}>Sair do Aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- TELA DE LOGIN ---
function TelaLogin() {
  const [loading, setLoading] = useState(false);
  
  const handleLoginFake = async () => {
    // Aqui entraria a função de login do passo anterior
    // O navegador mudará automaticamente quando o Supabase detectar a sessão
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Área de Acesso</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      {/* Inputs de login aqui... */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [sessao, setSessao] = useState(null);
  const [loading, setLoading] = useState(true);

  // PASSO 2: Monitorando o estado de autenticação (Auth Flow)
  useEffect(() => {
    // 1. Checa sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessao(session);
      setLoading(false);
    });

    // 2. Escuta mudanças (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color="#3ECF8E" /></View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3ECF8E' }, headerTintColor: '#FFF' }}>
        {/* PASSO 2: Estrutura Condicional de Telas */}
        {sessao ? (
          <Stack.Screen name="Home" options={{ title: 'Dashboard' }}>
            {(props) => <TelaHome {...props} sessao={sessao} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F9FAFB' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  subtitle: { color: '#6B7280', marginBottom: 20 },
  label: { fontSize: 14, color: '#6B7280', textTransform: 'uppercase' },
  emailText: { fontSize: 20, fontWeight: 'bold', color: '#3ECF8E', marginBottom: 30 },
  btnLogout: { backgroundColor: '#EF4444', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
