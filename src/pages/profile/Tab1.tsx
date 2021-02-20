import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Auth/AuthProvider";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const history = useHistory();
  const { logout, user } = useAuth();
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
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton mode="ios" onClick={onLogout} shape="round" color="primary">
          Sign Out
        </IonButton>
        <div>
        {user.uid} <br/>
        {user.displayName} <br/>
        {user.email}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
