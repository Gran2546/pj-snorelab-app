import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';
import Input from '../components/Input';
import Button from '../components/Button';
import { post } from '../api';

type ForgetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgetPassword'>;

export default function ForgetPassword({ navigation }: ForgetPasswordProps) {
    const [email, setEmail] = useState<string | null>(null);

    async function handleResetPassword() {
        try {
            if (!email) {
                Alert.alert('กรุณาระบุอีเมล');
                return;
            }
            await post('/reset-password', { email });
            Alert.alert('กรุณาตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน');
            navigation.goBack();
        } catch (error) {
            Alert.alert('ไม่สามารถรีเซ็ตรหัสผ่านได้');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>What's your email?</Text>
            <Text style={styles.subText}>
                Enter the email address associated with your account to reset your password.
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email Address'
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
            </View>
            <Button
                title="Reset Password"
                onPress={handleResetPassword}
                style={styles.resetButton}
            />
            <Button
                title="Back to login"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000033',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        color: 'white',
    },
    resetButton: {
        backgroundColor: '#8AB4F8',
        width: 300,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: 'transparent',
        color: '#8AB4F8',
    },
});
