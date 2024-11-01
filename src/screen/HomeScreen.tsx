import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MusicContainer from '../components/MusicContainer';
import { API_BASE_URL, get } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';

type Record = {
    created_at: string; // ISO date string
    id: number;
    name: string; // Title of the track
    record_data: {
        mp3_path: string; // Path to the mp3 file
    };
    user_id: number | null; // User ID or null if not associated
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [email, setEmail] = useState(''); // สถานะสำหรับเก็บอีเมล
    
    return (
        <View style={styles.layout}>
            <SafeAreaView />
               <Text style={styles.header}>
                {email ? `Welcome to Beddi, ${email}!` : 'Welcome to SnoreLab!'}
            </Text>
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sounds')}>
                    <Image source={require('../../assets/icon/music.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>SOUNDS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SnoreLabTest')}>
                    <Image source={require('../../assets/icon/music.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>SNORELAB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sounds')}>
                    <Image source={require('../../assets/icon/music.png')} style={styles.icon} />
                    <Text style={styles.buttonText}>MUSIC</Text>
                </TouchableOpacity>
            </View>
           
        </View>
        
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0E27',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16, // Space between header and input
        textAlign: 'center', // Center the header text
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f9f9f9',
        paddingHorizontal: 12, // Padding inside the input
    },
});
