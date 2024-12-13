import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../../assets/img/logo.png'

const LoginScreen = () => {
  return (
    <LinearGradient
        colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
        locations={[0, 0.15, 0.60, 0.95]}
        style={styles.background}
    >
        <View style={styles.container}>
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
                        // value= {email}
                        // onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={[styles.inputContainer, styles.passwordContainer]}>
                    <TextInput
                        style={styles.formInput}
                        placeholder='Ingrese su contraseña'
                        placeholderTextColor='#888'
                        // secureTextEntry={!isPasswordShown}
                        // value={password}
                        // onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 12
                        }}
                        // onPress={() => setIsPasswordShown(!isPasswordShown)}
                    >
                        {/* {
                            isPasswordShown == true ? (
                                <Ionicons name='eye' size={24} color='#aaa'/>
                            ) : (
                                <Ionicons name='eye-off' size={24} color='#aaa'/>
                            )
                        } */}
                    </TouchableOpacity>
                </View>
            </View>

            <Pressable style={styles.loginButton} onPress={()=>console.log("Funciona login")}>
                <Text style={styles.loginText}>Iniciar Sesión</Text>
            </Pressable>
            <Pressable onPress={()=>console.log("Funciona olvidaste la contraseña")}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste la contraseña?
                </Text>
            </Pressable>
        </View>
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
    }
})