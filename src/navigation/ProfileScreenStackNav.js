import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/ProfileScreen'
import { colors } from '../global/colors'
import TestsScreen from '../screens/TestsScreen'
import AdminTestsScreen from '../screens/AdminTestsScreen'

const Stack = createStackNavigator()

const ProfileScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Profile-Tab' 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          headerTitle: ''
        }}
      />
      <Stack.Screen 
        name='MyTests' 
        component={TestsScreen}
        options={{
            headerTitle: 'Mis Estudios',
            headerStyle: {
              backgroundColor: colors.red
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: '600',
              textShadowColor: '#000',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 1
            },
            headerBackTitleVisible: false,
          }}
      />
      <Stack.Screen 
        name='Tests' 
        component={AdminTestsScreen}
        options={{
            headerTitle: 'Estudios',
            headerStyle: {
              backgroundColor: colors.red
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: '600',
              textShadowColor: '#000',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 1
            },
            headerBackTitleVisible: false,
          }}
      />
    </Stack.Navigator>
  )
}

export default ProfileScreenStackNav
