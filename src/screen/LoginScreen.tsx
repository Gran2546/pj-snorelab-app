// screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';
import Input from '../components/Input';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { post } from '../api';
import { getData, storeData } from '../lib/asyncStorage';
import { Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [state, setState] = useState<{ email: string | null, password: string | null }>({
        email: null,
        password: null
    })

    useEffect(() => {
        reloadData()
    }, [])

    async function reloadData() {
        const user = await getData()
        if (user) {
            navigation.navigate('Home')
        }
    }

    async function handleSubmit() {
        try {
            await post('user/login', state);
            storeData(state.email ?? "")
            navigation.navigate('Home')
        } catch (error) {
            Alert.alert('เข้าสู่ระบบไม่สำเร็จ')
        }
    }

    const buttonScale = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    const handlePressIn = () => {
        buttonScale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        buttonScale.value = withSpring(1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/icon/music.png')}
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email Address'
                    onChangeText={(text) => setState(val => ({ ...val, email: text }))}
                    style={styles.input}
                />
             
                <Input
                    placeholder='Password (6+ characters)'
                    secureTextEntry
                    onChangeText={(text) => setState(val => ({ ...val, password: text }))}
                    style={styles.input}
                />
                    <CheckBox label='Remember me' />
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
    <Text style={styles.forgotPassword}>Forgot Password?</Text>
</TouchableOpacity>
            </View>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleSubmit}
            >
                <Animated.View style={[styles.loginButton, animatedButtonStyle]}>
                    <Text style={styles.loginButtonText}>Log in</Text>
                </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000033', // เปลี่ยนเป็นสีพื้นหลังสีน้ำเงินเข้ม
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        marginBottom: 10,
        color: 'white',
    },
    forgotPassword: {
        color: '#8AB4F8',
        textAlign: 'right',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: '#8AB4F8',
        width: 300,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginButtonText: {
        color: '#000033',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        color: 'white',
        marginVertical: 15,
    },
    socialButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
        borderRadius: 25,
        marginBottom: 10,
    },
    signUpText: {
        color: '#8AB4F8',
        marginTop: 20,
    },
});
