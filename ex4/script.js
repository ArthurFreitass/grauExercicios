import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // PASSO 4: Estado de erro
  const [erroEmail, setErroEmail] = useState(false);

  // PASSO 3: useRef para controle de foco
  const senhaInputRef = useRef(null);

  // PASSO 5: Função de validação
  const handleEntrar = () => {
    if (!email.includes('@')) {
      setErroEmail(true);
    } else {
      setErroEmail(false);
      alert('Login realizado com sucesso!');
    }
  };

  return (
    // PASSO 1: KeyboardAvoidingView para UX de teclado
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.inner}>
        <View style={styles.formCard}>
          <Text style={styles.title}>Bem-vindo</Text>

          {/* PASSO 2 e 6: E-mail com borda condicional */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, erroEmail && styles.inputErro]}
            placeholder="exemplo@email.com"
            keyboardType="email-address" // PASSO 2
            autoCapitalize="none"
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
              if (erroEmail) setErroEmail(false); // Limpa erro ao digitar
            }}
            returnKeyType="next"
            onSubmitEditing={() => senhaInputRef.current.focus()} // PASSO 3
            blurOnSubmit={false}
          />
          
          {/* PASSO 6: Texto de erro condicional */}
          {erroEmail && <Text style={styles.textoErro}>E-mail inválido</Text>}

          {/* PASSO 2: Senha */}
          <Text style={styles.label}>Senha</Text>
          <TextInput
            ref={senhaInputRef} // PASSO 3
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true} // PASSO 2
            value={senha}
            onChangeText={setSenha}
          />

          {/* PASSO 5: Botão de ação */}
          <TouchableOpacity style={styles.button} onPress={handleEntrar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formCard: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  inputErro: {
    borderColor: '#DC3545', // Borda vermelha (Passo 6)
    backgroundColor: '#FFF8F8',
  },
  textoErro: {
    color: '#DC3545',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007BFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
