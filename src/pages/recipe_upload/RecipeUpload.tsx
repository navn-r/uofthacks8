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

interface RecipeUploadProps {
  onSuccess: () => any;
  showModal: boolean
}

const RecipeUpload: React.FC<RecipeUploadProps> = ({ onSuccess, showModal }) => {
  const [desc, setDesc] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [foodItems, setFoodItems] = React.useState(foods);
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
      setTagItems(Array(tags.length).fill(false));
    };
    clearData();
  }, [showModal]);

  return (
    <div className="recipe-upload-container">
      <div>
        <IonItem>
          Upload an image
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files![0]));
            }}
          />
          <IonImg src={img} />
        </IonItem>
      </div>
      <div>
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
          <div className="ingredient-titles-container">
            <p>Ingredient</p>
            <p>amount</p>
            <p>measure unit</p>
          </div>
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
            <IonButton fill="clear" color="danger" onClick={() => {
                    setAmounts(amounts.filter((_, i) => i !== index));
                    setIngredients(ingredients.filter((_, i) => i !== index));
                  }} size="small"><IonIcon slot="icon-only" icon={close}></IonIcon></IonButton>

              </div>
            ))}
          </div>
        </IonList>
      </div>
      <div className="steps-container">
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
          color="danger"
          onClick={() => {
            const cpy = [...steps];
            if (cpy.length) cpy.pop();
            setSteps(cpy);
          }}
        >
          Remove step
        </IonButton>
      </div>
      <div>
        <IonList>
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
        <IonItem>
          <IonRange min={1} max={4} step={1} snaps={true} color="secondary">
            <IonLabel slot="start">$</IonLabel>
            <IonLabel slot="end">$$$$</IonLabel>
          </IonRange>
        </IonItem>
      </div>

      <IonButton color="success" onClick={() => onSuccess()}>
        Make Recipe
      </IonButton>
    </div>
  );
};

export default RecipeUpload;
