import CollapsibleHeader from "@/components/ui/CollapsibleHeader";
import EventList from "@/components/ui/EventList";
import ListComponent from "@/components/ui/ListComponent";
import QuickAccessCard from "@/components/ui/QuickAccessCard";
import colors from "@/constants/colors";
import { useOccasionAnnouncement } from "@/context/OccasionAnnouncementContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const HomeScreen = () => {
  const { occasions, announcements } = useOccasionAnnouncement();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      {/* Collapsible Header */}
      <CollapsibleHeader scrollY={scrollY} />

      {/* Scrollable content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100).duration(600)}>
          <QuickAccessCard />
        </Animated.View>

        {occasions && occasions.length > 0 && (
          <Animated.View entering={FadeIn.delay(200).duration(600)}>
            <EventList headerTitle="Upcoming Events" data={occasions} />
          </Animated.View>
        )}

        <Animated.View entering={FadeIn.delay(occasions && occasions.length > 0 ? 400 : 200).duration(600)}>
          <ListComponent
            headerTitle="Feed"
            data={announcements}
            emptyTitle="No News Yet"
            emptyDescription="Stay tuned for SCISA updates."
          />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
