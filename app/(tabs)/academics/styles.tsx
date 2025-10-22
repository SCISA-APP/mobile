import { Colors } from "@/constants/theme"
import { StyleSheet } from "react-native"



export const academicsStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginTop: 12,
      },
      mainBody:{
        padding:12,
      },
      categories:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:4,
        gap:8,
      },
      marginSmall:{
        margin:8,
      }
      
})
