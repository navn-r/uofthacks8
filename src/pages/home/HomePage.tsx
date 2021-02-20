import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useData } from "../../components/Data/DataContext";
import { getAllRecipes, getFollowed, getRecipes } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./HomePage.css";
import RecipeCard from "../../components/recipe/RecipeCard";

const HomePage: React.FC = () => {
  const { user, loading } = useData();
  const [followers, setFollowers] = useState([] as any[]);
  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    if (loading) return;
    const unsubscribe = async () => {
      const followers = await getFollowed(user.followingIds);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <h4 className="home-page-followers-title">Followers:</h4>
        <div className="followers-icon-container">
          {followers.map((f, i) => (
            <IonAvatar key={i}>
              <img src={f.photoURL ?? f} />
            </IonAvatar>
          ))}
        </div>
        {loading ? (<IonSpinner></IonSpinner>) : recipes.map((r, i) => <RecipeCard key={i} recipe={r}></RecipeCard>)}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
