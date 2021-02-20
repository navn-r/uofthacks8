import firebase from "firebase/app";
import { db, auth } from "./config";
import { Recipe, User } from "./models";

const uId = (auth.currentUser as firebase.User).uid;
const userCollection = "users";
const recipeCollection = "recipes";
export const addFollower = (followerId: string) => {
  db.collection(userCollection)
    .doc(uId)
    .update({
      followingIds: firebase.firestore.FieldValue.arrayUnion(followerId),
    });
  db.collection(userCollection)
    .doc(followerId)
    .update({
      followerIds: firebase.firestore.FieldValue.arrayUnion(
        (auth.currentUser as firebase.User).uid
      ),
    });
};
export const addRecipe = (recipe: Recipe) => {
  const rId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  db.collection(recipeCollection).doc(rId).set(recipe);
  db.collection(userCollection)
    .doc(uId)
    .update({
      recipeIds: firebase.firestore.FieldValue.arrayUnion(rId),
    });
};
export const getUser = async () => {
  const doc = await db.collection(userCollection).doc(uId).get();
  if (!doc.exists) console.log("getUser doesnt exist");
  else return doc.data() as User;
};
