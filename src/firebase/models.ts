export interface User {
  id: string;
  followerIds: string[];
  followingIds: string[];
  recipeIds: string[];
  photoURL: string;
  displayName: string;
}

export interface FoodItem {
  name: string;
  amount: number | string;
  unit: string;
}

export type Cost = "cheap" | "normal" | "expensive" | "high end";

export interface Recipe {
  title: string;
  foodItems: FoodItem[];
  cost: Cost;
  desc: string;
  instructions: string[];
  tags: string[];
  url: string;
  userId : string;
}
