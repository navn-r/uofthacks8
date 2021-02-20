import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonSearchbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import { foods, tags } from "../../firebase/constants";
import "./RecipeSearch.css";

const RecipeSearch: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [foodItems, setFoodItems] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [tagItems, setTagItems] = React.useState<boolean[]>(
    Array(tags.length).fill(false)
  );
  interface Cost {
    lower: number;
    upper: number;
  }
  const [cost, setCost] = React.useState<Cost>({ lower: 0, upper: 0 });
  const [title, setTitle] = React.useState("");

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <IonSearchbar
            value={title}
            placeholder="Search for recipes"
            onIonChange={(e) => {
              const input = e.detail.value!.trim().toLowerCase();
              setTitle(input);
            }}
            showCancelButton="never"
          />
        </div>
        <div className="recipe-upload-container">
          <div>
            <IonSearchbar
              value={search}
              placeholder="Search for ingredients"
              onIonChange={(e) => {
                const input = e.detail.value!.trim().toLowerCase();
                setSearch(e.detail.value!);
                if (!input || input.length < 3) {
                  setFoodItems([]);
                  return;
                }
                const items = foods
                  .filter((food) => food.startsWith(input))
                  .slice(0, 10);
                if (items !== foodItems) setFoodItems(items);
              }}
              showCancelButton="never"
            />
            <div className="food-items">
              {foodItems.length <= 10 &&
                foodItems.map((item) => {
                  return (
                    <div
                      key={item}
                      className="food-item-tag"
                      onClick={() => {
                        if (!ingredients.includes(item))
                          setIngredients([...ingredients, item]);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <IonList>
              {!!ingredients.length && (
                <div className="ingredient-titles-container">
                  <p>Ingredient</p>
                </div>
              )}
              <div className="ingredient-list">
                {ingredients.map((item, index) => (
                  <div className="ingredient-item-row" key={item}>
                    <IonLabel>{item}</IonLabel>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => {
                        setIngredients(
                          ingredients.filter((_, i) => i !== index)
                        );
                      }}
                      size="small"
                    >
                      <IonIcon slot="icon-only" icon={close}></IonIcon>
                    </IonButton>
                  </div>
                ))}
              </div>
            </IonList>
          </div>
          <div>
            <IonList>
              <h4 className="tags-title">Tags</h4>
              <div className="taglist">
                {tags.map((item, index) => {
                  return (
                    <IonItem key={item}>
                      <IonLabel>{item}</IonLabel>
                      <IonCheckbox
                        onClick={() => {
                          const cpy = [...tagItems];
                          cpy[index] = !cpy[index];
                          setTagItems(cpy);
                        }}
                      />
                    </IonItem>
                  );
                })}
              </div>
            </IonList>
          </div>
          <div>
            <h4 className="cost-title">Cost</h4>
            <IonItem>
              <IonRange
                dualKnobs={true}
                min={1}
                max={4}
                step={1}
                snaps={true}
                color="secondary"
                onIonChange={(e) => {
                  console.log(e.detail.value);
                }}
              >
                <IonLabel slot="start">$</IonLabel>
                <IonLabel slot="end">$$$$</IonLabel>
              </IonRange>
            </IonItem>
          </div>
          <IonButton color="success">Find Recipes</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RecipeSearch;
