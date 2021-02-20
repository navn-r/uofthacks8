import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddRecipeModal from "../../components/add-recipe-modal/AddRecipeModal";
import { useAuth } from "../../components/Auth/AuthProvider";
import { useData } from "../../components/Data/DataContext";
import RecipeCard from "../../components/recipe/RecipeCard";
import { getRecipes } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { logout, user: authUser } = useAuth();
  const { user: dataUser, loading: dataLoading } = useData();
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const [showModal, setShowModal] = useState(false);
  const onLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      logout(() => history.replace("/login"));
    },
    [history, logout]
  );

  const addRecipe = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (dataLoading) return;
    const unsubscribe = async () => {
      setRecipes(await getRecipes(dataUser.recipeIds));
    };
    unsubscribe();
  }, [dataUser, dataLoading]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west">
            Munchify
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AddRecipeModal
          showModal={showModal}
          onSuccess={() => setShowModal(false)}
        />
        <div className="user-info">
          <IonAvatar>
            <img src={authUser.photoURL} />
          </IonAvatar>
          <div className="info-title">
            <h3>{authUser.displayName}</h3>
            <p>{authUser.email}</p>
          </div>
        </div>
        <div className="follower-info">
          {dataLoading ? (
            <IonSpinner />
          ) : (
            <>
              <div className="follower-box">
                <h4>{(dataUser as User).recipeIds.length}</h4>
                <p>Recipes</p>
              </div>
              <div className="follower-box">
                <h4>{(dataUser as User).followerIds.length}</h4>
                <p>Munchers</p>
              </div>
              <div className="follower-box">
                <h4>{(dataUser as User).followingIds.length}</h4>
                <p>Munching</p>
              </div>
            </>
          )}
        </div>
        <div className="profile-button-container">
          <IonButton
            mode="ios"
            onClick={addRecipe}
            expand="block"
            color="primary"
          >
            Add Recipe
          </IonButton>
          <IonButton
            mode="ios"
            onClick={onLogout}
            expand="block"
            color="danger"
          >
            Sign Out
          </IonButton>
        </div>
        <div className="item-divider"></div>
        <div className="user-recipes-container">
          <h4>Find fellow Munchers</h4>
          <IonInput placeholder="Search..."></IonInput>
        </div>
        <div className="item-divider"></div>
        {dataLoading ? (
          <IonSpinner />
        ) : (
          <div className="user-recipes-container">
            <h4>My Recipes</h4>
            {!!recipes &&
              recipes.map((r, i) => <RecipeCard recipe={r} key={i} />)}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
