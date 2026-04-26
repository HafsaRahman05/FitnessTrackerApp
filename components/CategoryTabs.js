// import React from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { StyleSheet } from "react-native";

// export default function CategoryTabs({ categories, selected, setSelected }) {
//   return (
//     <View style={{ flexDirection: "row", marginBottom: 10 }}>
//       {categories.map((cat) => (
//         <TouchableOpacity
//           key={cat}
//           onPress={() => setSelected(cat)}
//           style={{
//             backgroundColor: selected === cat ? "black" : "lightgray",
//             padding: 8,
//             marginRight: 5,
//             borderRadius: 8
//           }}
//         >
//           <Text style={{ color: selected === cat ? "white" : "gray" }}>{cat}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   tab: {
//     backgroundColor: "#E5E7EB",   // light gray
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     marginRight: 8
//   },

//   activeTab: {
//     backgroundColor: "#000000"   // BLACK THEME (same as app buttons)
//   },

//   text: {
//     color: "#333",
//     fontWeight: "500"
//   }
// });