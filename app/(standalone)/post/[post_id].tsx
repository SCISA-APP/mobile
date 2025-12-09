import { Comment } from "@/types/models";
import { openLink, parseTextWithLinks } from "@/utils/linkUtils";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";

export default function PostDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const title = Array.isArray(params.title) ? params.title[0] : params.title ?? "";
  const date = Array.isArray(params.date) ? params.date[0] : params.date;
  const description = Array.isArray(params.description) ? params.description[0] : params.description;
  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  const paragraphs = typeof description === 'string' 
    ? description.split('\n\n').filter(p => p.trim().length > 0)
    : [];

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(),
      content: newComment,
      author: "You",
      createdAt: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
    Keyboard.dismiss();
  };

  const renderParagraph = (paragraph: string, index: number) => {
    const parts = parseTextWithLinks(paragraph.trim());

    return (
      <Text key={index} style={styles.paragraph}>
        {parts.map((part, partIndex) => {
          if (part.type === 'link') {
            return (
              <Text
                key={partIndex}
                onPress={() => openLink(part.url)}
                style={styles.link}
              >
                {part.content}
              </Text>
            );
          }
          return <Text key={partIndex}>{part.content}</Text>;
        })}
      </Text>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View entering={FadeInUp.duration(600)}>
            {image && (
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <View style={styles.contentCard}>
              <Text style={styles.title}>{title}</Text>
              
              {date && (
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                  <Text style={styles.date}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
            </View>
          </Animated.View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <View style={styles.commentsHeader}>
              <Ionicons name="chatbubbles" size={20} color={colors.primary} />
              <Text style={styles.commentsTitle}>Comments</Text>
              <View style={styles.commentsBadge}>
                <Text style={styles.commentsBadgeText}>{comments.length}</Text>
              </View>
            </View>

            {comments.length === 0 ? (
              <View style={styles.emptyComments}>
                <Ionicons name="chatbubble-outline" size={48} color={colors.gray[300]} />
                <Text style={styles.emptyCommentsText}>
                  No comments yet. Be the first!
                </Text>
              </View>
            ) : (
              comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <View style={styles.commentAvatar}>
                      <Text style={styles.commentAvatarText}>
                        {comment.author.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.commentInfo}>
                      <Text style={styles.commentAuthor}>{comment.author}</Text>
                      <Text style={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Share your thoughts..."
            placeholderTextColor={colors.text.disabled}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
            style={[
              styles.sendButton,
              { backgroundColor: newComment.trim() ? colors.primary : colors.gray[300] }
            ]}
          >
            <Ionicons
              name="send"
              size={18}
              color={newComment.trim() ? colors.white : colors.gray[500]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const 
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 280,
    backgroundColor: colors.gray[200],
  },
  contentCard: {
    backgroundColor: colors.white,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 32,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  commentsSection: {
    padding: 16,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    flex: 1,
  },
  commentsBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  commentsBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyComments: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  emptyCommentsText: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 12,
  },
  commentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.text.primary,
  },
  commentDate: {
    color: colors.text.secondary,
    fontSize: 11,
    marginTop: 2,
  },
  commentContent: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
