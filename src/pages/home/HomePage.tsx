import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
<<<<<<< HEAD
import "./HomePage.css";
import RecipeCard from "../../components/recipe/RecipeCard";
import { useData } from "../../components/Data/DataContext";
import {getRecipe} from "../../firebase/api";
import { useEffect } from "react";
=======
import { useEffect, useState } from "react";
import { useData } from "../../components/Data/DataContext";
import { getFollowers } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./HomePage.css";
import RecipeCard from "../../components/recipe/RecipeCard";

>>>>>>> f17496512f0c832e09a563cf953b45fa1afa5732

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
<<<<<<< HEAD
  const { user: dataUser, loading: dataLoading } = useData();
  var recipe = await getRecipe(dataUser.recipeIds[0])
=======
  const { user, loading } = useData();
  const [followers, setFollowers] = useState([] as any[]);
  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    if(loading) return;
    const unsubscribe = async () => {
      const followers = await getFollowers(user.followerIds);
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

>>>>>>> f17496512f0c832e09a563cf953b45fa1afa5732
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
<<<<<<< HEAD
      
=======
>>>>>>> f17496512f0c832e09a563cf953b45fa1afa5732
      <IonContent fullscreen>
      
        <h4 className="home-page-followers-title">Followers:</h4>
        <div className="followers-icon-container">
          {followers.map((f: any) => (
            <IonAvatar key={f.id}>
              <img src={f.photoURL} />
            </IonAvatar>
          ))}
        </div>
<<<<<<< HEAD
        {dataLoading ? (<IonSpinner></IonSpinner>) : (<RecipeCard user={dataUser} recipe={recipe}></RecipeCard>)}
=======
        {/* {loading ? (<IonSpinner></IonSpinner>) : (<RecipeCard user={user}></RecipeCard>)} */}
>>>>>>> f17496512f0c832e09a563cf953b45fa1afa5732
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
