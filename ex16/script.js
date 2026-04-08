import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, SafeAreaView, ActivityIndicator 
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const SUPABASE_URL = 'https://SUA_URL.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function TelaTarefas() {
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarTarefas();
  }, []);

  // PASSO 5: Buscar tarefas (O RLS garante que venham apenas as do usuário logado)
  const buscarTarefas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .order('id', { ascending: false });

    if (!error) setLista(data);
    setLoading(false);
  };

  // PASSO 4: Inserir tarefa vinculada ao user_id
  const adicionarTarefa = async () => {
    if (tarefa.trim() === '') return;

    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase
      .from('tarefas')
      .insert([
        { titulo: tarefa, user_id: user.id, concluida: false }
      ]);

    if (!error) {
      setTarefa('');
      buscarTarefas();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity style={styles.btn} onPress={adicionarTarefa}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3ECF8E" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={lista}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.titulo}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma tarefa encontrada para este usuário.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { padding: 20, backgroundColor: '#3ECF8E' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  inputArea: { flexDirection: 'row', padding: 20 },
  input: { flex: 1, backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginRight: 10, borderWidth: 1, borderColor: '#DDD' },
  btn: { backgroundColor: '#3ECF8E', width: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  item: { backgroundColor: '#FFF', padding: 15, marginHorizontal: 20, marginBottom: 10, borderRadius: 8, elevation: 2 },
  itemText: { fontSize: 16, color: '#333' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});
