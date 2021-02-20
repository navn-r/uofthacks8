import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonIcon
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import RecipeCard from "../../components/recipe/RecipeCard";
import { addFollower, getRecipes} from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./ProfileVisitor.css";
import { close } from "ionicons/icons";

interface ProfilePageProps {
  user: User;
  showModal: boolean;
  onSuccess: () => void;
}


const ProfilePage: React.FC<ProfilePageProps> = ({user, showModal, onSuccess}) => {
  const history = useHistory();
  const [recipes, setRecipes] = useState([] as Recipe[]);


  useEffect(() => {

    const unsubscribe = async () => {
      setRecipes(await getRecipes(user.recipeIds));
    };
    unsubscribe();
  }, [user]);

  return (
    <IonModal isOpen={showModal} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary" class="ion-text-west">
            Munchify
          </IonTitle>
          <div className="exit">
            <IonButton
              fill="clear"
              color="danger"
              onClick={onSuccess}
              size="small"
            >
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <div className="user-info">
          <IonAvatar>
            <img src={user.photoURL} />
          </IonAvatar>
          <div className="info-title">
            <h3>{user.displayName}</h3>
          </div>
        </div>
        <div className="follower-info">
          <>
          <div className="follower-box">
              <h4>{(user as User).recipeIds.length}</h4>
              <p>Recipes</p>
            </div>
            <div className="follower-box">
              <h4>{(user as User).followerIds.length}</h4>
              <p>Followers</p>
            </div>
            <div className="follower-box">
              <h4>{(user as User).followingIds.length}</h4>
              <p>Following</p>
            </div>
          </>
          
        </div>
        <div className="profile-button-container">
          <IonButton
            mode="ios"
            onClick={() => addFollower(user.id)}
            expand="block"
            color="primary"
          >
            Follow
          </IonButton>

        </div>
        <div className="item-divider"></div>
          <div className="user-recipes-container">
            <h4>My Recipes</h4>
            {!!recipes && recipes.map((r, i) => (
              <RecipeCard recipe={r} key={i} />
            ))}
          </div>
        
      </IonContent>
    </IonModal>
  );
};

export default ProfilePage;
