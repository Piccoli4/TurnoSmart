import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenStackNav from './HomeScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? '#FFFFFF' : '#FFFFFF80',
              fontSize: 14,
              marginBottom: 3,
              fontWeight: '700'
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;

          // Define el nombre del ícono basado en la ruta
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={focused ? '#FFFFFF' : '#FFFFFF80'}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#022974',
          elevation: 0,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: '#022974',
        tabBarInactiveTintColor: '#02297480',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreenStackNav} />
      <Tab.Screen name="Perfil" component={ProfileScreenStackNav} />
    </Tab.Navigator>
  );
}
