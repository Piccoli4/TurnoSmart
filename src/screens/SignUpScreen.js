import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import defaultUser from '../../assets/img/defaultUser.png'
import { useNavigation } from '@react-navigation/native';
import { useSignUpUserMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import { signUpSchema } from '../validations/signUpSchema';
import * as ImagePicker from 'expo-image-picker'
import { usePatchImageProfileMutation } from '../services/user';
import { setUser } from '../features/auth/authSlice'
import MyAlert from '../components/MyAlert'
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = () => {

  const insets = useSafeAreaInsets()
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ triggerAddImageProfile ] = usePatchImageProfileMutation()
  const [ name, setName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ dni, setDni ] = useState('')
  const [ birthDate, setBirthDate ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repeatedPassword, setRepeatedPassword ] = useState('')
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
  const [ isRepeatedPasswordShown, setIsRepeatedPasswordShown ] = useState(false)
  const [ errors, setErrors ] = useState({})
  const navigation = useNavigation()
  const [ triggerSigUp, { isLoading } ] = useSignUpUserMutation()
  const dispatch = useDispatch()
  const [ alertVisible, setAlertVisible ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState('');
  const [ showDatePicker, setShowDatePicker ] = useState(false);


  const pickImage = async () => {
    // Solicitar permisos para acceder a la cámara y a la galería
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la cámara.');
      return;
    }
  
    // Mostrar opciones al usuario
    const options = [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Tomar una foto', onPress: openCamera },
      { text: 'Elegir de la galería', onPress: openGallery }
    ];
  
    // Usar Alert para mostrar opciones
    Alert.alert('Seleccionar Imagen', 'Elige una opción', options);
  };
  
  // Abrir la cámara
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
      allowsEditing: true
    });
  
    if (!result.canceled) {
      setSelectedImage('data:image/jpeg;base64,' + result.assets[0].base64);
    }
  };
  
  // Abrir la galería
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
      allowsEditing: true
    });
  
    if (!result.canceled) {
      setSelectedImage("data:image/jpeg;base64," + result.assets[0].base64);
    }
  };

  // Función para manejar el registro del usuario
  const handleSignUp = async () => {
    try {
      signUpSchema.validateSync({ name, lastName, email, password, repeatedPassword, dni, birthDate });

      // Crea la cuenta de usuario
      const { data } = await triggerSigUp({ email, password });

      // Sube la imagen y los datos del perfil después de la creación del usuario
      if (selectedImage || name || lastName) {
        await triggerAddImageProfile({ 
          image: selectedImage, 
          localId: data.localId,
          email: data.email,
          name, 
          lastName,
          dni,
          birthDate,
          role: 'user' // Asigna un rol predeterminado 
        });
      }

      // Dispatch user data to Redux
      dispatch(setUser({
        email: data.email,
        idToken: data.idToken,
        localId: data.localId,
        name,          
        lastName,
        dni, 
        birthDate,
        image: selectedImage,
        role 
      }));

      // Si es exitoso navega a Home
      navigation.navigate('Home');
    } catch (error) {
      // Si el error es de validación
      if (error.path) {
        setErrors({ [error.path]: error.message });
      } else {
        // Si el usuario ya está registrado
        setAlertMessage('El usuario ya está registrado.');
        setAlertVisible(true);
      }
    }
  };

  // Función para mostrar el DateTimePicker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Función para manejar la selección de fecha
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false); // Cerrar el picker después de seleccionar la fecha
    setBirthDate(currentDate.toLocaleDateString()); // Formato de fecha en texto
  };  

  return (
    <LinearGradient
      colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
      locations={[0, 0.15, 0.60, 0.95]}
      style={styles.background}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>

          <View style={styles.userImageContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                ) : (
                  <View>
                    <Image
                        source={defaultUser}
                        style={styles.user}
                        resizeMode="contain"
                    />
                    <Ionicons 
                        name="camera" 
                        size={40} 
                        color="#333" 
                        style={{
                            position: 'absolute',
                            bottom: 35,
                            right: 35
                        }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.formInput, styles.capitalizeInput]}
                placeholder='Ingrese su nombre' 
                placeholderTextColor='#666'
                value= {name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.formInput, styles.capitalizeInput]}
                placeholder='Ingrese su apellido' 
                placeholderTextColor='#666'
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                placeholder='Ingrese su DNI' 
                placeholderTextColor='#666'
                value={dni}
                onChangeText={(text) => setDni(text)}
                keyboardType='numeric'
              />
            </View>
            {errors.dni && <Text style={styles.errorText}>{errors.dni}</Text>}
            <View style={[styles.inputContainer, styles.birthday]}>
              <TextInput
                style={styles.formInput}
                placeholder='Fecha de Nacimiento' 
                placeholderTextColor='#666'
                value={birthDate}
                onChangeText={(text) => setBirthDate(text)}
              />
              <TouchableOpacity
                  style={{
                      position: 'absolute',
                      right: 12
                  }}
                  onPress={showDatepicker}
              >
                <Ionicons name='calendar' size={24} color='#666'/>
              </TouchableOpacity>
            </View>
            {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
            {/* Mostrar el DateTimePicker solo si se activa el estado showDatePicker */}
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                placeholder='Ingrese su correo electrónico' 
                placeholderTextColor='#666'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={[styles.inputContainer, styles.passwordContainer]}>
              <TextInput
                style={styles.formInput}
                placeholder='Ingrese su contraseña'
                placeholderTextColor='#666'
                secureTextEntry={!isPasswordShown}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                  style={{
                      position: 'absolute',
                      right: 12
                  }}
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
              >
                  {
                      isPasswordShown == true ? (
                          <Ionicons name='eye' size={24} color='#666'/>
                      ) : (
                          <Ionicons name='eye-off' size={24} color='#666'/>
                      )
                  }
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                  <TextInput
                      style={styles.formInput}
                      placeholder='Repita su contraseña'
                      placeholderTextColor= '#666'
                      secureTextEntry= {!isRepeatedPasswordShown}
                      value={repeatedPassword}
                      onChangeText={(text) => setRepeatedPassword(text)}
                  />
                  <TouchableOpacity
                      style={{
                          position: 'absolute',
                          right: 12
                      }}
                      onPress={() => setIsRepeatedPasswordShown(!isRepeatedPasswordShown)}
                  >
                      {
                          isRepeatedPasswordShown == true ? (
                              <Ionicons name='eye' size={24} color='#666'/>
                          ) : (
                              <Ionicons name='eye-off' size={24} color='#666'/>
                          )
                      }
                  </TouchableOpacity>
              </View>
            </View>
            {errors.repeatedPassword && <Text style={styles.errorText}>{errors.repeatedPassword}</Text>}
            <View style={styles.pressableContainer}>
              <Pressable style={styles.buttonContainer} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>Crear Cuenta</Text>
              </Pressable>
            </View>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Ya tienes cuenta?</Text>
              <Pressable
                  onPress={() => navigation.navigate('Login')}
              >
                  <Text style={styles.loginContainerPressableText}>Ingresar</Text>
              </Pressable>
            </View>
          </View>

        </View>
      )}
      <MyAlert 
        visible={alertVisible} 
        onClose={() => setAlertVisible(false)} 
        message={alertMessage} 
        type="error"
      />
    </LinearGradient>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  userImageContainer: {
  marginTop: 20
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    borderColor: '#022974',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  user: {
    width: 160,
    height: 160
  },
  formContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    gap: 5
  },
  inputContainer: {
    width: '85%',
    marginVertical: 3,
    paddingVertical: 10,
    paddingLeft: 10,
    borderColor: '#022974',
    borderWidth: 2,
    borderRadius: 10
  },
  birthday: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  formInput: {
    fontSize: 18, 
    fontWeight: '600'
  },
  capitalizeInput : {
    textTransform: 'capitalize',
  },
  pressableContainer: {
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    width: '85%',
    backgroundColor: '#C70000',
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
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.9
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
  },
  loginContainerPressableText: {
    fontSize: 20,
    color: '#78defa',
    fontWeight: 'bold',
    marginLeft: 10
  }, 
  errorText: {
    alignSelf: 'flex-start',
    marginTop: -10,
    marginLeft: 35,
    color: '#f00',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 1
  }
})