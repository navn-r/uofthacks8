import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonThumbnail } from "@ionic/react";
import firebase from "firebase/app";
import "firebase/auth";
import { logoGoogle } from "ionicons/icons";
import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Auth/AuthProvider";
import { initNewUser } from "../../firebase/api";
import "./Login.css";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const onLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      login((user: firebase.auth.UserCredential) => {
        const promise = user.additionalUserInfo!.isNewUser ? initNewUser(user.user!) : Promise.resolve();
        promise.then(() => setTimeout(() => history.replace("/main"), 500));
      });
    },
    [history, login]
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="splash-container"> 
          <img src={"/assets/Logo.png"} />
          <IonButton mode="ios" onClick={onLogin} expand="block" color="primary">
            <IonIcon size="small" slot="start" icon={logoGoogle} />
            Sign in
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
