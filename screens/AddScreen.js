import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";

export default function AddScreen() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  const [category, setCategory] = useState("Gym");
  const [calories, setCalories] = useState("");
  const [duration, setDuration] = useState("");
  const [reps, setReps] = useState("");

  const [stepInput, setStepInput] = useState("");
  const [steps, setSteps] = useState([]);

  const categories = ["Gym", "Yoga", "Strength", "Cardio", "Home"];

  const addStep = () => {
    if (!stepInput.trim()) return;
    setSteps([...steps, stepInput]);
    setStepInput("");
  };

  const removeStep = (index) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
  };

  const handleSave = () => {
    if (!name || !desc || !link || !calories || !duration) {
      Alert.alert("Error", "Fill all required fields");
      return;
    }

    Alert.alert("Saved", `${name} added successfully 💪`);

    // reset
    setName("");
    setDesc("");
    setLink("");
    setCalories("");
    setDuration("");
    setReps("");
    setSteps([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Add Exercise</Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* NAME */}
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        {/* DESC */}
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={desc} onChangeText={setDesc} />

        {/* IMAGE */}
        <Text style={styles.label}>Image URL</Text>
        <TextInput style={styles.input} value={link} onChangeText={setLink} />

        {/* CATEGORY DROPDOWN STYLE */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.rowWrap}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={[
                styles.chip,
                category === cat && styles.activeChip
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  category === cat && { color: "white" }
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CALORIES + DURATION + REPS */}
        <View style={styles.row}>
          <TextInput
            placeholder="Calories"
            keyboardType="numeric"
            style={styles.smallInput}
            value={calories}
            onChangeText={setCalories}
          />

          <TextInput
            placeholder="Duration (min)"
            keyboardType="numeric"
            style={styles.smallInput}
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        <TextInput
          placeholder="Reps (e.g. 3x12)"
          style={styles.input}
          value={reps}
          onChangeText={setReps}
        />

        {/* STEPS SECTION */}
        <Text style={styles.label}>Steps</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="Add step..."
            style={styles.stepInput}
            value={stepInput}
            onChangeText={setStepInput}
          />

          <TouchableOpacity style={styles.addBtn} onPress={addStep}>
            <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
          </TouchableOpacity>
        </View>

        {steps.map((s, i) => (
          <View key={i} style={styles.stepItem}>
            <Text style={{ flex: 1 }}>{i + 1}. {s}</Text>
            <TouchableOpacity onPress={() => removeStep(i)}>
              <Text style={{ color: "red" }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Exercise</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15
  },

 title: {
  fontSize: 24,
  fontWeight: "700",
  marginBottom: 15,
  color: "#111827",
  marginTop: 10   // 👈 THIS FIXES CUT ISSUE
},

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 16,
    elevation: 3
  },

  label: {
    marginTop: 10,
    fontSize: 13,
    color: "#6B7280"
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5
  },

  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 5
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#111827",
    margin: 4
  },

  activeChip: {
    backgroundColor: "#111827"
  },

  chipText: {
    fontSize: 12
  },

  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5
  },

  addBtn: {
    backgroundColor: "#111827",
    padding: 12,
    marginLeft: 5,
    borderRadius: 10
  },

  stepItem: {
    flexDirection: "row",
    marginTop: 8,
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 10
  },

  button: {
    backgroundColor: "#111827",
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "700"
  }
});