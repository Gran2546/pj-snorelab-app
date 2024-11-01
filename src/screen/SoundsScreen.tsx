import { View, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MusicContainer from '../components/MusicContainer';
import { API_BASE_URL, get } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router';

type Record = {
    created_at: string;
    id: number;
    name: string;
    record_data: {
        mp3_path: string;
    };
    user_id: number | null;
}

type SoundsScreenProps = NativeStackScreenProps<RootStackParamList, 'Sounds'>;
export default function SoundsScreen({ navigation }: SoundsScreenProps) {
    const [musics, setMusics] = useState<Record[]>([]);

    useEffect(() => {
        reloadService();
    }, []);

    async function reloadService() {
        const results = await get('record/records');
        setMusics(results.map((record: Record) => ({
            id: record.id.toString(),
            title: record.name,
            albumCover: require('../../assets/icon/turntable-svgrepo-com.png'),
            musicUrl: API_BASE_URL + "record/music" + record.record_data.mp3_path.replace('uploads', ''),
        })));
    }

    return (
        <View style={styles.layout}>
            <SafeAreaView />
            <MusicContainer musicData={musics} />
        </View>
    );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
});