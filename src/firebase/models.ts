export interface User {
  followerIds: string[];
  followingIds: string[];
  recipeIds: string[];
}
export interface Food {
  name: string;
  desc: string;
}
export interface FoodItem{
  foodId: string;
  amount: number;
  measureId: string;
}
export interface Recipe {
  foodIds: FoodItem[];
  cost: "cheap" | "normal" | "expensive" | "high end";
  desc: string;
  instructions: string[];
  tags: string[];
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