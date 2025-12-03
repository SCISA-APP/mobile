import EventList from "@/components/ui/EventList";
import ListComponent from "@/components/ui/ListComponent";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useOccasionAnnouncement } from "@/context/OccasionAnnouncementContext";
import Header from "@/components/ui/Header";

const HomeScreen = () => {
    const { occasions, announcements, loading } = useOccasionAnnouncement();

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <Header />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <EventList headerTitle="Upcoming Events" data={occasions} />
        <ListComponent
          headerTitle="Feed"
          data={announcements}
          emptyTitle="No News Yet"
          emptyDescription="Stay tuned for HostelHubb updates."
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
});

export default HomeScreen;
