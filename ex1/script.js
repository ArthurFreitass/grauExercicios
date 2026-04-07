import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        // Exibe o indicador vertical
        showsVerticalScrollIndicator={true}
        // No Android, mantém a barra sempre visível
        persistentScrollbar={true}
        // No iOS, define a cor (default, black ou white)
        indicatorStyle="black"
        // Ajusta a posição da barra no iOS se necessário
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.inner}>

          {/* Cabeçalho */}
          <Text style={styles.title}>Sobre o App</Text>

          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            {'\n\n'}
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            {'\n\n'}
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          {/* Cards */}
          <View style={[styles.card, styles.blue]}>
            <Text style={styles.cardTitle}>Versão</Text>
            <Text style={styles.cardText}>1.0.0</Text>
          </View>

          <View style={[styles.card, styles.green]}>
            <Text style={styles.cardTitle}>Plataforma</Text>
            <Text style={styles.cardText}>React Native</Text>
          </View>

          <View style={[styles.card, styles.yellow]}>
            <Text style={styles.cardTitle}>Status</Text>
            <Text style={styles.cardText}>Ativo</Text>
          </View>

          {/* Categorias */}
          <Text style={styles.title}>Categorias</Text>

          {/* Scroll Horizontal */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            persistentScrollbar={true}
            contentContainerStyle={styles.horizontalScrollPadding}
          >
            <View style={[styles.chip, styles.chipBlue]}>
              <Text style={styles.chipText}>Tecnologia</Text>
            </View>

            <View style={[styles.chip, styles.chipPurple]}>
              <Text style={styles.chipText}>Design</Text>
            </View>

            <View style={[styles.chip, styles.chipGreen]}>
              <Text style={styles.chipText}>Saúde</Text>
            </View>

            <View style={[styles.chip, styles.chipYellow]}>
              <Text style={styles.chipText}>Educação</Text>
            </View>

            <View style={[styles.chip, styles.chipGreen]}>
              <Text style={styles.chipText}>Games</Text>
            </View>
          </ScrollView>

          {/* Espaçamento extra no fim para garantir que o scroll funcione bem */}
          <View style={{ height: 50 }} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  horizontalScrollPadding: {
    paddingBottom: 15, // Espaço para a barra horizontal não sobrepor o texto
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  cardText: {
    color: '#fff',
  },
  blue: { backgroundColor: '#3498db' },
  green: { backgroundColor: '#2ecc71' },
  yellow: { backgroundColor: '#f1c40f' },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginRight: 10,
    height: 40,
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chipBlue: { backgroundColor: '#3498db' },
  chipPurple: { backgroundColor: '#9b59b6' },
  chipGreen: { backgroundColor: '#2ecc71' },
  chipYellow: { backgroundColor: '#f1c40f' },
});
