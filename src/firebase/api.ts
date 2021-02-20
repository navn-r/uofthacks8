import firebase from "firebase/app";
import { db, auth } from "./config";
import { Recipe, User } from "./models";

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

const getId = () => (auth.currentUser as firebase.User).uid;
const generateId = () =>
  (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const getUserDoc = (id: string) => db.collection(userCollection).doc(id);
const getRecipeDoc = (id: string) => db.collection(recipeCollection).doc(id);

const getCurrentUserDoc = () => getUserDoc(getId());

export const initNewUser = (user: firebase.User): Promise<void> => {
  return getCurrentUserDoc().set({
    ...INITIAL_USER,
    photoURL: user.photoURL,
    displayName: user.displayName
  }, { merge: true });
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
