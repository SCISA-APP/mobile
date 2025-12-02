import React from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const WelfareCardGrid = () => {
  const router = useRouter();

  const cards = [
    {
      title: 'Student Peer Counselor',
      image: require('@/assets/images/studentCounsel.jpg'),
      route: '/(tabs)/welfare/screens/counselors?type=Peer',
    },
    {
      title: 'SCISA Bursary',
      image: require('@/assets/images/bursary.jpg'),
      route: '/(tabs)/welfare/bursary',
    },
    {
      title: 'Report a Concern',
      image: require('@/assets/images/report.jpg'),
      route: '/(tabs)/welfare/screens/concern',
    },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardWrapper}
          onPress={() => router.push(card.route)}
        >
          <ImageBackground
            source={card.image}
            style={styles.card}
            imageStyle={styles.cardImage}
          >
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WelfareCardGrid;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardWrapper: {
    width: '48%',
    marginBottom: 18,
  },

  card: {
    width: '100%',
    height: 170,
    borderRadius: 15,
    overflow: 'hidden',
  },

  // ⬅️ This fixes the right-side grey/ash spacing
  cardImage: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
