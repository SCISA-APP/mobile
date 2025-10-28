import NotesCard from "@/components/academics/NotesCard";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Dropdown from "@/components/inputs/Dropdown";
import Header from "@/components/ui/Header";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { academicsStyles } from "./styles";
import { courses, courseTopics, years } from "./temp";
const PageTitle = ({ title }: { title: string }) => {
  return <Text style={academicsStyles.title}>{title}</Text>;
};

const index = () => {
  const [course, setCourse] = React.useState<string>(courses[0]);
  const [year, setYear] = React.useState<string>(years[0]);
  return (
  <View style={{ flex: 1 }}>
    <Header
      showGreeting={false}
      leftComponent={<PageTitle title={"Academics"} />}
    />
    <View style={[academicsStyles.mainBody, { flex: 1 }]}>
      <CustomInput placeholder={"Search lectures..."} icon={"search"} />
      <View style={academicsStyles.categories}>
        <Dropdown
          data={courses}
          value={course}
          onChange={setCourse}
          placeholder="Select Course"
        />
        <Dropdown
          data={years}
          value={year}
          onChange={setYear}
          placeholder="Select Year"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View>
          <View style={academicsStyles.categories}>
            <View style={{ flex: 1 }}>
              <CustomButton
                label={"Notes& P.Qs"}
                onPress={() => console.log("notes and p.qs")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton
                label={"Timetable"}
                onPress={() => console.log("Timetable")}
              />
            </View>
          </View>

          <View style={academicsStyles.categories}>
            <View style={{ flex: 1 }}>
              <CustomButton
                label={"Exam Allocation"}
                onPress={() => console.log("Exam Allocation")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton
                label={"Lectures"}
                onPress={() => console.log("Lectures")}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          {courseTopics.map((item, index) => (
            <NotesCard
              key={index}
              topic={item.topic}
              description={item.description}
              courseCode={item.courseCode}
              year={item.year}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  </View>
);

};

export default index;

const styles = StyleSheet.create({});
