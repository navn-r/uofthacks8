import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
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
              <p>Followers</p>
            </div>
          </>
        )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;

/* <IonButton mode="ios" onClick={onLogout} shape="round" color="primary">
          Sign Out
        </IonButton> */
