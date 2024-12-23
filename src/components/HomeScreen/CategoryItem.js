import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CategoryItem = ({ item }) => {

    const navigation = useNavigation();

    // Función para redirigir según el nombre de la categoría
    const handleNavigation = () => {
        if (item.name === 'Reservar Turno') {
          navigation.navigate('BookAppointment', { category: item.name });
        } else if (item.name === 'Mis Turnos') {
          navigation.navigate('MyAppointments', { category: item.name });
        } else if (item.name === 'Historial') {
          navigation.navigate('HistoryAppointment', { category: item.name });
        }
    };

  return (
    <TouchableOpacity 
        style={styles.categoryContainer} 
        onPress={() => handleNavigation(item.name)}  // Llama a la función con el nombre de la categoría
    >
        <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
        <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#022974',
    borderRadius: 6,
    padding: 5,
    margin: 5,
    width: '80%'
  },
  categoryIcon: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textShadowColor: '#CCC',
    textShadowOffset: {width: 0.8, height: 0.8},
    textShadowRadius: 0.9
  }
})