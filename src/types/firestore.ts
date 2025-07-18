// src/types/firestore.ts

import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

// --- Your Data Interfaces ---

export interface WeightEntry {
  value: number;
  timestamp: string;
}

export interface Macros {
  carbs: number;
  protein: number;
  fat: number;
}

export interface MealItem {
  name: string;
  calories: number;
  macros: Macros;
}

export interface MealEntry {
  items: MealItem[];
  totalCalories: number;
  loggedAt: string;
}

export interface ExerciseEntry {
  type: string;
  duration: number;
  distance?: number;
  caloriesBurned: number;
  timestamp: string;
}

// --- Firestore Converters ---

export const weightConverter: FirestoreDataConverter<WeightEntry> = {
  toFirestore: entry => ({ ...entry }),
  fromFirestore: (snap: QueryDocumentSnapshot, _opts: SnapshotOptions) =>
    snap.data() as WeightEntry,
};

export const mealConverter: FirestoreDataConverter<MealEntry> = {
  toFirestore: entry => ({ ...entry }),
  fromFirestore: (snap: QueryDocumentSnapshot, _opts: SnapshotOptions) =>
    snap.data() as MealEntry,
};

export const exerciseConverter: FirestoreDataConverter<ExerciseEntry> = {
  toFirestore: entry => ({ ...entry }),
  fromFirestore: (snap: QueryDocumentSnapshot, _opts: SnapshotOptions) =>
    snap.data() as ExerciseEntry,
};
