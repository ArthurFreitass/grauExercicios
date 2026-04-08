import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function TelaNovoProduto() {
  // PASSO 3: Estados para valores
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  // PASSO 3: Estados para erros
  const [erroNome, setErroNome] = useState('');
  const [erroPreco, setErroPreco] = useState('');

  // PASSO 4: Função de Validação
  const validarFormulario = () => {
    let temErro = false;

    // Validação Nome
    if (nome.trim().length < 3) {
      setErroNome('O nome deve ter pelo menos 3 letras.');
      temErro = true;
    } else {
      setErroNome('');
    }

    // Validação Preço
    const valorNumerico = parseFloat(preco.replace(',', '.'));
    if (!preco || isNaN(valorNumerico) || valorNumerico <= 0) {
      setErroPreco('O preço deve ser um valor maior que zero.');
      temErro = true;
    } else {
      setErroPreco('');
    }

    // PASSO 6: Sucesso
    if (!temErro) {
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');
      setDescricao('');
      setErroNome('');
      setErroPreco('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.formCard}>
          
          {/* Campo Nome */}
          <Text style={styles.label}>Nome do Produto*</Text>
          <TextInput
            style={[styles.input, erroNome ? styles.inputErro : null]}
            placeholder="Ex: Camiseta Algodão"
            value={nome}
            onChangeText={setNome}
          />
          {erroNome ? <Text style={styles.txtErro}>{erroNome}</Text> : null}

          {/* Campo Preço (Passo 2: teclado numérico) */}
          <Text style={styles.label}>Preço (R$)*</Text>
          <TextInput
            style={[styles.input, erroPreco ? styles.inputErro : null]}
            placeholder="0.00"
            keyboardType="numeric"
            value={preco}
            onChangeText={setPreco}
          />
          {erroPreco ? <Text style={styles.txtErro}>{erroPreco}</Text> : null}

          {/* Campo Descrição (Passo 2: multiline) */}
          <Text style={styles.label}>Descrição (Opcional)</Text>
          <TextInput
            style={[styles.input, styles.inputMult]}
            placeholder="Detalhes do produto..."
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={descricao}
            onChangeText={setDescricao}
          />

          <TouchableOpacity style={styles.btnSalvar} onPress={validarFormulario}>
            <Text style={styles.btnText}>Salvar Produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="NovoProduto" 
          component={TelaNovoProduto} 
          options={{ title: 'Cadastrar Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  scroll: { padding: 20 },
  formCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    marginBottom: 5,
  },
  inputMult: { height: 100, paddingTop: 12 },
  inputErro: { borderColor: '#FF3B30', backgroundColor: '#FFF5F5' }, // PASSO 5
  txtErro: { color: '#FF3B30', fontSize: 12, marginBottom: 15, fontWeight: '500' }, // PASSO 5
  btnSalvar: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
