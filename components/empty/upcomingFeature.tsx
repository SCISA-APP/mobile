import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import WorkingGif from '@/assets/images/Working.gif';

interface UpcomingFeatureProps {
  title?: string;
}

const UpcomingFeature: React.FC<UpcomingFeatureProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image source={WorkingGif} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title || 'Feature'} Coming Soon 🚧</Text>

    </View>
  );
};

export default UpcomingFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#002855',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});
