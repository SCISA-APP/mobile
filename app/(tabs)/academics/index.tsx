import Header from "@/components/ui/Header";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { academicsStyles } from "./styles";
const PageTitle = ({ title }: { title: string }) => {
  return <Text style={academicsStyles.title}>{title}</Text>;
};

const index = () => {
  return (
    <ScrollView>
      <Header
        showGreeting={false}
        leftComponent={<PageTitle title={"Academics"} />}
      />

      <Text>index</Text>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
