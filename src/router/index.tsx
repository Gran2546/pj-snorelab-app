import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import LoginScreen from '../screen/LoginScreen';
import DetailsScreen from '../screen/DetailsScreen';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen';
import SnoreLabTestScreen from '../screen/SnoreLabTestScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ForgetPassword from '../screen/ForgetPassword';
import SoundsScreen from '../screen/SoundsScreen';
import MusicScreen from '../screen/MusicScreen';

export type RootStackParamList = {
    Home: undefined;
    Register: undefined;
    ForgetPassword: undefined;
    Login: undefined;
    Profile: undefined;
    SnoreLabTest: undefined;
    Details: { itemId: number; otherParam?: string };
    Sounds: undefined;
    Music: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'moon';
                    } else if (route.name === 'Sounds') {
                        iconName = 'music';
                    } else if (route.name === 'SnoreLabTest') {
                        iconName = 'mic';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    } else if (route.name === 'Music') {
                        iconName = 'settings';
                    }
                    return <Feather name={iconName as keyof typeof Feather.glyphMap} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4ecca3',
                tabBarInactiveTintColor: '#d1d1d1',
                tabBarStyle: {
                    backgroundColor: '#1a1a2e',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 55,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderTopWidth: 0,
                },
                headerShown: false,
            })}
        >
         
            <Tab.Screen name="Sounds" component={SoundsScreen} />
            <Tab.Screen name="Music" component={MusicScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="SnoreLabTest" component={SnoreLabTestScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
           
        </Tab.Navigator>
    );
}

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }}/>
                <Stack.Screen name="Sounds" component={SoundsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="MusicScreen" component={MusicScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
