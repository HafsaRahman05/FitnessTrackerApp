import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ExerciseCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      {/* BACKGROUND IMAGE */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* DARK OVERLAY */}
      <View style={styles.overlay}>
        
        {/* CATEGORY */}
        <Text style={styles.category}>{item.category}</Text>

        {/* NAME */}
        <Text style={styles.name}>{item.name}</Text>

        {/* DESCRIPTION */}
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 170,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 5
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.45)"
  },

  category: {
    color: "#D1D5DB",
    fontSize: 12,
    marginBottom: 2
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  desc: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 4
  }
});