import React, { useEffect, useState } from 'react';
import { View, Text, Alert, AppState, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality } from 'expo-av/build/Audio';
import { API_BASE_URL, get, post, postMultipart } from '../api';
import Button from '../components/Button';
import WebView from 'react-native-webview';
import { getData } from '../lib/asyncStorage';
const { width } = Dimensions.get('screen')

export default function AudioRecorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [appState, setAppState] = useState(AppState.currentState);
    const [recordingTime, setRecordingTime] = useState(0); // Track recording time in seconds
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Track the interval
    const [score, setScore] = useState<number | null>(null); // State to hold the score from the API
    const [fileName, setFileName] = useState<string | null>(null); // State to hold the score from the API

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (recording && appState.match(/inactive|background/) && nextAppState === 'active') {
                // Handle transition from background to foreground if needed
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [recording]);

    // Request permissions on mount
    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access microphone is required!');
            }
        })();
    }, []);

    const startRecording = async () => {
        try {
            Alert.alert('กรุณาเสียบสายชาร์จและคว่ำหน้าจเพื่อบันทึกเสียงกรน')
            // Set audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                staysActiveInBackground: false,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                isMeteringEnabled: true,
                android: {
                    extension: '.wav', // Save as .wav
                    outputFormat: AndroidOutputFormat.DEFAULT,
                    audioEncoder: AndroidAudioEncoder.DEFAULT,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.wav', // Save as .wav
                    audioQuality: IOSAudioQuality.MAX,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
                web: {
                    mimeType: 'audio/wav',
                    bitsPerSecond: 128000,
                },
            });
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');

            // Start the timer
            const id = setInterval(() => {
                setRecordingTime((prevTime) => {
                    if (prevTime + 1 >= 7200) { // 2 hours in seconds
                        stopRecording();
                        clearInterval(id);
                        return prevTime; // Prevent further increment
                    }
                    return prevTime + 1;
                });
            }, 1000); // Update every second
            setIntervalId(id);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI(); // Get the URI of the recorded file
            console.log('Recording stopped and stored at', uri);

            // If needed, you can rename the file to ensure it has a .wav extension
            if (uri && !uri.endsWith('.wav')) {
                const wavUri = uri.replace(/\.[^.]+$/, '.wav'); // Change extension to .wav
                console.log('Renamed to .wav:', wavUri);
            }

            setRecording(null);

            // Stop the timer and reset time
            if (intervalId) clearInterval(intervalId);
            setRecordingTime(0); // Reset the time after stopping recording

            // Call the function to send the recorded file
            if (uri) {
                await callToAction(uri); // Call function with the recording URI
            }
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    // Helper function to format time in HH:mm:ss
    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Function to handle file upload
    const callToAction = async (uri: string) => {
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: 'recording.wav',
            type: 'audio/wav',
        } as never);

        try {
            const response = await postMultipart('record/upload-snorelab', formData);
            console.log('File uploaded successfully', response.result);
            setFileName(response.fileName)
            setScore(response.result); // Assuming the response has a 'score' property

            const result = await getData()
            const user = await get('user/email?email=' + result)

            await post('history/histories', { user_id: user?.user?.id, score: response.result, action: 'SnoreLab' })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <View style={styles.layout}>
            {score === null && <Text style={styles.timeFormat}>{formatTime(recordingTime)}</Text>}
            {score === null && <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />}

            {score !== null && <Text style={styles.timeFormat}>Result</Text>}
            {score !== null && <View style={{ width: width * 0.9, height: 120 }}><WebView
                style={styles.container}
                originWhitelist={['*']}
                scalesPageToFit
                javaScriptEnabled
                source={{ uri: `${API_BASE_URL}record/html/1?fileName=${API_BASE_URL.replace('https://', '')}record/music/${fileName?.replace('uploads/', '')}` }} />
            </View>}
            {score !== null && (
                <Text>SnoreLab Test Score: {score}</Text> // Display the score if available
            )}
            {score !== null && <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />}
        </View>
    );
}


const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 16,
        gap: 8,
        alignItems: 'center',
        width: '100%'
    },
    timeFormat: {
        fontSize: 24,
        fontWeight: '800',
    },
    container: {
        width: width,
    },
})