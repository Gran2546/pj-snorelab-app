import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, AppState } from 'react-native';
import { Audio } from 'expo-av';
import { RecordingOptionsPresets } from 'expo-av/build/Audio';

export default function AudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);

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
      const { recording } = await Audio.Recording.createAsync(
        RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI(); // Get the URI of the recorded file
    console.log('Recording stopped and stored at', uri);
  };

  return (
    <View>
      <Text>Audio Recorder</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}
