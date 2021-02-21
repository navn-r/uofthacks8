import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  IonText,
  IonItem,
  IonLabel,
  IonCheckbox,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useState } from "react";
import { Recipe, User } from "../../firebase/models";
import "./RecipePage.css";
import ProfileVisitor from "../profile_visitor/ProfileVisitor";
import { getId } from "../../firebase/api";
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
  const [showNextModal, setShowNextModal] = useState(false);
  const carbs = Math.floor(Math.random() * 20) + 20;
  const fat = Math.floor(Math.random() * 20) + 20;
  const protein = Math.floor(Math.random() * 20) + 10;
  const onClickModal = (e: any) => {
    if (user.id !== getId()) {
      setShowNextModal(true);
    }
  };

  return (
    <IonModal isOpen={showModal} backdropDismiss={false}>
      <ProfileVisitor
        userId={user.id}
        showModal={showNextModal}
        onSuccess={() => setShowNextModal(false)}
      />
      <IonHeader>
        <IonToolbar>
          <div className="title">
            <IonTitle
              color="primary"
              class="ion-text-west"
              style={{
                fontFamily: "Covered By Your Grace",
                fontSize: "1.75rem",
              }}
            >
              Munchify
            </IonTitle>
          </div>
          <div className="exit">
            <IonButton
              fill="clear"
              color="danger"
              onClick={onSuccess}
              size="small"
            >
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-info recipe-page-user-info">
          <IonAvatar>
            <img src={user.photoURL} onClick={onClickModal} />
          </IonAvatar>
          <div className="info-title">
            <h1>{recipe.title}</h1>
            <p>{user.displayName}</p>
          </div>
        </div>
        <div className="image">
          <img src={recipe.url}></img>
        </div>
        <div className="property">
          <IonText color="primary">Description</IonText>
          <p>{recipe.desc}</p>
        </div>

        <div className="property">
          <IonText color="primary">Ingredients</IonText>
          <div className="ingredients">
            {recipe.foodItems.map((r, i) => (
              <IonItem key={i}>
                <IonCheckbox />
                <div className="ingredients-tag-1">
                  {r.amount} {r.unit} of {r.name}
                </div>
              </IonItem>
            ))}
          </div>
        </div>

        <div className="property">
          <IonText color="primary">Steps</IonText>
          <div className="ingredients">
            <ol>
              {recipe.instructions.map((r, i) => (
                <li key={i} className="steps">
                  <div className="steps-tag">{r}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="property">
          <IonText color="primary">Cost</IonText>
          <div className="recipe-tag success-tag" style={{width: 'max-content'}}>
            {recipe.cost.toUpperCase()}
          </div>
        </div>
        <div className="property">
          <IonText color="primary">Tags</IonText>
          <div className="inner">
            {recipe.tags.map((r, i) => (
              <div key={i} className="recipe-tag">
                {r}
              </div>
            ))}
          </div>
        </div>
        <div className="nutrition">
          <IonText color="primary">Nutritional Facts</IonText>
          <p>Protein: {protein} grams</p>
          <p>Fat: {fat} grams</p>
          <p>Carbohydrates: {carbs} grams</p>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default RecipePage;
