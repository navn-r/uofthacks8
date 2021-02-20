import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import firebase from "firebase/app";
import "firebase/auth";
import { logoGoogle } from "ionicons/icons";
import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Auth/AuthProvider";
import "./Login.css";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const onLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      login((user: firebase.auth.UserCredential) => {
        // db.setRef(user.user!.uid);
        // const promise = user.additionalUserInfo!.isNewUser ? db.initNewData() : Promise.resolve();
        history.replace("/main");
      });
    },
    [history, login]
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>Munchify</h1>
        <div>
          <IonButton mode="ios" onClick={onLogin} shape="round" color="primary">
            <IonIcon size="small" slot="start" icon={logoGoogle} />
            Sign in
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
