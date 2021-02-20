import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { Recipe, User } from "../../firebase/models";
import "./RecipeCard.css";

interface RecipeCardProps {
  user: User;
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ user, recipe }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <div className="user-info recipe-info">
            <IonAvatar>
              <img src={user.photoURL} />
            </IonAvatar>
            <div className="info-title">
              <h3>{"RECIPE NAME"}</h3>
              <p>{user.displayName}</p>
            </div>
          </div>
        </IonCardTitle>
        <img src={recipe.url}></img>
      </IonCardHeader>
      <p className="recipe-desc">{recipe.desc}</p>
      <div className="tags-container">
        <h6>Tags:</h6>
        <div className="inner">
          {recipe.tags.map((r) => (
            <div key={r} className="recipe-tag">
              {r}
            </div>
          ))}
        </div>
      </div>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;
