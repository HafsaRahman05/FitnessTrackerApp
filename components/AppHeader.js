import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AppHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#F3F4F6"
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827"
  }
});