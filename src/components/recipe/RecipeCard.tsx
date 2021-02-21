import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getUser } from "../../firebase/api";
import { Recipe } from "../../firebase/models";
import RecipePage from "../../pages/recipe/RecipePage";
import "./RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null as any);

  useEffect(() => {
    const unsubscribe = async () => {
      if(!!user || !recipe) return;      
      setUser(await getUser(recipe.userId));
    };
    unsubscribe();
  }, [recipe]);

  return !!user && !!recipe ? (
    <>
      <RecipePage
        recipe={recipe}
        user={user}
        showModal={showModal}
        onSuccess={() => setShowModal(false)}
      />
      <IonCard onClick={() => setShowModal(true)}>
        <IonCardHeader>
          <IonCardTitle>
            <div className="user-info recipe-info recipe-card-info">
              <IonAvatar>
                <img src={user.photoURL} />
              </IonAvatar>
              <div className="info-title">
                <h3>{recipe.title}</h3>
                <p>{user.displayName}</p>
              </div>
            </div>
          </IonCardTitle>
          <img
            src={
              !!recipe
                ? recipe.url
                : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
            }
          ></img>
        </IonCardHeader>
        <p className="recipe-desc">{recipe.desc}</p>
          <div className="tags-container">
            <h6>Cost:</h6>
            <div className="inner">
              <div className="recipe-tag success-tag">
                  {recipe.cost.toUpperCase()}
              </div>
            </div>
          </div>
        {!!recipe.tags.length && (
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
        )}
        <IonCardContent></IonCardContent>
      </IonCard>
    </>
  ) : (
    <IonSpinner />
  );
};

export default React.memo(RecipeCard);
