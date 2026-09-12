import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LibroService } from './src/services/LibroService';

const libroService = new LibroService();

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');
  const [libros, setLibros] = useState(() => libroService.obtenerLibros());

  const cantidad = useMemo(() => libros.length, [libros]);

  const refrescarLista = () => {
    setLibros(libroService.obtenerLibros());
  };

  const agregarLibro = () => {
    const tituloLimpio = titulo.trim();
    const autorLimpio = autor.trim();
    const anioNumero = Number(anio);

    if (!tituloLimpio || !autorLimpio || !anio.trim()) {
      Alert.alert('Datos incompletos', 'Ingresa título, autor y año.');
      return;
    }

    if (!Number.isInteger(anioNumero) || anioNumero < 1) {
      Alert.alert('Año inválido', 'El año debe ser un número entero positivo.');
      return;
    }

    libroService.agregarLibro(tituloLimpio, autorLimpio, anioNumero);
    setTitulo('');
    setAutor('');
    setAnio('');
    refrescarLista();
  };

  const eliminarLibro = (id: string) => {
    libroService.eliminarLibro(id);
    refrescarLista();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.tituloApp}>Mis Libros</Text>
        <Text style={styles.subtitulo}>
          {cantidad === 0
            ? 'Agrega tu primer libro'
            : `${cantidad} ${cantidad === 1 ? 'libro' : 'libros'} en tu lista`}
        </Text>

        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor="#8B7E74"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#8B7E74"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Año"
            placeholderTextColor="#8B7E74"
            value={anio}
            onChangeText={setAnio}
            keyboardType="number-pad"
            maxLength={4}
          />
          <Pressable style={styles.botonAgregar} onPress={agregarLibro}>
            <Text style={styles.botonAgregarTexto}>Agregar libro</Text>
          </Pressable>
        </View>

        <FlatList
          data={libros}
          keyExtractor={(libro) => libro.getId()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.vacio}>Aún no hay libros registrados.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <View style={styles.tarjetaInfo}>
                <Text style={styles.libroTitulo}>{item.getTitulo()}</Text>
                <Text style={styles.libroDetalle}>{item.obtenerDescripcion()}</Text>
              </View>
              <Pressable
                style={styles.botonEliminar}
                onPress={() => eliminarLibro(item.getId())}
              >
                <Text style={styles.botonEliminarTexto}>Eliminar</Text>
              </Pressable>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F1E8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  tituloApp: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D2B1F',
  },
  subtitulo: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 15,
    color: '#6B5B4F',
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2D6C8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#3D2B1F',
    backgroundColor: '#FDFBF8',
  },
  botonAgregar: {
    backgroundColor: '#5C3D2E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  botonAgregarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  lista: {
    paddingBottom: 24,
    gap: 10,
  },
  vacio: {
    textAlign: 'center',
    color: '#8B7E74',
    marginTop: 24,
    fontSize: 15,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  tarjetaInfo: {
    flex: 1,
  },
  libroTitulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3D2B1F',
  },
  libroDetalle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B5B4F',
  },
  botonEliminar: {
    backgroundColor: '#B23A48',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botonEliminarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
