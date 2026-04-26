import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar
} from "react-native";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getSelectedExercises } from "../src/utils/storage";
import { getWorkoutStats } from "../src/utils/storage";
import { removeExercise } from "../src/utils/storage";
export default function HomeScreen({ navigation }) {

  const [workouts, setWorkouts] = useState([]);
  const loadStats = async () => {
  const data = await getWorkoutStats();
  setWorkouts(data || []);
};
  const [selectedExercises, setSelectedExercises] = useState([]);
  const bounce = useRef(new Animated.Value(0)).current;

  /* LOAD DATA */
  const loadExercises = async () => {
    const data = await getSelectedExercises();
    setSelectedExercises(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadExercises();
      loadStats();
    }, [])
  );

  /* ANIMATION */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -6,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const [quotes, setQuotes] = useState([]);
const [quote, setQuote] = useState(null);
const fetchQuotes = async () => {
  try {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();

    setQuotes(data);

    // first random quote
    const random = data[Math.floor(Math.random() * data.length)];
    setQuote(random);

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchQuotes();
}, []);

const changeQuote = () => {
  if (quotes.length === 0) return;

  const random = quotes[Math.floor(Math.random() * quotes.length)];
  setQuote(random);
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FB" }}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        {/* <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Ready to train?</Text>
        </View> */}

        {/* HERO */}
        <ImageBackground
          source={{
            uri: "https://media.istockphoto.com/id/1132337178/photo/muscular-caucasian-powerful-boxer-in-sportswear-and-bandage-on-feet-lifting-dumbbells-in-gym.jpg"
          }}
          style={styles.hero}
          imageStyle={{ borderRadius: 0 }}
        >
          <View style={styles.overlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Daily Workout</Text>
            <Text style={styles.heroSub}>
              Stay consistent. Build strength.
            </Text>

            <TouchableOpacity
              style={styles.heroButton}
              onPress={() =>
                navigation.navigate("Exercises", {
                  screen: "ExercisesMain"
                })
              }
            >
              <Text style={styles.heroButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

<TouchableOpacity onPress={changeQuote} activeOpacity={0.8}>
  <View style={styles.quoteCard}>

    <Text style={styles.quoteIcon}>💡 Motivation</Text>

    <Text style={styles.quoteText}>
      "{quote?.text}"
    </Text>

    <Text style={styles.quoteAuthor}>
      - {quote?.author || "Unknown"}
    </Text>

    <Text style={styles.tapHint}>
      Tap to change
    </Text>

  </View>
</TouchableOpacity>

        {/* STATS */}
        <Text style={styles.sectionTitle}>Today</Text>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {workouts.length}
            </Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {workouts.reduce((sum, w) => sum + (w.calories || 0), 0)}
            </Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {workouts.length * 5}m
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        {/* MY WORKOUTS */}
        <Text style={styles.sectionTitle}>My Workouts 💪</Text>

        {selectedExercises.length === 0 ? (
          <Text style={{ color: "#6B7280", marginBottom: 20 }}>
            No exercises added yet
          </Text>
        ) : (
          selectedExercises.map((item) => (
  <TouchableOpacity
    key={item.id}
    style={styles.card}
    onPress={() =>
      navigation.navigate("Exercises", {
        screen: "Detail",
        params: { item, from: "home" }
      })
    }
  >

    <Image source={{ uri: item.image }} style={styles.img} />

    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.category}</Text>
    </View>

    {/* ✅ DELETE BUTTON HERE */}
    <TouchableOpacity
      onPress={async () => {
        await removeExercise(item.id);
        loadExercises(); // refresh list
      }}
      style={styles.deleteBtn}
    >
      <Text style={styles.deleteText}>✕</Text>
    </TouchableOpacity>

  </TouchableOpacity>
))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 16
  },

  header: {
    marginTop: 10,
    marginBottom: 20
  },

  greeting: {
    fontSize: 14,
    color: "#6B7280"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827"
  },
hero: {
  height: 260,
  width: "100%",
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
  overflow: "hidden"
},

overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.45)"
},

 heroContent: {
  flex: 1,
  justifyContent: "flex-end",
  padding: 22
},

heroTitle: {
  color: "white",
  fontSize: 28,
  fontWeight: "900",
  letterSpacing: 1
},

heroSub: {
  color: "#E5E7EB",
  fontSize: 13,
  marginTop: 6,
  marginBottom: 14
},

heroButton: {
  backgroundColor: "#22C55E",
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 14,
  alignSelf: "flex-start"
},
  heroButtonText: {
    color: "white",
    fontWeight: "600"
  },

sectionTitle: {
  fontSize: 18,
  fontWeight: "800",
  marginTop: 10,
  marginBottom: 12,
  color: "#111827"
},

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

 statBox: {
  backgroundColor: "white",
  padding: 16,
  borderRadius: 18,
  width: "31%",
  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3
},

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827"
  },

  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3
  },

 card: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  padding: 14,
  borderRadius: 16,
  marginBottom: 12,

  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 3
},

img: {
  width: 65,
  height: 65,
  borderRadius: 12
},
  cardTitle: {
    fontWeight: "700",
    color: "#111827"
  },

  cardSub: {
    fontSize: 12,
    color: "#6B7280"
  },

  removeBtn: {
    backgroundColor: "#EF4444",
    padding: 8,
    borderRadius: 8
  },
quoteCard: {
  backgroundColor: "#42aa5c",
  padding: 18,
  borderRadius: 20,
  marginVertical: 15,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 5
},

quoteIcon: {
  fontSize: 22,
  color: "white",
  fontWeight: "700",
  marginBottom: 10
},

quoteText: {
  color: "white",
  fontSize: 15,
  fontStyle: "italic",
  lineHeight: 22
},

quoteAuthor: {
  color: "#232324",
  marginTop: 10,
  fontSize: 12,
  textAlign: "right"
},

tapHint: {
  color: "#edf5f0",
  fontSize: 11,
  marginTop: 8,
  textAlign: "center"
}
});