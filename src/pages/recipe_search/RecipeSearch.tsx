import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRange,
  IonSearchbar,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import { foods, tags } from "../../firebase/constants";
import "./RecipeSearch.css";
import { getAllRecipes } from "../../firebase/api";
import { Recipe } from "../../firebase/models";
import RecipeCard from "../../components/recipe/RecipeCard";
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
  const [cost, setCost] = React.useState<Cost>({ lower: 1, upper: 1 });
  const [title, setTitle] = React.useState("");
  const [showRecipes, setShowRecipes] = React.useState<Recipe[]>([]);
  const findRecipe = () => {
    const filteredTags = tags.filter((_, index) => tagItems[index]);
    getAllRecipes().then((recipes) => {
      const filteredRecipes = [];
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (!recipe.title.startsWith(title)) continue;
        let allTags = true;
        tagItems.forEach((tag) => {
          if (tag) allTags = false;
        });
        if (!allTags) {
          let hasTag = false;
          for (let j = 0; j < recipe.tags.length; j++) {
            if (filteredTags.includes(recipe.tags[j])) {
              hasTag = true;
              break;
            }
          }
          if (!hasTag) continue;
        }
        const costs = ["cheap", "normal", "expensive", "high end"].filter(
          (_, index) => {
            return cost.lower <= index + 1 && index + 1 <= cost.upper;
          }
        );
        if (!costs.includes(recipe.cost)) break;
        let hasAllIngredients = true;
        for (let j = 0; j < ingredients.length; j++) {
          if (
            !recipe.foodItems.map((item) => item.name).includes(ingredients[j])
          )
            hasAllIngredients = false;
        }
        if (!hasAllIngredients) break;
        filteredRecipes.push(recipe);
      }
      console.log(filteredRecipes);

      setShowRecipes(filteredRecipes.slice(0, 10));
    });
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle color="primary" class="ion-text-west">
              Munchify
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="property">
            <IonText color="primary">{"Name"}</IonText>
          </div>
          <IonItem>
            <IonTextarea
              placeholder="What's the recipe name"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <div className="recipe-upload-container">
            <div className="property">
              <IonText color="primary">{"Ingredients"}</IonText>
            </div>
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
                  foodItems.map((item, i) => {
                    return (
                      <div
                        key={i}
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
              <div>
                {ingredients.map((item, index) => (
                  <div className="ingredients-tag" key={item}>
                    <div className="itemName">
                      <IonLabel>{item}</IonLabel>
                    </div>
                    <div className="closeButton">
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
                  </div>
                ))}
              </div>
            </div>
            <IonList>
              <div className="property">
                <IonText color="primary">{"Tags"}</IonText>
              </div>
              <div className="taglist">
                {tags.map((item, index) => {
                  return (
                    <div key={item} className="tag">
                      <IonItem>
                        <IonLabel>{item}</IonLabel>
                        <IonCheckbox
                          checked={tagItems[index]}
                          onClick={() => {
                            const cpy = [...tagItems];
                            cpy[index] = !cpy[index];
                            setTagItems(cpy);
                          }}
                        />
                      </IonItem>
                    </div>
                  );
                })}
              </div>
            </IonList>
            <div>
              <div className="property">
                <IonText color="primary">{"Cost"}</IonText>
              </div>
              <IonItem>
                <IonRange
                  dualKnobs={true}
                  min={1}
                  max={4}
                  step={1}
                  snaps={true}
                  color="secondary"
                  onIonChange={(e) => {
                    setCost(e.detail.value as Cost);
                  }}
                >
                  <IonLabel slot="start">$</IonLabel>
                  <IonLabel slot="end">$$$$</IonLabel>
                </IonRange>
              </IonItem>
            </div>
            <div className="center">
              <IonButton color="success" onClick={findRecipe}>
                Find Recipes
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <IonModal
        mode="ios"
        isOpen={!!showRecipes.length}
        backdropDismiss={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonButton
              fill="clear"
              color="danger"
              onClick={() => setShowRecipes([])}
              size="small"
            >
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
            <IonTitle>Recipes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {showRecipes.map((recipe) => (
            <RecipeCard key={recipe.title} recipe={recipe} />
          ))}
        </IonContent>
      </IonModal>
    </>
  );
};

export default RecipeSearch;
