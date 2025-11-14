import EventList from "@/components/ui/EventList";
import ListComponent from "@/components/ui/ListComponent";
import React from "react";
import { ScrollView } from "react-native";
import { occasions, announcements } from "@/assets/data";

const HomeScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <EventList headerTitle="Upcoming Events" data={occasions} />
      <ListComponent
        headerTitle="Feed"
        data={announcements}
        emptyTitle="No News Yet"
        emptyDescription="Stay tuned for HostelHubb updates."
      />
    </ScrollView>
  );
};

export default HomeScreen;
