import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useData } from "../../components/Data/DataContext";
import RecipeCard from "../../components/recipe/RecipeCard";
import { getAllRecipes, getFollowers } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import ProfileVisitor from "../profile_visitor/ProfileVisitor";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const { user, loading } = useData();
  const [visitorId, setVisitorId] = useState("");
  const [followers, setFollowers] = useState([] as any[]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    if (loading) return;
    const unsubscribe = async () => {
      const followers = await getFollowers(user.followingIds);
      const recipes = await getAllRecipes();
      setRecipes(recipes);
      setFollowers(
        followers.map((f: User) => {
          return {
            id: f.id,
            photoURL: f.photoURL,
          };
        })
      );
    };
    unsubscribe();
  }, [user, loading]);

  const goToProfile = (f: { id: string; photoURL: string }) => {
    setVisitorId(f.id);
    setShowProfileModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west">
            Munchify
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <ProfileVisitor
          userId={visitorId}
          showModal={showProfileModal}
          onSuccess={() => setShowProfileModal(false)}
        />
        <h4 className="home-page-followers-title">Followers:</h4>
        <div className="followers-icon-container">
          {followers.map((f, i) => (
            <IonAvatar key={i} onClick={goToProfile.bind(null, f)}>
              <img src={f.photoURL} />
            </IonAvatar>
          ))}
        </div>
        {loading ? (
          <IonSpinner></IonSpinner>
        ) : (
          recipes.map((r, i) => <RecipeCard key={i} recipe={r}></RecipeCard>)
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
