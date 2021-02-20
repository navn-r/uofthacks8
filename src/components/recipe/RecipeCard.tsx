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
    IonAvatar
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
              <div className="info-title">
                <h3>{user.displayName}</h3>
                </div>
              </div>
            </IonCardTitle>
            <IonCardSubtitle>
              
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
      </IonCardContent>
        </IonCard>
    );
  };
  
  export default RecipeCard;
  