import firebase from "firebase/app";
import { db, auth } from "./config";
import { Cost, Recipe, User } from "./models";
import { tags as TAGS } from "./constants";
const userCollection = "users";
const recipeCollection = "recipes";

const INITIAL_USER: User = {
  id: "",
  photoURL: "",
  displayName: "ur mom",
  followerIds: [],
  followingIds: [],
  recipeIds: [],
};

export const getId = () => (auth.currentUser as firebase.User).uid;
const generateId = () =>
  (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const getUserDoc = (id: string) => db.collection(userCollection).doc(id);
const getRecipeDoc = (id: string) => db.collection(recipeCollection).doc(id);

const getCurrentUserDoc = () => getUserDoc(getId());

export const initNewUser = (user: firebase.User): Promise<void> => {
  return getCurrentUserDoc().set(
    {
      ...INITIAL_USER,
      id: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    },
    { merge: true }
  );
};

export const addFollower = (followerId: string): Promise<any> => {
  return Promise.all([
    getCurrentUserDoc().update({
      followingIds: firebase.firestore.FieldValue.arrayUnion(followerId),
    }),
    getUserDoc(followerId).update({
      followerIds: firebase.firestore.FieldValue.arrayUnion(getId()),
    }),
  ]);
};

export const addRecipe = (recipe: Recipe): Promise<any> => {
  const newId = generateId();
  return Promise.all([
    getRecipeDoc(newId).set(recipe),
    getCurrentUserDoc().update({
      recipeIds: firebase.firestore.FieldValue.arrayUnion(newId),
    }),
  ]);
};

export const getUser = async (uid: string): Promise<any> => {
  return getUserDoc(uid)
    .get()
    .then((doc) => Promise.resolve(doc.exists ? doc.data() : null));
};

export const getFollowers = async (
  followerIds: Array<string>
): Promise<any> => {
  return Promise.all(followerIds.map((id) => getUser(id)));
};

export const getFollowed = async (followedId: Array<string>): Promise<any> => {
  return getFollowers(followedId);
};

export const getRecipe = async (uid: string): Promise<any> => {
  return getRecipeDoc(uid)
    .get()
    .then((doc) => Promise.resolve(doc.exists ? doc.data() : null));
};

export const getRecipes = async (recipes: string[]): Promise<any> => {
  return Promise.all(recipes.map((id) => getRecipe(id)));
};

interface RecipeTemp {
  foodItems: string[];
  cost: string;
  desc: string;
  instructions: string[];
  tags: string[]; // index of which tags are used,
  measures: string[];
  amounts: string[];
  url: string;
  title: string;
  userId: string;
}

export const makeRecipe = async (recipe: {
  foodItems: string[];
  cost: number;
  desc: string;
  instructions: string[];
  tags: boolean[]; // index of which tags are used,
  measures: string[];
  amounts: string[];
  url: string;
  title: string;
}): Promise<any> => {
  const cost = ["cheap", "normal", "expensive", "high end"][recipe.cost - 1];

  var reader = new FileReader();
  reader.readAsDataURL(await fetch(recipe.url).then((r) => r.blob()));
  return (reader.onloadend = function () {
    const newRecipe: Recipe = {
      title: recipe.title,
      foodItems: recipe.foodItems.map((name, index) => {return {name, amount: recipe.amounts[index] ?? 0, unit: recipe.measures[index] ?? 'grams'}}),
      desc: recipe.desc,
      instructions: recipe.instructions,
      cost: (cost ?? "cheap") as Cost,
      tags: TAGS.filter((_, i) => !!recipe.tags[i]),
      url: reader.result as string,
      userId: getId(),
    }
    return addRecipe(newRecipe);
  });
};

export const getAllRecipes = async () => {
  return (await db.collection(recipeCollection).get()).docs.map(
    (doc) => doc.data() as Recipe
  );
};


export const getAllUsers = async () => {
  return (await db.collection(userCollection).get()).docs.map(
    (doc) => doc.data() as User
  )
};
