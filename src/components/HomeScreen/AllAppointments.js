import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import appointments from '../../../assets/img/appointments.png'
import { useNavigation } from '@react-navigation/native'

const AllAppointments = () => {

    const navigation = useNavigation()

    const handleNavigate = () => {
        navigation.navigate('AppointmentsBooked')
    }

  return (
    <TouchableOpacity 
        style={styles.categoryContainer} 
        onPress={handleNavigate} 
    >
        <Image source={appointments} style={styles.categoryIcon} />
        <Text style={styles.categoryName}>Turnos Reservados</Text>
    </TouchableOpacity>
  )
}

export default AllAppointments

const styles = StyleSheet.create({
    categoryContainer: {
        marginTop: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: '#022974',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        width: '80%'
    },
    categoryIcon: {
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 24,
        color: '#000',
        fontWeight: '700',
        textShadowColor: '#CCC',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    }
})