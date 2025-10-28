import colors from "@/constants/colors";
import { ClipboardList } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

interface NotesCardProps {
  topic?: string;
  description?: string;
  courseCode?: string;
  year?: number;
}
const NotesCard: React.FC<NotesCardProps> = ({
  topic,
  description,
  courseCode,
  year,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>{topic}</Text>
        <View >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{"Lecture Notes"}</Text>
        </View>
        </View>
      </View>
      <View style={styles.top}>
        <ClipboardList  color={colors.text.secondary} size={18} />
        
        <Text style={styles.text} numberOfLines={3}>
         {description}
        </Text>
      </View>
      <View style={styles.bottom}>
       <Text style={{fontWeight:"bold"}}>{courseCode}</Text>
       <Text style={styles.text}>{`Year ${year}`}</Text>
      </View>
      <View>
        <CustomButton label="View details" onPress={()=>{console.log("view details")}} />
        </View>
    </View>
  );
};

export default NotesCard;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray[500],
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.surface,
    padding: 8,
    marginVertical: 8,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
    marginTop: 8,

  },
  badge: {
    backgroundColor: colors.secondaryDark,
    padding: 6,
    borderRadius: 5,
  },
  heading: {
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  text:{
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",  
    color: colors.text.secondary,
  },
  main: {},
  badgeText: {
    fontSize: 8,
    color: colors.text.inverse,
    fontWeight: "bold",
    alignSelf: "flex-end",

  },
  bottom:{
    margin: 8,
    gap: 2,
  }
});
