import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthGuardRoute from "./components/Auth/AuthGuardRoute";
import { AuthProvider } from "./components/Auth/AuthProvider";
import LoginPage from "./pages/login/Login";
import TabRoot from "./pages/TabRoot";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={LoginPage} />
          <AuthGuardRoute path="/main" component={TabRoot} />
          <Redirect to="/main" from="/" exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;
