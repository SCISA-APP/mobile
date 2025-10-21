import EventList from '@/components/ui/EventList';
import ListComponent from '@/components/ui/ListComponent';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const index = () => {


  const occasions = [
    {
      id: 1,
      title: "End of Semester Party 🎉",
      description: "Join us for music, food, and fun this Friday evening.",
      image: "https://picsum.photos/400/300",
      date: "Oct 28, 2025",
    },
    {
      id: 2,
      title: "Health Checkup Day 🩺",
      description: "Free medical screening for all residents.",
      image: "https://picsum.photos/400/301",
      date: "Nov 3, 2025",
    },
    {
      id: 3,
      title: "Hostel Clean-Up Campaign 🧹",
      description: "Let’s keep our environment clean together!",
      image: "https://picsum.photos/400/302",
      date: "Nov 10, 2025",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Maintenance Update",
      description: "Water supply will be temporarily off from 9 AM to 12 PM.",
      image: "https://picsum.photos/600/400",
      date: "Oct 21, 2025",
    },
    {
      id: 2,
      title: "New Cafeteria Menu",
      description:
        "We’ve added more local dishes to the hostel cafeteria menu starting next week.",
      thumbnail: "https://picsum.photos/200/200",
      date: "Oct 20, 2025",
    },
    {
      id: 3,
      title: "Hostel Safety Tips",
      description:
        "Always keep your valuables locked up and report any suspicious activity immediately.",
      date: "Oct 19, 2025",
    },
  ];
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
    <EventList headerTitle="Upcoming Events" data={occasions} />
    <ListComponent
    headerTitle="Feed"
    data={announcements}
    onPressItem={null}
    emptyTitle="No News Yet"
    emptyDescription="Stay tuned for HostelHubb updates."

  />
  </ScrollView>
);

  
}

export default index

const styles = StyleSheet.create({})