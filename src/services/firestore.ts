// src/services/firestore.ts

import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { auth, db } from "./firebase"; // your firebase init file
import {
  WeightEntry,
  MealEntry,
  ExerciseEntry,
  weightConverter,
  mealConverter,
  exerciseConverter,
} from "../types/firestore";

// Helpers to get typed collection refs
function weightsRef(uid: string): CollectionReference<WeightEntry> {
  return collection(db, "users", uid, "weights")
    .withConverter(weightConverter);
}

function mealsRef(uid: string): CollectionReference<MealEntry> {
  return collection(db, "users", uid, "meals")
    .withConverter(mealConverter);
}

function exercisesRef(uid: string): CollectionReference<ExerciseEntry> {
  return collection(db, "users", uid, "exercises")
    .withConverter(exerciseConverter);
}

// --- Weight Functions ---
export async function logWeight(value: number) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await addDoc(weightsRef(uid), {
    value,
    timestamp: new Date().toISOString(),
  });
}

export async function fetchWeights() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  const q = query(weightsRef(uid), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

// --- Meal Functions ---
export async function logMeal(entry: MealEntry) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await addDoc(mealsRef(uid), entry);
}

export async function fetchMeals() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  const q = query(mealsRef(uid), orderBy("loggedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

// --- Exercise Functions ---
export async function logExercise(entry: ExerciseEntry) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await addDoc(exercisesRef(uid), entry);
}

export async function fetchExercises() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  const q = query(exercisesRef(uid), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}
