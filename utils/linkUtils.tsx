// utils/linkUtils.ts
import { Linking } from "react-native";

export type ParsedPart = 
  | { type: "text"; content: string } 
  | { type: "link"; content: string; url: string };

/**
 * Parse a string and detect URLs, returning parts with type 'text' or 'link'.
 */
export const parseTextWithLinks = (text: string): ParsedPart[] => {
  if (!text) return [];

  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
  const parts: ParsedPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    parts.push({
      type: "link",
      content: match[0],
      url: match[0].startsWith("www.") ? `https://${match[0]}` : match[0],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ type: "text", content: text }];
};

/**
 * Opens a URL using the native Linking API.
 */
export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};
