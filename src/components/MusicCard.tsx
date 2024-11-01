import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';

interface MusicCardProps {
  title: string;
  musicUrl: string;
  albumCover: ImageSourcePropType;
  onPlayPause: (isPlaying: boolean) => void;
  width: number;
}

export default function MusicCard({ title, musicUrl, albumCover, onPlayPause, width }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const handlePress = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
      // Stop rotation and reset scale to original size when pausing
      rotateValue.stopAnimation();
      rotateValue.setValue(0);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: musicUrl });
        setSound(newSound);
        await newSound.playAsync();
      } else {
        await sound.playAsync();
      }
      // Start rotation and shrink the button when playing
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
      Animated.spring(scaleValue, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    }
    setIsPlaying(!isPlaying);
    onPlayPause(!isPlaying);
  };

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            styles.card,
            {
              width: width - 10,
              height: width - 10,
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.imageContainer,
              {
                width: (width - 10) * 0.6,
                height: (width - 10) * 0.6,
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <Image source={albumCover} style={styles.image} />
            <View style={styles.overlay}>
              <Feather name={isPlaying ? 'pause' : 'play'} size={24} color="white" white style = {{opacity: 0.5}} />
            </View>
          </Animated.View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  imageContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    maxWidth: '90%',
  },
});
