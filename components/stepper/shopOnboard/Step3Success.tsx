import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomButton from '@/components/buttons/CustomButton'
import Complete from "../../../assets/images/Complete.gif"

interface Step3Props {
  onFinish: () => void;
}

const Step3Success: React.FC<Step3Props> = ({ onFinish }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={Complete} style={styles.image} />

        <Text style={styles.title}>Success!</Text>
        <Text style={styles.subtitle}>
          Your documents have been submitted successfully.
        </Text>
      </View>

      <CustomButton label="Finish" onPress={onFinish} />
    </View>
  )
}

export default Step3Success

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // make image and text centered
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
