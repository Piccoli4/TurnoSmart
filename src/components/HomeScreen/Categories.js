import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { useGetCategoriesQuery } from '../../services/homegets';
import CategoryItem from './CategoryItem';

const Categories = () => {

  const {data, error, isLoading} = useGetCategoriesQuery()

  if (isLoading) return <ActivityIndicator 
                          size="large" 
                          color="#C70000" 
                          style={{marginTop: 50}}
                        />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trámites</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Usa un índice como fallback para claves únicas
        renderItem={({ item }) => <CategoryItem item={item} />}
        scrollEnabled={false} // Deshabilitar scroll para evitar conflictos
        removeClippedSubviews={true} // Mejora el rendimiento eliminando elementos no visibles
        style={{
          width: '100%'
        }}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 15
  }
})