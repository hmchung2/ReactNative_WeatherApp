import { StyleSheet, Text, View } from "react-native";

export default function LayoutEx() {
  return (
    // // <View style={ { flexDirection: "column" }  } >
    // <View>
    //   <View
    //     style={{ width: 200, height: 200, backgroundColor: "tomato" }}
    //   ></View>
    //   <View style={{ width: 200, height: 200, backgroundColor: "teal" }}></View>
    //   <View
    //     style={{ width: 200, height: 200, backgroundColor: "orange" }}
    //   ></View>
    // </View>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 2, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}
