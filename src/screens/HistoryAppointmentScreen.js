import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetAllAppointmentsQuery } from '../services/appointmets';
import moment from 'moment';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const MyAppointmentScreen = () => {
  const localId = useSelector((state) => state.auth.localId); // Obtiene el localId del usuario autenticado

  const { data, error, isLoading } = useGetAllAppointmentsQuery();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (data) {
      const userAppointments = [];
  
      // Itera sobre el arreglo de citas
      data.forEach((appointment) => {
        const { date, time, user } = appointment;
        
        // Verifica que los turnos tienen usuarios y que el localId coincide con el usuario autenticado
        if (user && user.localId === localId) {
            userAppointments.push({
              date: moment(date).format('YYYY-MM-DD'), // La fecha ya está formateada
              time,
              ...user, // Agrega información del usuario
            });
        }
      });
  
      // Actualiza el estado con los turnos filtrados
      setAppointments(userAppointments);
    }
  }, [data, localId]);  

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Error al cargar los turnos.</Text>;
  }

  const renderItem = ({ item, index }) => {
    // Define el título del turno
    let turnoTitle = '';
    const turnoNumber = index + 1; // Comienza desde el turno 1
  
    if (turnoNumber === 1) {
      turnoTitle = '1er Turno';
    } else if (turnoNumber === 2) {
      turnoTitle = '2do Turno';
    } else if (turnoNumber === 3) {
      turnoTitle = '3er Turno';
    } else {
      turnoTitle = `${turnoNumber}to Turno`;
    }
  
    return (
      <View style={styles.card}>
        <View style={styles.dateTimeContainer}>
          {/* Título del turno */}
          <Text style={[styles.cardTitle, { fontWeight: '700' }]}>
            {turnoTitle}
          </Text>
          <Text style={[styles.cardText, { fontWeight: '700' }]}>
            Fecha: {moment(item.date).format('DD/MM/YYYY')}
          </Text>
          <Text style={[styles.cardText, { fontWeight: '700' }]}>
            Hora: {item.time}
          </Text>
        </View>
      </View>
    );
  };  

  return (
    <LinearGradient
      colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
      locations={[0, 0.2, 0.65, 0.95]}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={appointments}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.noAppointments}>No existen trunos registrados!</Text>
          }
        />
      </View>
    </LinearGradient>
  );
};

export default MyAppointmentScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#C70000',
    padding: 6,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5
  },
  cardTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#022974',
    textShadowColor: '#C70000',
    textShadowOffset: {width: 0.6, height: 0.6},
    textShadowRadius: 1
  },
  cardText: {
    fontSize: 16,
    marginVertical: 1
  },
  noAppointments: {
    marginTop: 250,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    borderWidth: 4,
    borderColor: '#C70000',
    borderRadius: 20,
    padding: 20,
    color: '#022974',
    textShadowColor: '#C70000',
    textShadowOffset: {width: 0.7, height: 0.7},
    textShadowRadius: 1
  },
});
