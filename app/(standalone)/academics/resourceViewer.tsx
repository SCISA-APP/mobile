import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

const ResourceViewer = () => {
  const { link, title } = useLocalSearchParams<{ link: string; title?: string }>();

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: link }} 
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator 
            style={styles.loader} 
            size="large" 
            color="#002855" 
          />
        )}
      />
    </View>
  );
};

export default ResourceViewer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
