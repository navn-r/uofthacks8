import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRange,
  IonSearchbar,
  IonTextarea,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect } from "react";
import { foods, tags } from "../../firebase/constants";
import "./RecipeUpload.css";
import { makeRecipe } from "../../firebase/api";
interface RecipeUploadProps {
  onSuccess: () => any;
  showModal: boolean;
}

const RecipeUpload: React.FC<RecipeUploadProps> = ({
  onSuccess,
  showModal,
}) => {
  const [desc, setDesc] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [foodItems, setFoodItems] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [amounts, setAmounts] = React.useState<string[]>([]);
  const [measure, setMeasure] = React.useState<string[]>([]);
  const [steps, setSteps] = React.useState<string[]>([""]);
  const [tagItems, setTagItems] = React.useState<boolean[]>(
    Array(tags.length).fill(false)
  );
  const [img, setImg] = React.useState("");

  useEffect(() => {
    const clearData = () => {
      setDesc("");
      setSearch("");
      setFoodItems(foods);
      setIngredients([]);
      setAmounts([]);
      setMeasure([]);
      setSteps([""]);
      setTagItems(tagItems.fill(false));
    };
    clearData();
  }, [showModal]);

  const recipeSubmit = (recipeObj: {
    foodItems: string[];
    cost: number;
    desc: string;
    instructions: string[];
    tags: boolean[];
    url: string;
  }) => {
    makeRecipe(recipeObj);
    onSuccess();
  };

  return (
    <div className="recipe-upload-container">
      <div className="image-upload-container">
      {!!img && <img src={img} />}

        <div className="image-upload-input-container">
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files![0]));
            }}
          />
        </div>
      </div>
      <div className="desc-input">
        <IonItem>
          <IonTextarea
            placeholder="Talk about your recipe here..."
            value={desc}
            onIonChange={(e) => setDesc(e.detail.value!)}
          ></IonTextarea>
        </IonItem>
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
              <p>amount</p>
              <p>measure unit</p>
            </div>
          )}
          <div className="ingredient-list">
            {ingredients.map((item, index) => (
              <div className="ingredient-item-row" key={item}>
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
                  value={measure[index]}
                  placeholder={"g"}
                  onIonChange={(e) => {
                    const cpy = [...measure];
                    cpy[index] = e.detail.value!;
                    setMeasure(cpy);
                  }}
                />
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => {
                    setAmounts(amounts.filter((_, i) => i !== index));
                    setIngredients(ingredients.filter((_, i) => i !== index));
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
      <div className="steps-container">
        {steps.map((item, index) => (
          <div className="step-inner-container" key={index}>
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
            {!!index && (
              <IonButton
                fill="clear"
                color="danger"
                onClick={() => {
                  setSteps(steps.filter((_, i) => i !== index))
                }}
                size="small"
              >
                <IonIcon slot="icon-only" icon={close}></IonIcon>
              </IonButton>
            )}
          </div>
        ))}
        <IonButton
          color="dark"
          fill="outline"
          expand="block"
          onClick={() => {
            setSteps([...steps, ""]);
          }}
        >
          Add new step
        </IonButton>
        {/* */}
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
            min={1}
            max={4}
            step={1}
            snaps={true}
            color="secondary"
            onIonChange={(e) => setCost(e.detail.value as number)}
          >
            <IonLabel slot="start">$</IonLabel>
            <IonLabel slot="end">$$$$</IonLabel>
          </IonRange>
        </IonItem>
      </div>
      <IonButton
        color="success"
        expand="block"
        id="submit-button"
        onClick={() =>
          recipeSubmit({
            foodItems,
            cost,
            desc,
            instructions: steps,
            tags: tagItems,
            url: img,
          })
        }
      >
        Make Recipe
      </IonButton>
    </div>
  );
};

export default RecipeUpload;
