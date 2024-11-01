import { View, StyleSheet, Text, ImageBackground, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';
import { get } from '../api';
import { getData, removeData } from '../lib/asyncStorage';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export interface Result {
  user: User;
}

export interface User {
  email: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [state, setState] = useState<Result | null>(null);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    reloadProfile();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function reloadProfile() {
    const result = await getData();
    const response = await get('user/email?email=' + result);

    setState(response);
  }

  return (
    <ImageBackground
      source={require('../../assets/icon/a7395e40-2054-4147-8314-728e940a8063.jpg')}
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Fullname: {state?.user.firstName} {state?.user.lastName}</Text>
        <Text style={styles.text}>Email: {state?.user.email}</Text>
        <Text style={styles.text}>Username: {state?.user.username}</Text>
        <Button
          title="Logout"
          onPress={async () => [await removeData(), navigation.navigate('Login')]}
          style={styles.button}
        />
      </Animated.View>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>Home</Text>
        <Text style={styles.bottomText}>Sounds</Text>
        <Text style={styles.bottomText}>Record</Text>
        <Text style={styles.bottomText}>Outcome</Text>
        <Text style={styles.bottomText}>Profile</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderTopWidth: 0,
  },
  bottomText: {
    color: '#d1d1d1',
    fontSize: 14,
  },
});