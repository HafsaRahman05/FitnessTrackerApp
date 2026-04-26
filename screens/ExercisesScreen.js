import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ExercisesScreen({ navigation }) {

  const [selected, setSelected] = useState("All");

  const categories = [
    "All",
    "Gym",
    "Yoga",
    "Strength",
    "Cardio",
    "Home",
    "Face Yoga",
    "Pilates",
    "Abs",
    "Stretching"
  ];

  const images = {
    All: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    Gym: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
    Yoga: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
    Strength: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    Cardio: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    Home: "https://tse2.mm.bing.net/th/id/OIP.8Q_of1yUEm1KmWPndA-NjAHaE8",
    "Face Yoga": "https://tse1.explicit.bing.net/th/id/OIP.EjiIyZccfrMjrnLP6JYz5wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    Pilates: "https://tse1.explicit.bing.net/th/id/OIP.iG8qZ3h52jAFOa6t3bRHAwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    Abs: "https://tse4.mm.bing.net/th/id/OIP.meWVjpfDZ9s2jwKEAD3nngHaE8",
    Stretching: "https://tse4.mm.bing.net/th/id/OIP.GMitErXOz9U8nacpsNtJXAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  };

  return (
    <ScrollView style={styles.container}>

      <StatusBar barStyle="light-content" />

      {/* HEADER WITH BACK */}
      {/* <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
              </TouchableOpacity>

        <Text style={styles.headerTitle}>Exercises</Text>

        <View style={{ width: 24 }} />
      </View> */}

      {/* HERO */}
      <ImageBackground
        source={{ uri: "https://tse3.mm.bing.net/th/id/OIP.WGfPdCgSE1vKD0r3HilPLAHaE7?w=1280&h=853&rs=1&pid=ImgDetMain&o=7&rm=3" }}
        style={styles.hero}
        imageStyle={{ borderRadius: 26 }}
      >
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Train Smarter 💪</Text>
          <Text style={styles.heroSub}>
            Choose your workout category
          </Text>
        </View>
      </ImageBackground>

      {/* GRID */}
      <View style={styles.gridContainer}>

        {categories.map((item) => {
          const isActive = selected === item;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setSelected(item);
                navigation.navigate("CategoryScreen", {
                  category: item
                });
              }}
              style={[
                styles.card,
                isActive && styles.activeCard
              ]}
            >
              <ImageBackground
                source={{ uri: images[item] }}
                style={styles.cardImg}
                imageStyle={{ borderRadius: 18 }}
              >
                <View style={styles.cardOverlay} />
                <Text style={styles.cardText}>{item}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}

      </View>

    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 16
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,

    justifyContent: "center",
    alignItems: "center",
    elevation: 3
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827"
  },

  /* HERO */
  hero: {
    height: 200,
    borderRadius: 26,
    overflow: "hidden"
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)"
  },

  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 18
  },

  heroTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "900"
  },

  heroSub: {
    color: "#E5E7EB",
    fontSize: 13,
    marginTop: 4
  },

  /* GRID */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18
  },

  card: {
    width: "48%",
    height: 115,
    borderRadius: 18,
    marginBottom: 12,
    overflow: "hidden"
  },

  activeCard: {
    transform: [{ scale: 1.05 }]
  },

  cardImg: {
    flex: 1,
    justifyContent: "flex-end"
  },

  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)"
  },

  cardText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    padding: 10
  }
});