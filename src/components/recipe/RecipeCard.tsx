import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import React, { useState } from "react";
import { Recipe, User } from "../../firebase/models";
import RecipePage from "../../pages/recipe/RecipePage";
import "./RecipeCard.css";

interface RecipeCardProps {
  user: User;
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ user, recipe }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <RecipePage recipe={recipe} user={user} showModal={showModal} onSuccess={() => setShowModal(false)} />
    <IonCard onClick={() => setShowModal(true)}>
      <IonCardHeader>
        <IonCardTitle>
          <div className="user-info recipe-info">
            <IonAvatar>
              <img src={user.photoURL} />
            </IonAvatar>
            <div className="info-title">
              <h3>{recipe.title}</h3>
              <p>{user.displayName}</p>
            </div>
          </div>
        </IonCardTitle>
        <img src={!!recipe ? recipe.url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"}></img>
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
    </>
  );
};

export default React.memo(RecipeCard);
