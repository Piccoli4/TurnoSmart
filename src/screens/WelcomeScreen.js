import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../../assets/img/logo.png'

const WelcomeScreen = () => {

    const navigation = useNavigation()

  return (
    <LinearGradient
        colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
        locations={[0, 0.15, 0.60, 0.95]}
        style={styles.background}
    >
        <View style={styles.container}>
            <View style={styles.imageTextContainer}>
                <Image 
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Aplicación para reservación de turnos</Text>
                    <Text style={styles.description}>
                        Gestiona tus turnos de manera rápida y sencilla desde cualquier lugar.
                        {"\n"}
                        Optimiza tu tiempo y olvídate de las largas esperas.
                    </Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                </Pressable>
                <Pressable style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpButtonText}>Registrarse</Text>
                </Pressable>
            </View>
        </View>
    </LinearGradient>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    imageTextContainer: {
        width: '100%',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 250
    },
    textContainer: {
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '700'
    },
    description: {
        marginTop: 20,
        marginHorizontal: 12,
        fontSize: 17,
        textAlign: 'justify'
    },
    buttonsContainer: {
        alignItems: 'center'
    },
    loginButton: {
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
    signUpButton: {
        marginVertical: 20,
        width: '85%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#022974',
        borderRadius: 10,
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
    signUpButtonText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '700',
        textShadowColor: '#000',
        textShadowOffset: {width: 0.8, height: 0.8},
        textShadowRadius: 0.9
    }
})