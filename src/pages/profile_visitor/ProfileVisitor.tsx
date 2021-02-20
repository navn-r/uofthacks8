import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/recipe/RecipeCard";
import { addFollower, getRecipes, getUser } from "../../firebase/api";
import { Recipe, User } from "../../firebase/models";
import "./ProfileVisitor.css";

interface ProfilePageProps {
  userId: string;
  showModal: boolean;
  onSuccess: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userId,
  showModal,
  onSuccess,
}) => {
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const [profileUser, setProfileUser] = useState(null as unknown as User);

  useEffect(() => {
    const unsubscribe = async () => {
      if (!userId) return;
      const user = await getUser(userId);
      setProfileUser(user);
      setRecipes(await getRecipes(user.recipeIds));
    };
    unsubscribe();
  }, [userId]);

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
        {!!profileUser ? (
          <>
            <div className="user-info">
              <IonAvatar>
                <img src={profileUser.photoURL} />
              </IonAvatar>
              <div className="info-title">
                <h3>{profileUser.displayName}</h3>
              </div>
            </div>
            <div className="follower-info">
              <>
                <div className="follower-box">
                  <h4>{(profileUser as User).recipeIds.length}</h4>
                  <p>Recipes</p>
                </div>
                <div className="follower-box">
                  <h4>{(profileUser as User).followerIds.length}</h4>
                  <p>Followers</p>
                </div>
                <div className="follower-box">
                  <h4>{(profileUser as User).followingIds.length}</h4>
                  <p>Following</p>
                </div>
              </>
            </div>
            <div className="profile-button-container">
              <IonButton
                mode="ios"
                onClick={() => addFollower(profileUser.id)}
                expand="block"
                color="primary"
              >
                Follow
              </IonButton>
            </div>
            <div className="item-divider"></div>
            <div className="user-recipes-container">
              <h4>My Recipes</h4>
              {!!recipes &&
                recipes.map((r, i) => <RecipeCard recipe={r} key={i} />)}
            </div>
          </>
        ) : (
          <IonSpinner />
        )}
      </IonContent>
    </IonModal>
  );
};

export default ProfilePage;
