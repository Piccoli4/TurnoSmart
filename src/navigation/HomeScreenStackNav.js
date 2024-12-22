import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../global/colors';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import MyAppointmentScreen from '../screens/MyAppointmentScreen'
import HistoryAppointmentScreen from '../screens/HistoryAppointmentScreen'

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false, headerBackTitleVisible: false,}}
      />
      <Stack.Screen 
        name="BookAppointment" 
        component={BookAppointmentScreen} 
        options={({ route }) => ({ title: route.params.category,
          headerStyle: {
            backgroundColor: colors.red
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            textShadowColor: '#000',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 0.9 
          },
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen 
        name="MyAppointments" 
        component={MyAppointmentScreen} 
        options={({ route }) => ({ title: route.params.category,
          headerStyle: {
            backgroundColor: colors.red
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            textShadowColor: '#000',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 0.9 
          },
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen 
        name="HistoryAppointment" 
        component={HistoryAppointmentScreen} 
        options={({ route }) => ({ title: route.params.category,
          headerStyle: {
            backgroundColor: colors.red
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            textShadowColor: '#000',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 0.9 
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeScreenStackNav