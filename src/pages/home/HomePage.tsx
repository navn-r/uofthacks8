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
import { getFollowers, getRecipes } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./HomePage.css";
import RecipeCard from "../../components/recipe/RecipeCard";


const MockFollowers = [
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7742?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7743?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7744?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7745?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7746?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7747?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7748?d=identicon&f=y",
  "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7749?d=identicon&f=y",
];

const HomePage: React.FC = () => {
  const { user, loading } = useData();
  const [followers, setFollowers] = useState([] as any[]);
  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    if(loading) return;
    const unsubscribe = async () => {
      const followers = await getFollowers(user.followerIds);
      const recipes = await getRecipes(user.recipeIds);
      setRecipes(recipes);
      setFollowers(followers.map((f: User) => {
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
          <IonTitle class="ion-text-center">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
        <h4 className="home-page-followers-title">Followers:</h4>
        <div className="followers-icon-container">
          {followers.map((f: any) => (
            <IonAvatar key={f.id}>
              <img src={f.photoURL} />
            </IonAvatar>
          ))}
        </div>
        {loading ? (<IonSpinner></IonSpinner>) : recipes.map((r, i) => <RecipeCard key={i} user={user} recipe={r}></RecipeCard>)}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
