import colors from '@/constants/colors'
import { Lightbulb, RefreshCw, Search } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

interface NotFoundProps {
  searchQuery?: string
  onRetry?: () => void
  onGoHome?: () => void
}

export default function NotFound({
  searchQuery = 'your search',
  onRetry,
  onGoHome,
}: NotFoundProps) {
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [scaleAnim, fadeAnim])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Search size={64} color="#6366f1" strokeWidth={1.5} />
        </View>

        {/* Title */}
        <Text style={styles.title}>No Results Found</Text>

        {/* Description */}
        <Text style={styles.description}>
          We couldn't find anything matching "{searchQuery}". Try adjusting your search terms.
        </Text>

        {/* Suggestions */}
        <View style={styles.suggestionsContainer}>
          <View style={styles.suggestionItem}>
            <Lightbulb size={20} color="#f59e0b" />
            <Text style={styles.suggestionText}>Try different keywords</Text>
          </View>
          <View style={styles.suggestionItem}>
            <RefreshCw size={20} color="#f59e0b" />
            <Text style={styles.suggestionText}>Check your spelling</Text>
          </View>
        </View>

        
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  suggestionsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryDark,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  
})