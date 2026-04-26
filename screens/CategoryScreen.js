import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { exercises } from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;

  const [search, setSearch] = useState("");

  const data =
    category === "All"
      ? exercises
      : exercises.filter((item) => item.category === category);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>{category} Workouts</Text>

        <View style={{ width: 24 }} />
      </View> */}

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search workouts..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ExerciseCard
            item={item}
            onPress={() =>
              navigation.navigate("Detail", { item })
            }
          />
        )}
      />

    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827"
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 12,
    elevation: 2
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#111827"
  }
});