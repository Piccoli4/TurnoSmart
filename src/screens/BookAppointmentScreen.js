import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import 'moment/locale/es';
import { colors } from '../global/colors';
import TimeModal from '../components/HomeScreen/TimeModal';
import CustomCalendarModal from '../components/HomeScreen/Calendar';
import { useSelector } from 'react-redux';
import { useAddAppointmentMutation, useGetAppointmentsQuery } from '../services/appointments';
import { useGetUserQuery } from '../services/user';
import AwesomeAlert from 'react-native-awesome-alerts';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';

// Configura moment en español y elimina los puntos en las abreviaturas
moment.updateLocale('es', {
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], // Sin puntos
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], // Sin puntos
    week: {
        dow: 1, // Define lunes como primer día de la semana
    },
});

const BookAppointmentScreen = () => {
    const [ next7Days, setNext7Days ] = useState([])
    const [ selectedDate, setSelectedDate ] = useState()
    const [ timeList, setTimeList ] = useState([])
    const [ selectedTime, setSelectedTime ] = useState()
    const [ isCalendarVisible, setCalendarVisible ] = useState(false);
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ disabledDates, setDisabledDates ] = useState({});
    const [ note, setNote ] = useState('')
    const [ addAppointment ] = useAddAppointmentMutation();
    const [ showAlert, setShowAlert ] = useState(false);
    const [ disabledTimes, setDisabledTimes ] = useState({});
    const navigation = useNavigation()

    const localId = useSelector(state => state.auth.localId);
    const { data: user, isLoading, isError } = useGetUserQuery(localId);
    const { data: appointments, isFetching } = useGetAppointmentsQuery(
        selectedDate ? moment(selectedDate).toISOString() : null, {
        skip: !selectedDate, // Solo realiza la consulta si selectedDate tiene valor
    });
    
    

    const getDays = () => {
        const today = moment(); // Fecha actual
        const nextSevenDays = [];
    
        let daysCount = 0; // Contador de días para los próximos días hábiles
    
        for (let i = 1; daysCount < 7; i++) { // Comiemza desde el día siguiente (i = 1)
            const date = moment(today).add(i, 'days');
            
            // Filtra sábados (5) y domingos (6)
            if (date.weekday() !== 5 && date.weekday() !== 6) {
                nextSevenDays.push({
                    date: date,
                    day: date.format('dddd'),
                    formatedDate: date.format('D [de] MMM')
                });
                daysCount++; // Incrementa solo si el día no es sábado ni domingo
            }
        }
    
        setNext7Days(nextSevenDays); // Actualiza el estado con los próximos 7 días hábiles
    };    

    const toggleCalendar = () => setCalendarVisible(!isCalendarVisible);

    const handleDateSelection = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDate(formattedDate); // Guarda la fecha como string en el estado
    };    

    // Genera fechas deshabilitadas (sábados y domingos)
    const generateDisabledDates = () => {
        const today = moment();
        const next300Days = {};
        for (let i = 0; i < 300; i++) {
        const date = moment(today).add(i, "days");
        const dayOfWeek = date.day(); // 0 = Domingo, 6 = Sábado
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            next300Days[date.format("YYYY-MM-DD")] = { disabled: true }; // Formato requerido por `Calendar`
        }
        }
        setDisabledDates(next300Days);
    };

    const getTime = () => {
        const timeList = []

        // Horarios de 8:00 a 13:00 (sin incluir 13:00)
        for(let i=8; i<13; i++){
            timeList.push({ time: i + ':00 Hs' })
            if (i !== 13) { // Evita agregar 13:30
                timeList.push({ time: i + ':30 Hs' });
            }
        }

        // Horarios de 16:00 a 19:00 (sin incluir 19:00)
        for(let i=16; i<19; i++){
            timeList.push({ time: i + ':00 Hs' })
            if (i !== 19) { // Evita agregar 19:30
                timeList.push({ time: i + ':30 Hs' });
            }
        }
        setTimeList(timeList)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Esta función se ejecuta cada vez que se selecciona una fecha
    useEffect(() => {
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const busyTimes = {};

            // Comprueba los horarios ocupados
            if (appointments) {
                Object.keys(appointments).forEach(time => {
                    if (appointments[time].users && appointments[time].users.length >= 3) {
                        busyTimes[time] = true;
                    }
                });
            }

            setDisabledTimes(busyTimes); // Actualiza los horarios deshabilitados
        }
    }, [appointments, selectedDate]);

    useEffect(() => {
        getDays(); // Llama a la función al abrirse "Nuevo Turno"
        getTime(); // Llama a la función al abrirse "Nuevo turno"
        generateDisabledDates();
    }, []);

    const handleReservation = async () => {

        if (!selectedDate || !selectedTime) {
            alert('Por favor, seleccione una fecha y hora para la reserva.');
            return;
        }
    
        if (!localId) {
            alert('No hay un usuario autenticado.');
            return;
        }
        
        // Obtiene los datos del usuario desde el estado
        const { email, name, lastName, birthDate } = user;

        // Calcula la edad usando la fecha de nacimiento
        const age = birthDate ? moment().diff(moment(birthDate, 'DD/MM/YYYY'), 'years') : null;

        // Datos de la reserva
        const reservationData = {
            localId: localId,
            email: email,
            firstName: name,
            lastName,
            birthDate,
            age,
            note: note || ''
        };

        try {
            // Llama a la mutación para agregar la cita
            await addAppointment({
                date: selectedDate,
                time: selectedTime, 
                userData: reservationData
            }).unwrap();

            // Muestra la alerta
            alert('Reserva realizada con éxito!');

            // Redirige despues de mostrar la alerta
            navigation.navigate('Home');

        } catch (err) {
            console.error('Error al realizar la reserva:', err);
            alert('Hubo un error al realizar la reserva. Intente nuevamente.');
        }
    };
    
    if (isLoading || isFetching) return <Loading />;

  return (
    <LinearGradient
      colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
      locations={[0, 0.20, 0.65, 0.95]}
      style={styles.background}
    >
        <View style={styles.container}>
            <View>
                <View style={styles.dayTimeContainer}>
                    <Text style={styles.dayTime}>Día</Text>
                    <TouchableOpacity style={styles.seeAllContainer} onPress={toggleCalendar}>
                        <Text style={styles.seeAllText}>Ver todo</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={next7Days}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isSelectedDate = selectedDate === item.date;

                        return (
                            <TouchableOpacity
                                style={[
                                styles.dayTimeItem,
                                isSelectedDate && { backgroundColor: colors.blue } // Fondo azul si está seleccionado
                                ]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        isSelectedDate && { color: '#FFFFFF' } // Letras blancas si está seleccionado
                                    ]}
                                >
                                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                                </Text>
                                <Text
                                    style={[
                                        styles.dateTimeText,
                                        isSelectedDate && { color: '#FFFFFF' } // Letras blancas si está seleccionado
                                    ]}
                                >
                                    {item.formatedDate}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            <View style={{marginTop: 15}}>
                <View style={styles.dayTimeContainer}>
                    <Text style={styles.dayTime}>Hora</Text>
                    <TouchableOpacity style={styles.seeAllContainer} onPress={toggleModal}>
                        <Text style={styles.seeAllText}>Ver todo</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={timeList}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isSelectedTime = selectedTime === item.time;
                        const isDisabled = disabledTimes[item.time]; // Si está ocupado

                        return (
                            <TouchableOpacity
                                style={[
                                    styles.dayTimeItem,
                                    isSelectedTime && { backgroundColor: colors.blue }, // Fondo azul si está seleccionado
                                    isDisabled && { 
                                        backgroundColor: 'grey', 
                                        borderColor: colors.red
                                    }
                                ]}
                                onPress={() => !isDisabled && setSelectedTime(item.time)}
                                disabled={isDisabled} // Deshabilita el botón si está ocupado
                            >
                                <Text
                                    style={[
                                        styles.dateTimeText,
                                        isSelectedTime && { color: '#FFFFFF' }, // Letras blancas si está seleccionado
                                        isDisabled && { 
                                            color: colors.red
                                        }
                                    ]}
                                >
                                    {item.time}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            <View style={{marginTop: 15}}>
                <View style={styles.noteTextContainer}>
                    <Text style={styles.noteText}>Nota</Text>
                </View>
                <TextInput
                    numberOfLines={5}
                    multiline={true}
                    style={styles.note}
                    placeholder='Escriba su nota aqui'
                    maxLength={250}
                    onChangeText={(text) => setNote(text)}
                />
            </View>

            <TouchableOpacity 
                style={styles.reserveButton} 
                onPress={handleReservation}
                disabled={isLoading}
            >
                <Text style={styles.reserveButtonText}>Reservar Turno</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="¡Reserva Exitosa!"
                message="Tu turno ha sido reservado con éxito."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor= {colors.blue}
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />

            <CustomCalendarModal
                isVisible={isCalendarVisible}
                onClose={toggleCalendar}
                onSelectDate={handleDateSelection}
                minDate={new Date().toISOString().split("T")[0]} // Fecha actual en formato YYYY-MM-DD
                disabledDates={disabledDates} // Fechas deshabilitadas (sábados y domingos)
            />
            <TimeModal
                isVisible={isModalVisible}
                timeList={timeList}
                onClose={toggleModal}
                onSelectTime={(time) => {
                    setSelectedTime(time);
                    toggleModal();
                }}
            />
        </View>
    </LinearGradient>
  )
}

