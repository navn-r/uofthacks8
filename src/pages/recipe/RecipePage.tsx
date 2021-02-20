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
  const [checked, setChecked] = useState(false);
  return (
    <IonModal isOpen={showModal} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <div className="title">
            <IonTitle color="primary" class="ion-text-west">
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
        <div className="user-info">
          <IonAvatar>
            <img src={user.photoURL} />
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
          <IonText color="primary">Tags</IonText>
          <div className="inner">
            {recipe.tags.map((r) => (
              <div key={r} className="recipe-tag">
                {r}
              </div>
            ))}
          </div>
        </div>
        <div className="property">
          <IonText color="primary">Ingredients</IonText>
          <div className="ingredients">
            {recipe.foodItems.map((r) => (
              <IonItem key={r}>
                <IonCheckbox />
                <div className="ingredients-tag-1">{r}</div>
              </IonItem>
            ))}
          </div>
        </div>
        <div className="property">
          <IonText color="primary">Steps</IonText>
          <div className="ingredients">
            <ol>
              {recipe.instructions.map((r) => (
                <li key={r}>
                  <div className="steps-tag">{r}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="nutrition">
          <IonText color="primary">Nutritional Facts</IonText>
          <p>
            {
              "Serv. Size: 1 slice (99g), Servings Per Container: 8, Amount Per Serving: Calories 340, Cal from Fat 220, Cal from Sat Fat 120, Total Fat 25g (38% DV), Sat Fat 14g (68%), Trans Fat 1g, Polyunsat Fat 1.5g, Monounsat Fat 7g, Cholest 130mg (43% DV), Sodium 230mg (10% DV), Potassium 115mg (3% DV), Total Carb 24g (8%), Dietary Fiber 1g (4%), Sugars 21g, Sugar Alc 0g, Other Carb 0g, Protein 6g, Vitamin A (60% DV), Vitamin C (0% DV), Calcium (8% DV), Iron (2% DV), Vitamin D (2% DV), Vitamin E (0% DV), Thiamin (2% DV), Riboflavin (15% DV), Niacin (2% DV), Vitamin B6 (2% DV). Percent Daily Values (DV) are based on a 2,000 calorie diet."
            }
          </p>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default RecipePage;
