import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { colors } from "../../global/colors";

const CustomCalendarModal = ({ isVisible, onClose, onSelectDate, minDate, disabledDates }) => {

  return (
    <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
    >
        <View style={styles.calendarContainer}>
            <Text style={styles.title}>Selecciona una Fecha</Text>
            <Calendar
                minDate={minDate} // Configura la fecha mínima seleccionable
                markedDates={disabledDates} // Fechas deshabilitadas (sábados y domingos)
                onDayPress={(day) => {
                    if (!disabledDates[day.dateString]?.disabled) {
                      onSelectDate(day.dateString); // Llama al método de selección
                      onClose(); // Cierra el modal
                    }
                  }}
                theme={{
                backgroundColor: "white",
                calendarBackground: "white",
                textSectionTitleColor: "#000",
                selectedDayBackgroundColor: "#C70000",
                selectedDayTextColor: "#fff",
                todayTextColor: "#C70000",
                dayTextColor: "#000",
                textDisabledColor: "#d9e1e8", // Color para fechas deshabilitadas
                arrowColor: "#C70000",
                monthTextColor: "#C70000",
                textMonthFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
                }}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0
    },
    calendarContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000"
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 8
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default CustomCalendarModal;
