import firebase from "firebase/app";
import { db, auth } from "./config";

const userRef = db
  .collection("users")
  .doc((auth.currentUser as firebase.User).uid);

const addFollower = (followerId: string) => {
  userRef.update({
    regions: firebase.firestore.FieldValue.arrayUnion(followerId),
  });
};
