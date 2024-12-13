import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <WelcomeScreen/> */}
      {/* <LoginScreen/> */}
      <SignUpScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
