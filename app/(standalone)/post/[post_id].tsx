import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Comment } from "@/types/models";
import { parseTextWithLinks, openLink } from "@/utils/linkUtils";
import OccasionHeader from "@/components/headers/OccassionHeader";

export default function AnnouncementDetail() {
  const params = useLocalSearchParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Normalize title and date to string
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
      <Text
        key={index}
        style={{
          color: "#4a4a4a",
          fontSize: 16,
          lineHeight: 26,
          letterSpacing: 0.2,
          marginBottom: index < paragraphs.length - 1 ? 16 : 0,
          textAlign: "justify",
        }}
      >
        {parts.map((part, partIndex) => {
          if (part.type === 'link') {
            return (
              <Text
                key={partIndex}
                onPress={() => openLink(part.url)}
                style={{
                  color: "#800020",
                  textDecorationLine: "underline",
                  fontWeight: "600",
                }}
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
      style={{ flex: 1, backgroundColor: "#fafafa" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Animated.View entering={FadeInUp.duration(600)}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 400 }}
                resizeMode="cover"
              />
            )}

            <View
              style={{
                backgroundColor: "white",
                marginTop: -24,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {/* Use OccasionHeader here */}
              <OccasionHeader title={title} date={date} />

              <View
                style={{
                  height: 3,
                  width: 40,
                  backgroundColor: "#800020",
                  borderRadius: 2,
                  marginBottom: 20,
                }}
              />

              {/* Render description paragraphs */}
              {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
            </View>
          </Animated.View>

          {/* Comments Section */}
          <View
            style={{
              marginTop: 16,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 24,
                  backgroundColor: "#800020",
                  borderRadius: 2,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1a1a1a",
                }}
              >
                Comments
              </Text>
              <View
                style={{
                  backgroundColor: "#800020",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {comments.length}
                </Text>
              </View>
            </View>

            {comments.length === 0 ? (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 32,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.03,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    marginBottom: 12,
                  }}
                >
                  💬
                </Text>
                <Text
                  style={{
                    color: "#999",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  No comments yet. Be the first to share your thoughts!
                </Text>
              </View>
            ) : (
              comments.map((comment) => (
                <View
                  key={comment.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.03,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: "#800020",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        {comment.author.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 15,
                          color: "#1a1a1a",
                        }}
                      >
                        {comment.author}
                      </Text>
                      <Text
                        style={{
                          color: "#999",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "#4a4a4a",
                      fontSize: 15,
                      lineHeight: 22,
                      marginLeft: 48,
                    }}
                  >
                    {comment.content}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        {/* Comment Input Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#e5e5e5",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Share your thoughts..."
            placeholderTextColor="#999"
            style={{
              flex: 1,
              backgroundColor: "#f8f8f8",
              borderRadius: 24,
              paddingHorizontal: 18,
              paddingVertical: 12,
              fontSize: 15,
              color: "#1a1a1a",
            }}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
            style={{
              marginLeft: 10,
              backgroundColor: newComment.trim() ? "#800020" : "#e5e5e5",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 24,
              shadowColor: "#800020",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: newComment.trim() ? 0.2 : 0,
              shadowRadius: 4,
              elevation: newComment.trim() ? 3 : 0,
            }}
          >
            <Text
              style={{
                color: newComment.trim() ? "white" : "#999",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}