import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Auth/AuthProvider";
import { useData } from "../../components/Data/DataContext";
import { User } from "../../firebase/models";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { logout, user: authUser } = useAuth();
  const { user: dataUser, loading: dataLoading } = useData();
  const onLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      logout(() => history.replace("/login"));
    },
    [history, logout]
  );

  const addRecipe = () => {
    console.log("add recipe here");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
                <h4>{(dataUser as User).followerIds.length}</h4>
                <p>Followers</p>
              </div>
              <div className="follower-box">
                <h4>{(dataUser as User).followingIds.length}</h4>
                <p>Following</p>
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
            <h4>My Recipes</h4>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
