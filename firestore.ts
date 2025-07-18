// src/types/firestore.ts

export interface WeightEntry {
  value: number;            // weight in kg or lbs
  timestamp: string;        // ISO string, e.g. new Date().toISOString()
}

export interface Macros {
  carbs: number;            // grams
  protein: number;          // grams
  fat: number;              // grams
}

export interface MealItem {
  name: string;             // e.g. "Oatmeal"
  calories: number;         // kcal
  macros: Macros;
}

export interface MealEntry {
  items: MealItem[];        // array of each food item
  totalCalories: number;    // sum of calories
  loggedAt: string;         // ISO string of when it was eaten
}

export interface ExerciseEntry {
  type: string;             // e.g. "running", "cycling"
  duration: number;         // minutes
  distance?: number;        // optional: km or miles
  caloriesBurned: number;   // kcal
  timestamp: string;        // ISO string of workout start
}

import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import {
  WeightEntry,
  MealEntry,
  ExerciseEntry
} from "./firestore";

export const weightConverter: FirestoreDataConverter<WeightEntry> = {
  toFirestore(entry) {
    return { ...entry };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, _options: SnapshotOptions) {
    return snapshot.data() as WeightEntry;
  }
};

export const mealConverter: FirestoreDataConverter<MealEntry> = {
  toFirestore(entry) {
    return { ...entry };
  },
  fromFirestore(snapshot, _options) {
    return snapshot.data() as MealEntry;
  }
};

export const exerciseConverter: FirestoreDataConverter<ExerciseEntry> = {
  toFirestore(entry) {
    return { ...entry };
  },
  fromFirestore(snapshot, _options) {
    return snapshot.data() as ExerciseEntry;
  }
};

import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { db, auth } from "./firebase";
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
  return collection(db, "users", uid, "weights").withConverter(weightConverter);
}
function mealsRef(uid: string): CollectionReference<MealEntry> {
  return collection(db, "users", uid, "meals").withConverter(mealConverter);
}
function exercisesRef(uid: string): CollectionReference<ExerciseEntry> {
  return collection(db, "users", uid, "exercises").withConverter(exerciseConverter);
}

// Example: log a weight
export async function logWeight(value: number) {
  const uid = auth.currentUser?.uid!;
  await addDoc(weightsRef(uid), {
    value,
    timestamp: new Date().toISOString(),
  });
}

// Example: fetch latest 10 weights
export async function fetchWeights() {
  const uid = auth.currentUser?.uid!;
  const q = query(weightsRef(uid), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

// Do the same for meals and exercises...
