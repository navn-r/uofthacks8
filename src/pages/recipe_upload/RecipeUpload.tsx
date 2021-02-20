import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonItemDivider,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonTextarea,
  IonLabel,
  IonSearchbar,
} from "@ionic/react";
import { foods } from "../../firebase/constants";
import React from "react";
const RecipeUpload: React.FC = () => {
  const [desc, setDesc] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [foodItems, setFoodItems] = React.useState(foods);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Upload Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          Description
          <IonItem>
            <IonTextarea
              placeholder="Talk about your recipe here..."
              value={desc}
              onIonChange={(e) => setDesc(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </div>
        <div>
          Ingredients
          <IonSearchbar
            value={search}
            placeholder="Search for ingredients"
            onIonChange={(e) => {
              setFoodItems(
                foods.filter((food) => food.startsWith(e.detail.value!))
              );
              setSearch(e.detail.value!);
            }}
            showCancelButton="never"
          />
          <IonList>
            {foodItems.length <= 3 &&
              foodItems.map((item) => {
                return (
                  <IonButton
                    color="primary"
                    mode="ios"
                    key={item}
                    onClick={() => {
                      if (!ingredients.includes(item))
                        setIngredients([...ingredients, item]);
                    }}
                  >
                    {item}
                  </IonButton>
                );
              })}
          </IonList>
          <IonList>
            {ingredients.map((item) => (
              <IonItem key={item}>{item}</IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RecipeUpload;
