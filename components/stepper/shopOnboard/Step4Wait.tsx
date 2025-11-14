import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import WaitProcess from "../../../assets/images/Process.gif"

const Step4Wait = () => {
  return (
    <View style={styles.container}>
      <Image source={WaitProcess} style={styles.image} />
      <Text style={styles.title}>Your information is being processed</Text>
      <Text style={styles.subtitle}>
        You will be notified once your seller request has been accepted.
      </Text>
    </View>
  )
}

export default Step4Wait

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
})