export default BookAppointmentScreen

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1
    },
    dayTimeContainer: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    dayTime: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: '600'
    },
    seeAllContainer: {},
    seeAllText: {
        color: '#00AEEF',
        fontSize: 16,
        fontWeight: '500'
    },
    dayTimeItem: {
        alignItems: 'center',
        borderWidth: 2.5,
        borderRadius: 99,
        borderColor: colors.blue,
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 5
    },
    dayText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.blue,
        textShadowColor: '#CCC',
        textShadowOffset: {width: 0.7, height: 0.7},
        textShadowRadius: 0.9
    },
    dateTimeText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.blue
    },
    noteTextContainer: {
        marginVertical: 10
    },
    noteText: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: '600'
    },
    note: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#DDD',
        borderWidth: 2,
        borderColor: colors.blue,
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 10, 
        fontSize: 18, 
        height: 5 * 24 + 10 // Altura calculada: 5 líneas x lineHeight + padding interno
    },
    reserveButton: {
        alignSelf: 'center',
        marginVertical: 20,
        padding: 15,
        borderRadius: 10,
        width: '95%',
        backgroundColor: colors.blue,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderColor: '#FFF',
        borderWidth: 1.5
    },
    reserveButtonText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFF',
        textShadowColor: '#000',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 0.9
    }
})