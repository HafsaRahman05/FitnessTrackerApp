import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { addExercise, saveWorkout } from "../src/utils/storage";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen({ route }) {
const { item } = route.params;
 const from = route?.params?.from || "exercise";

  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    try {
      await addExercise(item);
      setAdded(true);

      Alert.alert("Added 💪", "Exercise added to Home screen");
    } catch (error) {
      Alert.alert("Error", "Could not add exercise");
    }
  };
  

  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const markComplete = async () => {
    try {
      setLoading(true);

      await saveWorkout(item.calories || 50);

      setCompleted(true);

      Alert.alert(
        "🔥 Workout Completed",
        `Great job! You burned ${item.calories} calories 💪`
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HERO IMAGE */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subText}>{item.category}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.duration} min</Text>
        </View>
      </View>

      {/* INFO CARDS */}
      <View style={styles.row}>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Calories</Text>
          <Text style={styles.infoValue}>{item.calories}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Reps</Text>
          <Text style={styles.infoValue}>{item.reps}</Text>
        </View>

      </View>
      

      {/* DESCRIPTION */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Exercise</Text>
        <Text style={styles.desc}>{item.description}</Text>

        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.desc}>{item.benefits}</Text>
      </View>

      {/* STEPS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Steps</Text>

        {item.steps?.map((step, index) => (
          <View key={index} style={styles.stepBox}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
      {/* ADD TO HOME BUTTON */}
      {from !== "home" && (
      <TouchableOpacity
  style={styles.addBtn}
  onPress={async () => {
    await addExercise(item);

    Alert.alert("Added 💪", "Added to Home");

   
  }}
>
  <Ionicons name="add" size={22} color="white" />
  <Text style={styles.addText}>
    Add to Home
  </Text>
</TouchableOpacity>
      )}

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          completed && { backgroundColor: "#16A34A" }
        ]}
        onPress={markComplete}
        disabled={completed || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {completed ? "Completed ✔" : "Workout Completed"}
          </Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6"
  },

  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  header: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827"
  },

  subText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3
  },

  badge: {
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15
  },

  infoCard: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
    alignItems: "center"
  },

  infoTitle: {
    fontSize: 12,
    color: "#6B7280"
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4
  },

  card: {
    backgroundColor: "white",
    margin: 15,
    padding: 18,
    borderRadius: 16,
    elevation: 3
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111827",
    marginTop: 10
  },

  desc: {
    color: "#4B5563",
    lineHeight: 20,
    fontSize: 13
  },

  stepBox: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },

  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#111827",
    color: "white",
    textAlign: "center",
    lineHeight: 24,
    fontSize: 12,
    marginRight: 10
  },

  stepText: {
    flex: 1,
    color: "#374151",
    fontSize: 13
  },

  button: {
    backgroundColor: "#111827",
    margin: 15,
    padding: 16,
    borderRadius: 14,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15
  },
addBtn: {
    flexDirection: "row",
    backgroundColor: "#22C55E",
    margin: 16,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },

  addText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600"
  }
});