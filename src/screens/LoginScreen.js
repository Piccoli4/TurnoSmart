import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/img/logo.png'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useLoginUserMutation } from '../services/auth';
import Loading from '../components/Loading';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../validations/loginSchema';
import { insertSession } from '../db';
import MyAlert from '../components/MyAlert'

const LoginScreen = () => {

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isPasswordShown, setIsPasswordShown ] = useState(false)
  const [ errors, setErrors ] = useState({});
  const [ triggerLogin, { isLoading } ] = useLoginUserMutation();
  const dispatch = useDispatch()

  const [ alertVisible, setAlertVisible ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState('');


  const handleLogin = async () => {
    try {
      loginSchema.validateSync({email, password})

      const {data} = await triggerLogin({email, password})
      
      await insertSession({
        email: data.email,
        localId: data.localId,
        idToken: data.idToken
      });

      dispatch(setUser({
        email:data.email, 
        localId: data.localId,
        idToken: data.idToken
      }))
    } catch (error) {
      if (error.path) {
        setErrors({ [error.path]: error.message });
      } else {
        setAlertMessage('Email o contraseña incorrectos');
        setAlertVisible(true);
      }
    }
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

            <View style={styles.logoContainer}>
              <Image
                  source={logo}
                  style={styles.logo}
                  resizeMode="contain"
              />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.formInput}
                  placeholder='Ingrese su correo electrónico' 
                  placeholderTextColor='#888'
                  value= {email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <View style={[styles.inputContainer, styles.passwordContainer]}>
                <TextInput
                  style={styles.formInput}
                  placeholder='Ingrese su contraseña'
                  placeholderTextColor='#888'
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
                            <Ionicons name='eye' size={24} color='#888'/>
                        ) : (
                            <Ionicons name='eye-off' size={24} color='#888'/>
                        )
                    }
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <Pressable style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
                <Text style={styles.loginText}>Iniciar Sesión</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste la contraseña?
                </Text>
            </Pressable>
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

export default LoginScreen

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  logo: {
    width: 250,
    height: 250
  },
  formContainer: {
    marginVertical: 25,
    width: '100%',
    alignItems: 'center',
    gap: 10
  },
  inputContainer: {
    width: '85%',
    marginVertical: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    borderColor: '#022974',
    borderWidth: 2,
    borderRadius: 10
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  formInput: {
    fontSize: 20,
    fontWeight: '600'
  },
  loginButton: {
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
  loginText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.9
  },
  forgotPasswordText: {
    color:'#035efc',
    fontWeight: '500',
    textShadowColor: '#444',
    textShadowOffset: {width: 0.7, height: 0.7},
    textShadowRadius: 0.9
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