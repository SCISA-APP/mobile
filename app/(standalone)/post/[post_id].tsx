import { Comment } from '@/types/models';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY = '#002259';
const NAVY_MID = '#003080';

export default function AnnouncementDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { title, description, image, date } = useLocalSearchParams<{
    title: string; description: string; image?: string; date?: string;
  }>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      { id: Math.random().toString(), content: newComment, author: 'You', createdAt: new Date() },
      ...comments,
    ]);
    setNewComment('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}
    >
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <Animated.View entering={FadeInUp.duration(500)}>
            {/* Hero image with gradient + back button */}
            <View style={styles.heroWrap}>
              {image ? (
                <Image source={{ uri: image }} style={styles.heroImage} resizeMode="cover" />
              ) : (
                <LinearGradient colors={[NAVY, NAVY_MID]} style={styles.heroImage}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
              )}
              <LinearGradient
                colors={['rgba(0,22,89,0.55)', 'transparent']}
                style={styles.heroTopGrad}
              />
              {/* Back button */}
              <TouchableOpacity
                style={[styles.backBtn, { top: insets.top + 12 }]}
                onPress={() => router.back()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Content card */}
            <View style={styles.contentCard}>
              <View style={styles.metaRow}>
                <View style={styles.dateBadge}>
                  <Ionicons name="calendar-outline" size={12} color={NAVY_MID} />
                  <Text style={styles.dateBadgeText}>{date ?? 'Upcoming'}</Text>
                </View>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>Announcement</Text>
                </View>
              </View>

              <Text style={styles.title}>{title}</Text>
              <View style={styles.divider} />
              <Text style={styles.body}>{description}</Text>
            </View>
          </Animated.View>

          {/* Comments */}
          <View style={styles.commentsSection}>
            <View style={styles.commentsTitleRow}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <View style={styles.commentsBadge}>
                <Text style={styles.commentsBadgeText}>{comments.length}</Text>
              </View>
            </View>

            {comments.length === 0 ? (
              <Animated.View entering={FadeInDown.duration(400)} style={styles.emptyComments}>
                <Ionicons name="chatbubble-outline" size={32} color={NAVY_MID} style={{ opacity: 0.3 }} />
                <Text style={styles.emptyCommentsText}>
                  No comments yet. Be the first to share your thoughts!
                </Text>
              </Animated.View>
            ) : (
              comments.map((c, i) => (
                <Animated.View key={c.id} entering={FadeInDown.delay(i * 60).duration(300)}>
                  <View style={styles.commentCard}>
                    <View style={styles.commentAvatar}>
                      <Text style={styles.commentAvatarText}>{c.author[0].toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentAuthor}>{c.author}</Text>
                        <Text style={styles.commentTime}>
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </View>
                      <Text style={styles.commentContent}>{c.content}</Text>
                    </View>
                  </View>
                </Animated.View>
              ))
            )}
          </View>
        </ScrollView>

        {/* Comment input */}
        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Share your thoughts…"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
            style={[styles.sendBtn, !newComment.trim() && styles.sendBtnDisabled]}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },

  heroWrap: { height: 300, overflow: 'hidden' },
  heroImage: { width: '100%', height: 300 },
  heroTopGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },
  backBtn: {
    position: 'absolute', left: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,34,89,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },

  contentCard: {
    backgroundColor: '#fff',
    marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 4,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: `${NAVY_MID}12`, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  dateBadgeText: { fontSize: 12, fontWeight: '600', color: NAVY_MID },
  typeBadge: {
    backgroundColor: NAVY, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },

  title: {
    fontSize: 26, fontWeight: '800', color: '#1a1a1a',
    lineHeight: 32, letterSpacing: -0.3,
  },
  divider: {
    height: 3, width: 36, backgroundColor: NAVY_MID,
    borderRadius: 2, marginVertical: 16,
  },
  body: { fontSize: 16, color: '#4a4a4a', lineHeight: 26, letterSpacing: 0.1 },

  commentsSection: { paddingHorizontal: 16, marginTop: 20 },
  commentsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  commentsTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  commentsBadge: {
    backgroundColor: NAVY, borderRadius: 12,
    paddingHorizontal: 9, paddingVertical: 3,
  },
  commentsBadgeText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  emptyComments: {
    backgroundColor: '#fff', borderRadius: 16, padding: 28,
    alignItems: 'center', gap: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 6, elevation: 2,
  },
  emptyCommentsText: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 20 },

  commentCard: {
    flexDirection: 'row', gap: 12,
    backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 5, elevation: 2,
  },
  commentAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: NAVY_MID,
    justifyContent: 'center', alignItems: 'center',
  },
  commentAvatarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  commentAuthor: { fontWeight: '700', fontSize: 14, color: '#1a1a1a' },
  commentTime: { fontSize: 11, color: '#bbb' },
  commentContent: { fontSize: 14, color: '#4a4a4a', lineHeight: 20 },

  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e5e5',
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 4,
  },
  input: {
    flex: 1, backgroundColor: '#F2F4F7', borderRadius: 22,
    paddingHorizontal: 16, paddingVertical: 11,
    fontSize: 15, color: '#1a1a1a',
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: NAVY_MID,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#ddd' },
});
