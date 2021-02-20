export interface User {
  followerIds: string[];
  followingIds: string[];
  recipeIds: string[];
}
export interface Food {
  name: string;
}
export interface FoodItem {
  foodId: string;
  amount: number;
  measureType: string;
}
export interface Recipe {
  foodIds: FoodItem[];
  cost: "cheap" | "normal" | "expensive" | "high end";
  desc: string;
  instructions: string[];
  tags: string[];
  url: string;
}

export interface FoodNutrient {
  foodId: string;
  nutrientId: string;
  amount: number;
}
export interface Nutrient {
  name: string;
  unitName: string;
}