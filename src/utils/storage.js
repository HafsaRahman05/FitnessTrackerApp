import AsyncStorage from "@react-native-async-storage/async-storage";

const WORKOUT_KEY = "WORKOUT_STATS";

// SAVE WORKOUT
export const saveWorkout = async (calories) => {
  const data = await AsyncStorage.getItem(WORKOUT_KEY);
  let list = data ? JSON.parse(data) : [];

  const newEntry = {
    id: Date.now(),
    calories,
    date: new Date().toISOString()
  };

  list.push(newEntry);

  await AsyncStorage.setItem(WORKOUT_KEY, JSON.stringify(list));
};

// GET TOTAL STATS
export const getWorkoutStats = async () => {
  const data = await AsyncStorage.getItem(WORKOUT_KEY);
  return data ? JSON.parse(data) : [];
};

const KEY = "SELECTED_EXERCISES";

// ADD
export const addExercise = async (exercise) => {
  const data = await AsyncStorage.getItem(KEY);
  let list = data ? JSON.parse(data) : [];

  const exists = list.find((x) => x.id === exercise.id);
  if (!exists) {
    list.push(exercise);
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(list));
};

// GET
export const getSelectedExercises = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

// REMOVE
export const removeExercise = async (id) => {
  const data = await AsyncStorage.getItem(KEY);
  let list = data ? JSON.parse(data) : [];

  list = list.filter((item) => item.id !== id);

  await AsyncStorage.setItem(KEY, JSON.stringify(list));
};

