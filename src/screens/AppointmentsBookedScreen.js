import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetAllAppointmentsQuery } from '../services/appointments';
import moment from 'moment';
import Loading from '../components/Loading';

const AppointmentsBookedScreen = () => {

    const { data, error, isLoading } = useGetAllAppointmentsQuery();
    const [ appointments, setAppointments ] = useState([]);

    useEffect(() => {
        if (data) {
            const allAppointments = [];
            const currentDateTime = moment(); // Obtiene la fecha y hora actual

            // Itera sobre el arreglo de citas
            data.forEach((appointment) => {
                const { date, time, user } = appointment;

                // Verifica que los turnos tienen usuarios
                if (user) {
                    const appointmentDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm'); // Combina fecha y hora

                    // Solo agrega el turno si es posterior a la fecha y hora actual
                    if (appointmentDateTime.isAfter(currentDateTime)) {
                        allAppointments.push({
                            date: moment(date).format('YYYY-MM-DD'), // La fecha ya está formateada
                            time,
                            ...user, // Agrega información del usuario
                        });
                    }
                }
            });

            // Actualiza el estado con los turnos filtrados
            setAppointments(allAppointments);
        }
    }, [data]);  // Dependiendo solo de 'data'

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Text>Error al cargar los turnos.</Text>;
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.nameContainer}>
                <Text style={[styles.cardText, styles.nameText]}>{item.lastName}</Text>
                <Text style={[styles.cardText, styles.nameText]}>{item.firstName}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={[styles.cardText, {fontWeight: '700'}]}>Fecha: {moment(item.date).format('DD/MM/YYYY')}</Text>
                <Text style={[styles.cardText, {fontWeight: '700'}]}>Hora: {item.time}</Text>
            </View>
            <Text style={styles.cardText}>Nota: {item.note}</Text>
        </View>
    );

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
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.noAppointments}>No hay turnos reservados!</Text>
                    }
                />
            </View>
        </LinearGradient>
    );
}

export default AppointmentsBookedScreen;

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
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5
    },
    nameContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 5,
        marginBottom: 5
    },
    nextAppointment: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
        color: '#C70000',
        textShadowColor: '#022974',
        textShadowOffset: {width: 1.2, height: 1.2},
        textShadowRadius: 1
    },
    cardText: {
        fontSize: 18,
        marginVertical: 1
    },
    nameText: {
        fontSize: 20,
        fontWeight: '700',
        textDecorationLine: 'underline'
    },
    dateTimeContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between'
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
})