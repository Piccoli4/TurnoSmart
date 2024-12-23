import { StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetTestsByDniQuery } from '../services/appointments';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../services/user';

const TestsScreen = () => {
    const localId = useSelector((state) => state.auth.localId);
    const { data: userData } = useGetUserQuery(localId);

    const { data: tests, error, isLoading } = useGetTestsByDniQuery();

    // Verificamos que tests tenga datos y transformamos los objetos de los tests
    const testData = tests 
    ? Object.values(tests).flatMap(item => Object.values(item)) 
    : []; // Aplana la estructura.

    // Obtener el dni del usuario autenticado
    const userDni = userData?.dni;

    // Filtrar los estudios por el dni del usuario autenticado
    const filteredTests = userDni
        ? testData.filter(item => item.dni === userDni)
        : []; // Si no hay dni, no mostrar nada

    if (isLoading) { return ( <Loading/>)}

    if (error) {
        return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Error al cargar los estudios</Text>
        </View>
        );
    }

    return (
        <LinearGradient
        colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
        locations={[0, 0.20, 0.65, 0.95]}
        style={styles.background}
        >
        <View style={styles.container}>
            <FlatList
                data={filteredTests}
                keyExtractor={(item) => item.id ? item.id.toString() : `${item.dni}-${item.createdAt}`} // Usa 'id' como clave principal
                renderItem={({ item }) => {
                    // Formatear la fecha y asegurarse de que `createdAt` esté definido
                    const formattedDate = item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        })
                    : 'Fecha no disponible';
                    
                    return (
                        <View style={styles.testItem}>
                            <View style={styles.nameContainer}>
                                <Text style={[styles.testText, styles.boldText]}>Nombre: {item.name}</Text>
                                <Text style={[styles.testText, styles.boldText]}>Apellido: {item.lastName}</Text>
                            </View>
                            <Text style={styles.testText}>Fecha: {formattedDate}</Text>
                            <Text style={styles.testText}>Informe del Estudio: {item.report}</Text>
                        </View>
                    );
                }}
            />
        </View>
        </LinearGradient>
    );
};

export default TestsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  testItem: {
    backgroundColor: '#DDD',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#C70000',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 30
  },
  testText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 2
  },
  boldText: {
    fontWeight: 'bold', // Estilo específico para nombre y apellido
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
