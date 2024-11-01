import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';
import MusicCard from './MusicCard';

interface MusicContainerProps {
  musicData: {
    id: string;
    title: string;
    musicUrl: string;
    albumCover: ImageSourcePropType;
  }[];
}

export default function MusicContainer({ musicData }: MusicContainerProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlayPause = (isPlaying: boolean, id: string) => {
    if (isPlaying) {
      setPlayingTrackId(id);
    } else {
      setPlayingTrackId(null);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 40) / 4; // 40 is the total horizontal padding

  const renderMusicCards = () => {
    const rows = [];
    for (let i = 0; i < musicData.length; i += 4) {
      const rowItems = musicData.slice(i, i + 4);
      const row = (
        <View key={i} style={styles.row}>
          {rowItems.map((item) => (
            <MusicCard
              key={item.id}
              title={item.title}
              musicUrl={item.musicUrl}
              albumCover={item.albumCover}
              onPlayPause={(isPlaying) => handlePlayPause(isPlaying, item.id)}
              width={cardWidth}
            />
          ))}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {renderMusicCards()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 19,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  
  
});