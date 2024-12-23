import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAddTestMutation } from '../services/appointments';


const PublishStudyScreen = () => {
    const [ name, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ dni, setDni ] = useState('');
    const [ report, setReport ] = useState('');
    const [ addTest ] = useAddTestMutation();
    

    const handleSubmit = async () => {
        // Validación de campos
        if (!name || !lastName || !dni || !report) {
            Alert.alert('Error', 'Por favor complete todos los campos obligatorios.');
            return;
        }

        if (report.length > 500) {
            Alert.alert('Error', 'El informe no puede exceder los 500 caracteres.');
            return;
        }

        try {
            const result = await addTest({
                name,
                lastName,
                dni,
                report
            }).unwrap();

            // Vacia los campos después de subir el estudio
            setName('');
            setLastName('');
            setDni('');
            setReport('');

            Alert.alert('Éxito', 'El estudio se ha subido correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo subir el estudio.');
        }
    };

  return (
    <LinearGradient
      colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
      locations={[0, 0.20, 0.65, 0.95]}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollView}
        >
          <Text style={styles.title}>Publicar Estudio</Text>
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Ingrese el nombre</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.formInput, styles.capitalizeInput]}
                value={name}
                onChangeText={setName}
              />
            </View>
            <Text style={styles.inputLabel}>Ingrese el apellido</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.formInput, styles.capitalizeInput]}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <Text style={styles.inputLabel}>Ingrese el dni</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                value={dni}
                onChangeText={setDni}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.inputLabel}>Informe Médico</Text>
            <View style={styles.inputReportContainer}>
              <TextInput
                numberOfLines={10}
                multiline
                style={styles.formInput}
                value={report}
                onChangeText={setReport}
                maxLength={500}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Subir Estudio</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default PublishStudyScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  scrollView: {
    padding: 10, 
    alignItems: 'center' 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#022974',
    marginBottom: 5,
    textShadowColor: '#FFF',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.9
  },
  formContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    gap: 5
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: '800'
  },
  inputContainer: {
    width: '95%',
    paddingVertical: 2,
    paddingLeft: 3,
    borderColor: '#022974',
    borderWidth: 2,
    borderRadius: 10
  },
  formInput: {
    fontSize: 18, 
    fontWeight: '600',
    paddingVertical: 10
  },
  capitalizeInput: {
    textTransform: 'capitalize'
  },
  input: {
    paddingVertical: 8
  },
  inputText: {
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.9
  },
  inputReportContainer: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#022974',
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10, 
    fontSize: 18, 
    height: 10 * 24 + 10 // Altura calculada: 10 líneas x lineHeight + padding interno
  },
  submitButton: {
    marginTop: 15,
    backgroundColor: '#C70000',
    padding: 15,
    borderRadius: 8,
    width: '95%',
    alignItems: 'center',
    borderColor: '#022974',
    borderWidth: 2,
    borderRadius: 10
  },
  submitButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.9
  },
});
