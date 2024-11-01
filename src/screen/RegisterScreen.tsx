// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';
import Input from '../components/Input';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { post } from '../api';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { KeyboardAvoidingView } from 'react-native';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type StateType = {
    firstName: string | null,
    lastName: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    confirmPassword: string | null
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [state, setState] = useState<StateType>({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null
    });

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

    async function handleSubmit() {
        try {
            if (!state.password || !state.confirmPassword) {
                Alert.alert('กรุณาระบุรหัสผ่าน');
                return;
            }

            if (state.confirmPassword !== state.password) {
                Alert.alert('รหัสผ่านไม่ตรงกัน');
                return;
            }

            await post('user/register', state);
            navigation.goBack();
            Alert.alert('สมัครสมาชิกสำเร็จ');
        } catch (error) {
            Alert.alert('สมัครสมาชิกไม่สำเร็จ');
        }
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <SafeAreaView />
                <Image source={require('../../assets/icon/music.png')} style={styles.logo} />
                <Input placeholder='firstName' label='firstName' onChangeText={(text) => setState(val => ({ ...val, firstName: text }))} />
                <Input placeholder='lastName' label='lastName' onChangeText={(text) => setState(val => ({ ...val, lastName: text }))} />
                <Input placeholder='username' label='username' onChangeText={(text) => setState(val => ({ ...val, username: text }))} />
                <Input placeholder='email' label='email' onChangeText={(text) => setState(val => ({ ...val, email: text }))} />
                <Input placeholder='password' secureTextEntry label='password' onChangeText={(text) => setState(val => ({ ...val, password: text }))} />
                <Input placeholder='confirm-password' secureTextEntry label='confirm-password' onChangeText={(text) => setState(val => ({ ...val, confirmPassword: text }))} />
                <CheckBox label='Term of use' />
                <Button
                    title="Register"
                    onPress={handleSubmit}
                >
                    <Animated.View style={[styles.registerButton, animatedButtonStyle]}>
                        <Text style={styles.registerButtonText}>Create an account</Text>
                    </Animated.View>
                </Button>
                <Text style={styles.termsText}>
                    By continuing, you agree to BetterSleep’s Terms of Service and Privacy Policy.
                </Text>
                <Text style={styles.orText}>or</Text>
                <Button title="Connect with Apple" style={styles.socialButton} />
                <Button title="Connect with Google" style={styles.socialButton} />
                <Button title="Connect with Facebook" style={styles.socialButton} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.loginText}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E27',
        justifyContent: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
        
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 15,
        height: 40,
    },
    registerButton: {
        backgroundColor: '#4A90E2',
        width: '80%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    termsText: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    orText: {
        color: 'white',
        marginVertical: 15,
    },
    socialButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '80%',
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    loginText: {
        color: '#4A90E2',
        marginTop: 20,
        textAlign: 'center',
    },
});
