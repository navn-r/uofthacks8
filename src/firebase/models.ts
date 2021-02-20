export interface User {
  id: string;
  followerIds: string[];
  followingIds: string[];
  recipeIds: string[];
  photoURL: string;
  displayName: string;
}
export interface Recipe {
  foodItems: string[];
  cost: "cheap" | "normal" | "expensive" | "high end";
  desc: string;
  instructions: string[];
  tags: string[];
  url: string;
}
