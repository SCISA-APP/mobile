import NotesCard from "@/components/academics/NotesCard";
import NotFound from "@/components/academics/NotFound";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Dropdown from "@/components/inputs/Dropdown";
import Header from "@/components/ui/Header";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { academicsStyles } from "./styles";
import { courses, coursesValue, courseTopics, years, yearsValue } from "./temp";
const PageTitle = ({ title }: { title: string }) => {
  return <Text style={academicsStyles.title}>{title}</Text>;
};
type CourseTopic = {
  topic?: string;
  description?: string;
  courseCode?: string;
  year?: number | string;
};

const index = () => {
  const [course, setCourse] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [data, setData] = React.useState<CourseTopic[]>(courseTopics);
  const [search,setSearch] = React.useState<string>("");

function findCourseAndYear(
  courseName: string,
  yearName: string,
) {
  const courseObj = coursesValue.find(c => c.name === courseName) || null
  const yearObj = yearsValue.find(y => y.name === yearName) || null

  return { courseCode:courseObj?.value, year:yearObj?.value }
}

  useEffect(() => {
  const { courseCode, year: yearValue } = findCourseAndYear(course, year)

  const filteredData = courseTopics.filter(item => {
    const matchesCourse = courseCode ? item.courseCode.startsWith(courseCode) : true
    const matchesYear = yearValue ? item.year === yearValue : true

    const searchLower = search.toLowerCase()
    const matchesSearch = search.trim()
      ? item.topic.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      : true

    return matchesCourse && matchesYear && matchesSearch
  })

  setData(filteredData)
}, [course, year, search]) // include search dependency


  return (
  <View style={{ flex: 1 }}>
    <Header
      showGreeting={false}
      leftComponent={<PageTitle title={"Academics"} />}
    />
    <View style={[academicsStyles.mainBody, { flex: 1 }]}>
      <CustomInput placeholder={"Search lectures..."} icon={"search"} value={search}
            onChangeText={setSearch} />
      <View style={academicsStyles.categories}>
        
        <Dropdown
          data={courses}
          value={course}
          onChange={setCourse}
          placeholder="All Courses"
        />
        <View style={{ flex: 0.5 }}>
        <Dropdown
          data={years}
          value={year}
          onChange={setYear}
          placeholder="All Years"
        />
        </View>
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
          {data.length>0?data?.map((item, index) => (
            <NotesCard
              key={index}
              topic={item.topic}
              description={item.description}
              courseCode={item.courseCode}
              year={item.year}
            />
          )):<NotFound />}
        </View>
      </ScrollView>
    </View>
  </View>
);

};

export default index;

const styles = StyleSheet.create({});
