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
  IonInput,
} from "@ionic/react";
import { foods } from "../../firebase/constants";
import React from "react";
import "./RecipeUpload.css";

const RecipeUpload: React.FC = () => {
  const [desc, setDesc] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [foodItems, setFoodItems] = React.useState(foods);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [amounts, setAmounts] = React.useState<string[]>([]);
  const [measure, setMeasure] = React.useState<string[]>([]);
  const [steps, setSteps] = React.useState<string[]>([""]);
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
            <IonItem>
              <IonLabel>Ingredient</IonLabel>
              <IonLabel>amount</IonLabel>
              <IonLabel>measure unit</IonLabel>
            </IonItem>
            <div className="ingredient-list">
              {ingredients.map((item, index) => (
                <IonItem key={item}>
                  <IonLabel>{item}</IonLabel>
                  <IonInput
                    value={amounts[index]}
                    placeholder={"200"}
                    onIonChange={(e) => {
                      const cpy = [...amounts];
                      cpy[index] = e.detail.value!;
                      setAmounts(cpy);
                    }}
                  />
                  <IonInput
                    value={amounts[index]}
                    placeholder={"g"}
                    onIonChange={(e) => {
                      const cpy = [...measure];
                      cpy[index] = e.detail.value!;
                      setMeasure(cpy);
                    }}
                  />
                  <IonButton
                    onClick={() => {
                      setAmounts(amounts.filter((_, i) => i !== index));
                      setIngredients(ingredients.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </IonButton>
                </IonItem>
              ))}
            </div>
          </IonList>
        </div>
        <div>
          Steps
          {steps.map((item, index) => (
            <IonInput
              key={index}
              placeholder={`Enter step ${index + 1}`}
              onIonChange={(e) => {
                const cpy = [...steps];
                cpy[index] = e.detail.value!;
                setSteps(cpy);
              }}
              value={item}
            />
          ))}
          <IonButton
            onClick={() => {
              setSteps([...steps, ""]);
            }}
          >
            Add new step
          </IonButton>
          <IonButton
            onClick={() => {
              const cpy = [...steps];
              if (cpy.length) cpy.pop();
              setSteps(cpy);
            }}
          >
            Remove step
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RecipeUpload;
