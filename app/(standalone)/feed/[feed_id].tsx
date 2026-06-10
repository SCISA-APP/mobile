import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'

// Parses **bold** and *italic* markdown into inline segments
type Segment = { text: string; bold?: boolean; italic?: boolean }

function parseInline(raw: string): Segment[] {
  const segments: Segment[] = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: raw.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ text: match[1], bold: true })
    } else if (match[2] !== undefined) {
      segments.push({ text: match[2], italic: true })
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < raw.length) {
    segments.push({ text: raw.slice(lastIndex) })
  }

  return segments
}

function RichText({ content }: { content: string }) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  // If no explicit paragraph breaks, split on ". " boundaries into ~2-sentence chunks
  const blocks =
    paragraphs.length > 1
      ? paragraphs
      : content
          .split(/(?<=\.)\s+(?=[A-Z])/)
          .reduce<string[]>((acc, sentence, i) => {
            if (i % 2 === 0) acc.push(sentence)
            else acc[acc.length - 1] += ' ' + sentence
            return acc
          }, [])

  return (
    <>
      {blocks.map((para, i) => {
        const segments = parseInline(para)
        return (
          <Text key={i} style={styles.paragraph}>
            {segments.map((seg, j) => (
              <Text
                key={j}
                style={[seg.bold && styles.bold, seg.italic && styles.italic]}
              >
                {seg.text}
              </Text>
            ))}
          </Text>
        )
      })}
    </>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const NAVY = '#002259'

const FeedDetails = () => {
  const { title, description, image, date } =
    useLocalSearchParams<{
      feed_id: string
      title: string
      description: string
      image: string
      date: string
    }>()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.heroImage} />
      ) : null}

      <View style={styles.body}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>College News</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>

        <View style={styles.divider} />

        <RichText content={description} />
      </View>
    </ScrollView>
  )
}

export default FeedDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f4',
  },
  content: {
    paddingBottom: 48,
  },
  heroImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: NAVY,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    color: '#1a1a1a',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 26,
    color: '#333',
    marginBottom: 14,
  },
  bold: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
  italic: {
    fontStyle: 'italic',
    color: '#555',
  },
})