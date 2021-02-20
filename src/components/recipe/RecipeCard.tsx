import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    IonButton,
    IonFabButton,
    IonCardHeader,
    IonCardSubtitle,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonImg,
    IonAvatar,
    IonLabel,
  } from "@ionic/react";
  import "./RecipeCard.css";
  import { Redirect, Route } from "react-router-dom";
import React from "react";
import { Recipe, User } from "../../firebase/models"

interface RecipeCardProps {
    user: User,
    recipe: Recipe
}
  
  const RecipeCard: React.FC<RecipeCardProps> = ({user, recipe}) => {
    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle> 
              <div className="user-info">
              <IonAvatar>
                <img src={user.photoURL} />
              </IonAvatar>
              <IonLabel>
                <h3>{user.displayName}</h3>
              </IonLabel>
              </div>
            </IonCardTitle>
              <img src={recipe.url}></img>
          </IonCardHeader>
          <h6>{recipe.desc}</h6>
          <div>
            <h6>Tags:</h6>
            <br></br>
            <ul>
              {recipe.tags.map((tag, i) => (<li key={i}>{tag}</li>))}
            </ul>
          </div>
          <IonCardContent>
            
      </IonCardContent>
        </IonCard>
    );
  };  
  
  export default RecipeCard;
  