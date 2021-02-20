import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomePage.css";
import RecipeCard from "../../components/recipe/RecipeCard";
import { useData } from "../../components/Data/DataContext";
import {getRecipe} from "../../firebase/api";
import { useEffect } from "react";

const MockFollowers = [
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7742?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7743?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7744?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7745?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7746?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7747?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7748?d=identicon&f=y',
  'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7749?d=identicon&f=y',
];

const HomePage: React.FC = () => {
  const { user: dataUser, loading: dataLoading } = useData();
  var recipe = await getRecipe(dataUser.recipeIds[0])
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
          {MockFollowers.map((f, i) => (
            <IonAvatar key={i}>
              <img src={f} />
            </IonAvatar>
          ))}
        </div>
        {dataLoading ? (<IonSpinner></IonSpinner>) : (<RecipeCard user={dataUser} recipe={recipe}></RecipeCard>)}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
