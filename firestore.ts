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
