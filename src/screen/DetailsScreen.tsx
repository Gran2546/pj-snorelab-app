// screens/DetailsScreen.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const { itemId, otherParam } = route.params;

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam || 'None'}</Text>
    </View>
  );
}
