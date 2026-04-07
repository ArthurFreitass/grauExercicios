import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Alert, 
  SafeAreaView 
} from 'react-native';

export default function App() {
  // PASSO 5: Estado para monitorar os eventos
  const [ultimoEvento, setUltimoEvento] = useState('Nenhum');

  return (
    // PASSO 1: Tela com fundo cinza claro
    <SafeAreaView style={styles.container}>
      
      {/* PASSO 6: Texto que mostra o último evento */}
      <View style={styles.statusBox}>
        <Text style={styles.label}>Status do Toque:</Text>
        <Text style={styles.statusText}>{ultimoEvento}</Text>
      </View>

      {/* PASSO 2: Botão Azul com Feedback Visual de Escala e Opacidade */}
      <Pressable
        onPressIn={() => setUltimoEvento('Dedo tocou')}   // PASSO 6
        onPressOut={() => setUltimoEvento('Dedo soltou')} // PASSO 6
        style={({ pressed }) => [
          styles.btnBase,
          styles.btnAzul,
          pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }
        ]}
      >
        <Text style={styles.btnText}>Salvar</Text>
      </Pressable>

      {/* PASSO 3: Botão Vermelho com Alerta no Long Press */}
      <Pressable
        onLongPress={() => Alert.alert('Ação', 'Item excluído!')}
        style={({ pressed }) => [
          styles.btnBase,
          styles.btnVermelho,
          pressed && { opacity: 0.8 }
        ]}
      >
        <Text style={styles.btnText}>Excluir (Segure)</Text>
      </Pressable>

      {/* PASSO 4: Botão Cinza Desabilitado */}
      <Pressable
        disabled={true}
        style={[styles.btnBase, styles.btnDesabilitado]}
      >
        <Text style={styles.btnText}>Enviando...</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Cinza claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusBox: {
    marginBottom: 40,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDD'
  },
  label: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  btnBase: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnAzul: {
    backgroundColor: '#007BFF',
  },
  btnVermelho: {
    backgroundColor: '#DC3545',
  },
  btnDesabilitado: {
    backgroundColor: '#A9A9A9',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
