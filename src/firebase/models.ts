export interface User {
  followerIds: string[];
  followingIds: string[];
  recipeIds: string[];
  pfpUrl: string;
  name: string;
}
export interface Recipe {
  foodItems: string[];
  cost: "cheap" | "normal" | "expensive" | "high end";
  desc: string;
  instructions: string[];
  tags: string[];
  url: string;
}
