import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import { Recipe, User } from "../../firebase/models";
import "./RecipePage.css";

interface RecipePageProps {
  user: User;
  recipe: Recipe;
  showModal: boolean;
  onSuccess: () => void;
}

const RecipePage: React.FC<RecipePageProps> = ({
  user,
  recipe,
  showModal,
  onSuccess,
}) => {
  return (
    <IonModal isOpen={showModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west">
            Munchify
          </IonTitle>
          <IonButton
            fill="clear"
            color="danger"
            onClick={onSuccess}
            size="small"
          >
            <IonIcon slot="icon-only" icon={close}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-info">
          <IonAvatar>
            <img src={user.photoURL} />
          </IonAvatar>
          <div className="info-title">
            <h3>{"RECIPE NAME"}</h3>
            <p>{user.displayName}</p>
          </div>
        </div>
        <img src={recipe.url}></img>
      </IonContent>
    </IonModal>
  );
};

export default RecipePage;
