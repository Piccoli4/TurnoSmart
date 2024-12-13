import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import defaultUser from '../../assets/img/defaultUser.png'
import { Ionicons } from '@expo/vector-icons'

const SignUpScreen = () => {
  return (
    <LinearGradient
        colors={['#C70000', '#FFFFFF', '#FFFFFF', '#022974']}
        locations={[0, 0.15, 0.60, 0.95]}
        style={styles.background}
    >
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imageTouchableContainer}>
                    <Image
                        source={defaultUser}
                        style={styles.user}
                        resizeMode="cover"
                    />
                    <Ionicons 
                        name="camera" 
                        size={40} 
                        color="#333" 
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 25
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.formInput, styles.capitalizeInput]}
                        placeholder='Ingrese su nombre' 
                        placeholderTextColor='#666'
                        // value= {name}
                        // onChangeText={(text) => setName(text)}
                    />
                </View>
                {/* {errors.name && <Text style={styles.errorText}>{errors.name}</Text>} */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.formInput, styles.capitalizeInput]}
                        placeholder='Ingrese su apellido' 
                        placeholderTextColor='#666'
                        // value={lastName}
                        // onChangeText={(text) => setLastName(text)}
                    />
                </View>
                {/* {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>} */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.formInput}
                        placeholder='Ingrese su correo electrónico' 
                        placeholderTextColor='#666'
                        // value={email}
                        // onChangeText={(text) => setEmail(text)}
                    />
                </View>
                {/* {errors.email && <Text style={styles.errorText}>{errors.email}</Text>} */}
                <View style={[styles.inputContainer, styles.passwordContainer]}>
                    <TextInput
                        style={styles.formInput}
                        placeholder='Ingrese su contraseña'
                        placeholderTextColor='#666'
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
                            isPasswordShown == true ? ( */}
                                <Ionicons name='eye' size={24} color='#666'/>
                            {/* ) : (
                                <Ionicons name='eye-off' size={24} color='#666'/>
                            )
                        } */}
                    </TouchableOpacity>
                </View>
                {/* {errors.password && <Text style={styles.errorText}>{errors.password}</Text>} */}
                <View style={styles.inputContainer}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.formInput}
                            placeholder='Repita su contraseña'
                            placeholderTextColor= '#666'
                            // secureTextEntry= {!isRepeatedPasswordShown}
                            // value={repeatedPassword}
                            // onChangeText={(text) => setRepeatedPassword(text)}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 12
                            }}
                            // onPress={() => setIsRepeatedPasswordShown(!isRepeatedPasswordShown)}
                        >
                            {/* {
                                isRepeatedPasswordShown == true ? ( */}
                                    <Ionicons name='eye' size={24} color='#666'/>
                                {/* ) : (
                                    <Ionicons name='eye-off' size={24} color='#666'/>
                                )
                            } */}
                        </TouchableOpacity>
                    </View>
                </View>
                {/* {errors.repeatedPassword && <Text style={styles.errorText}>{errors.repeatedPassword}</Text>} */}
                {/* <View style={styles.check}>
                    <Checkbox
                        style={{marginRight: 8}}
                        value={isChecked}
                        onValueChange={handleCheckboxChange}
                        color={isChecked ? '#7B2CBF' : undefined}
                    />
                    <Text style={{color: '#FFF'}}>Acepto los terminos y condiciones</Text>
                </View>
                {errors.checkbox && <Text style={styles.errorText}>{errors.checkbox}</Text>} */}
                <View style={styles.pressableContainer}>
                    <Pressable style={styles.buttonContainer} onPress={()=>console.log("Funciona handleSignUp")}>
                        <Text style={styles.buttonText}>Crear Cuenta</Text>
                    </Pressable>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Ya tienes cuenta?</Text>
                    <Pressable
                        onPress={() =>console.log("Funciona navigation.navigate('Login')")}
                    >
                        <Text style={styles.loginContainerPressableText}>Ingresar</Text>
                    </Pressable>
                </View>
            </View>

        </View>
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
    imageContainer: {
        marginTop: 60
    },
    imageTouchableContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: '#022974',
        borderWidth: 5
    },
    user: {
        width: '100%',
        height: '100%'
    },
    formContainer: {
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        gap: 10
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
    check: {
        flexDirection: 'row',
        marginVertical: 6
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