import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Auth/AuthProvider";
import { Recipe, User } from "../../firebase/models";
import "./RecipePage.css";

interface RecipeCardProps {
  user: User;
  recipe: Recipe;
}


const RecipePage: React.FC<RecipeCardProps> = ({ user, recipe }) => {
  const history = useHistory();
  const { logout, user: authUser } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle color="primary" class="ion-text-west">Munchify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="user-info">
          <IonAvatar>
            <img src={authUser.photoURL} />
          </IonAvatar>
          <div className="info-title">
            <h3>{"RECIPE NAME"}</h3>
            <p>{authUser.displayName}</p>
          </div>
        </div>
        <img src={recipe.url}></img>
      </IonContent>
    </IonPage>
  );
};

export default RecipePage;
